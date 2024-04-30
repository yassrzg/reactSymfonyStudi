<?php

namespace App\Controller;

use App\Classe\Mail;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;


class ApiLoginController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager) {
        $this->entityManager = $entityManager;
    }
    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function index( Request $request, UserPasswordHasherInterface $passwordHasher): Response
    {

        $data = json_decode($request->getContent(), true);
        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;

        $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $email]);
        // Check if user is authenticated
        if (!$user || !$passwordHasher->isPasswordValid($user, $password)) {
            return $this->json([
                'message' => 'Invalid email or password.',
            ], Response::HTTP_UNAUTHORIZED);
        }
        $user->setIsDoubleAuth(false);
        $newToken = uniqid('token_', true);  // More unique token by adding prefix and more entropy

        if ($user->getTokenAuth() !== null) {
            $user->setTokenAuth($newToken);
        } else {
            $user->setTokenAuth($newToken);
        }
//        $user->setTokenAuth(uniqid());
        $this->entityManager->persist($user);
        $this->entityManager->flush();

        $protocol = stripos($_SERVER['SERVER_PROTOCOL'], 'https') === 0 ? 'https://' : 'http://';
        $host = $protocol . $_SERVER['HTTP_HOST'];

//        $url = $host . $this->generateUrl('app_reset_password_update', ['token' => $newUser->getToken()]);
        $url = 'http://localhost:3000/double-auth/' . $user->getTokenAuth();

        $email = new Mail();
        $subject = 'Authentification double facteur';
        $contentMail = 'Cliquez sur le lien suivant pour valider la double authentification <br/><br/><br/> <a href="'.$url.'">Cliquez ici</a>';
        $name_content = $user->getFirstname();
        $sujet = "Authentification double facteur";
        $email->send($user->getEmail(), $name_content, $subject, $contentMail, $name_content, $sujet);

        // Return the user identifier (e.g., email or username) and the JWT token
        return $this->json([
            'user'  => $user->getUserIdentifier(),  // Ensure `getUserIdentifier()` method exists in your User entity
            'isActive' => $user->isIsActive(),
            'role' => $user->getRoles(),

        ]);
    }

    #[Route('/api/login/{token}', methods: ['PATCH'], name: 'login_double')]
    public function doubleAuth($token, JWTTokenManagerInterface $JWTManager): Response {
        // Find by tokenAuth instead of token
        $user = $this->entityManager->getRepository(User::class)->findOneBy(['TokenAuth' => $token]);

        if (!$user) {
            return new JsonResponse(['message' => "L'émail a expiré"], 404);
        }

        if (!$user->isIsActive()) {
            return new JsonResponse(['message' => "Votre e-mail n'a pas été vérifié"], 409);
        }

        $user->setIsDoubleAuth(true);
        $user->setTokenAuth(null);  // Clear the tokenAuth after verification

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        // Generate JWT for the authenticated user
        $jwtToken = $JWTManager->create($user);

        return new JsonResponse([
            'message' => 'Bienvenue sur votre compte',
            'token' => $jwtToken
        ], 201);
    }
}
