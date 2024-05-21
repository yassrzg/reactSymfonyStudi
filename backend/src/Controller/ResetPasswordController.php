<?php

namespace App\Controller;

use App\Classe\Mail;
use App\Entity\ResetPassword;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class ResetPasswordController extends AbstractController
{

    public function __construct(EntityManagerInterface $entityManager) {
        $this->entityManager = $entityManager;
    }

    #[Route('/api/reset-password', name: 'api_reset_password', methods: ['POST'])]
    public function index(Request $request): Response
    {
        if ($this->getUser()) {
            return $this->json(['message' => 'User is already logged in'], Response::HTTP_FORBIDDEN);
        }

        $data = json_decode($request->getContent(), true);
        $email = $data['email'];

        if (!$email) {
            return $this->json(['message' => 'Email is required'], Response::HTTP_BAD_REQUEST);
        }

        $user = $this->entityManager->getRepository(User::class)->findOneByEmail($email);
        if (!$user) {
            return $this->json(['message' => 'Email address unknown'], Response::HTTP_NOT_FOUND);
        }

        $isActive = $user->isIsActive();

        if(!$isActive) {
            return $this->json(['message' => 'Compte non vérifié'], Response::HTTP_NOT_FOUND);
        }

        // Create and store the reset password request
        $reset_password = new ResetPassword();
        $reset_password->setUser($user);
        $reset_password->setToken(uniqid());
        $reset_password->setDate(new \DateTime('Europe/Paris'));
        $this->entityManager->persist($reset_password);
        $this->entityManager->flush();


        $urlMail = $_ENV['EMAIL_URL'];
        $url = $urlMail . '/forgot-password/' . $reset_password->getToken();
        $mail = new Mail();
        $subject = "Demande réinitialisation de Password";
        $sujet = "Demande réinitialisation de Password";
        $name_content = $user->getFirstname();
        $contentMail = 'Click the following link to reset your password <br/><br/><br/> <a href="'.$url.'">Cliquez ici</a>';
        $mail->send($user->getEmail(), $name_content, $subject, $contentMail, $name_content, $sujet);


        return $this->json(['message' => 'Reset password link has been sent to your email.'], Response::HTTP_OK);
    }

    #[Route('/api/reset-password/{token}', name: 'app_reset_password_update', methods: ['POST'])]
    public function resetPassword(string $token, Request $request, UserPasswordHasherInterface $passwordHasher): Response
    {
        $reset_password = $this->entityManager->getRepository(ResetPassword::class)->findOneByToken($token);
        if (!$reset_password) {
            return $this->json(['message' => 'Reset Password not found'], Response::HTTP_NOT_FOUND);
        }

       $user = $reset_password->getUser();
        $userActive = $user->isIsActive();
        if(!$userActive){
            return $this->json(['message' => 'Email not verified'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);
        $password = $data['password'];
        if (!$password) {
            return $this->json(['message' => 'Password is required'], Response::HTTP_BAD_REQUEST);
        }
        $hashedPassword = $passwordHasher->hashPassword($user, $password);
        $user->setPassword($hashedPassword);
        $this->entityManager->persist($user);
        $this->entityManager->flush();





        // Add the logic to proceed with password update - typically handled by a PUT request to actually update the password
        return new JsonResponse(['message' => 'go connect !'], 200);
    }
}
