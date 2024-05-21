<?php

namespace App\Controller;

use App\Classe\Mail;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class RegisterController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager) {
        $this->entityManager = $entityManager;
    }

    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function register(Request $request, UserPasswordHasherInterface $hasher): JsonResponse
    {
        $content = json_decode($request->getContent(), true);


        if (!$content) {
            return new JsonResponse(['message' => 'Invalid JSON'], 400);
        }

        $email = $content['email'] ?? null;
        $name = $content['name'] ?? null;
        $surname = $content['lastname'] ?? null;
        $password = $content['password'] ?? null;
        $consent = $content['consent'] ?? null;

        if (!$email || !$name || !$surname || !$password) {
            return new JsonResponse(['message' => 'Missing data'], 400);
        }

        $userExist = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $email]);
        if ($userExist) {
            return new JsonResponse(['message' => 'User already exists'], 409);
        }

        $newUser = new User();
        $newUser->setEmail($email);
        $newUser->setRoles(['ROLE_USER']);
        $newUser->setFirstname($name);
        $newUser->setLastname($surname);
        $hashedPassword = $hasher->hashPassword($newUser, $password);
        $newUser->setPassword($hashedPassword);
        $newUser->setConsent($consent);
        $newUser->setIsActive(false); // Consider setting to false if email verification is required
        $newUser->setCreatedAt(new \DateTimeImmutable());
        $newUser->setToken(uniqid());
        $newUser->setTokenAuth(uniqid());
        $newUser->setIsDoubleAuth(false);


        $this->entityManager->persist($newUser);
        $this->entityManager->flush();

        $urlMail = $_ENV['EMAIL_URL'];
        $url = $urlMail . '/check-auth/' . $newUser->getTokenAuth();

        $email = new Mail();
        $subject = 'Authentification double facteur';
        $contentMail = 'Cliquez sur le lien suivant pour valider votre création de compte <br/><br/><br/> <a href="'.$url.'">Cliquez ici</a>';
        $name_content = $newUser->getFirstname();
        $sujet = "Vérification de votre adresse email";
        $email->send($newUser->getEmail(), $name_content, $subject, $contentMail, $name_content, $sujet);

        // Email sending logic should be here, use symfony/mailer
        return new JsonResponse(['message' => 'need double auth'], 200);
    }

    #[Route('/api/register/{token}', methods: ['PATCH'], name: 'register_double')]
    public function verifyAccount($token, JWTTokenManagerInterface $JWTManager): Response {
        // Find by tokenAuth instead of token
        $user = $this->entityManager->getRepository(User::class)->findOneBy(['TokenAuth' => $token]);

        if (!$user) {
            return new JsonResponse(['message' => 'Invalid token provided'], 404);
        }

        if ($user->isIsActive()) {
            return new JsonResponse(['message' => 'User already verified'], 409);
        }

        $user->setIsActive(true);
        $user->setTokenAuth(null);  // Clear the tokenAuth after verification
        $user->setIsDoubleAuth(true);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        $jwtToken = $JWTManager->create($user);

        return new JsonResponse([
            'message' => 'User registered successfully',
            'token' => $jwtToken
        ], 201);
    }
}
