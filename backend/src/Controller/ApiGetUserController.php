<?php

namespace App\Controller;

use App\Classe\Mail;
use App\Entity\QrCode;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\Serializer\SerializerInterface;

class ApiGetUserController extends AbstractController
{

    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager) {
        $this->entityManager = $entityManager;
    }

    #[Route('/api/getUser', name: 'api_get_user', methods: ['GET'])]
    public function index(#[CurrentUser] ?User $user): Response
    {
        if (null === $user) {
            return $this->json([
                'message' => 'User not authenticated',
            ], Response::HTTP_UNAUTHORIZED);
        }

        return $this->json([
            'user'  => $user->getUserIdentifier(),
            'name' => $user->getFirstname(),
            'surname' => $user->getLastname(),
            'roles' => $user->getRoles(),
        ]);
    }
    #[Route('/api/getUserCompagnon', name: 'api_get_user_compagnon', methods: ['GET'])]
    public function getUserCompagnon(#[CurrentUser] ?User $user, SerializerInterface $serializer): Response
    {
        if (null === $user) {
            return $this->json([
                'message' => 'User not authenticated',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $accompagnants = $user->getAccompagnants();
        $uniqueAccompagnants = [];
        foreach ($accompagnants as $accompagnant) {
            $key = $accompagnant->getName() . ' ' . $accompagnant->getLastname();
            if (!array_key_exists($key, $uniqueAccompagnants)) {
                $uniqueAccompagnants[$key] = $accompagnant;
            }
        }

        // Convertir le tableau associatif en tableau indexé
        $uniqueAccompagnants = array_values($uniqueAccompagnants);

        // Sérialisation des accompagnants uniques
        $jsonContent = $serializer->serialize($uniqueAccompagnants, 'json', ['groups' => ['accompagnant_list', 'event_detail']]);

        return new Response($jsonContent, Response::HTTP_OK, ['Content-Type' => 'application/json']);
    }
    #[Route('/api/admin/getAllUsers', name: 'api_get_all_users', methods: ['GET'])]
    public function getAllUsers(AuthorizationCheckerInterface $authChecker): Response
    {
        if (!$authChecker->isGranted('ROLE_ADMIN')) {
            return $this->json(['message' => 'Access denied'], Response::HTTP_FORBIDDEN);
        }

        $users = $this->entityManager->getRepository(User::class)->findAll();
        $userData = array_map(function (User $user) {
            return [
                'id' => $user->getId(),
                'user'  => $user->getUserIdentifier(),
                'name' => $user->getFirstname(),
                'surname' => $user->getLastname(),
                'roles' => $user->getRoles(),
                'created_at' => $user->getCreatedAt()->format('Y-m-d H:i:s'),
                'verified' => $user->isIsActive(),
            ];
        }, $users);

        return $this->json($userData);
    }
    #[Route('/api/admin/deleteUser/{id}', name: 'api_delete_user', methods: ['DELETE'])]
    public function deleteUser(int $id, AuthorizationCheckerInterface $authChecker): Response
    {
        if (!$authChecker->isGranted('ROLE_ADMIN')) {
            return $this->json(['message' => 'Access Denied'], Response::HTTP_FORBIDDEN);
        }

        $user = $this->entityManager->getRepository(User::class)->find($id);
        if (!$user) {
            return $this->json(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }
        $qrCodes = $this->entityManager->getRepository(QrCode::class)->findBy(['user' => $user]);
        foreach ($qrCodes as $qrCode) {
            $qrCode->getQrCodeAccompagnants();
            foreach ($qrCode->getQrCodeAccompagnants() as $qrCodeAccompagnant) {
                $this->entityManager->remove($qrCodeAccompagnant);
            }
            $this->entityManager->remove($qrCode);
        }
        $accompagnants = $user->getAccompagnants();
        foreach ($accompagnants as $accompagnant) {
            $this->entityManager->remove($accompagnant);
        }


        $this->entityManager->remove($user);
        $this->entityManager->flush();

        return $this->json(['message' => 'User deleted successfully'], Response::HTTP_OK);
    }

    #[Route('/api/change-password', name: 'api_change_password_user', methods: ['PATCH'])]
    public function changePassword(#[CurrentUser] ?User $user, Request $request, UserPasswordHasherInterface $passwordEncoder): Response
    {
        if (null === $user) {
            return $this->json([
                'message' => 'User not authenticated',
            ], Response::HTTP_UNAUTHORIZED);
        }


        $data = json_decode($request->getContent(), true);
        $oldPassword = $data['oldPassword'] ?? '';
        $newPassword = $data['newPassword'] ?? '';

        // Check old password is correct
        if (!$passwordEncoder->isPasswordValid($user, $oldPassword)) {
            return $this->json(['status' => 'error', 'message' => 'Old password is incorrect'], Response::HTTP_BAD_REQUEST);
        }

        // Set new password
        $user->setPassword($passwordEncoder->hashPassword($user, $newPassword));
        $this->entityManager->persist($user);
        $this->entityManager->flush();

        $email = new Mail();
        $subject = 'Changement de Mot de passe';
        $contentMail = 'Votre mot de passe à bien été modifié <br/><br/><br/> Si vous n\'êtes pas à l\'origine de ce changement, contactez-npus !';
        $name_content = $user->getFirstname();
        $sujet = "Mot de passe modifié ! ";
        $email->send($user->getEmail(), $name_content, $subject, $contentMail, $name_content, $sujet);

        return $this->json(['status' => 'success', 'message' => 'Password successfully changed']);
    }

    #[Route('/api/change-name', name: 'api_change_name', methods: ['PATCH'])]
    public function changeName(#[CurrentUser] ?User $user, Request $request): Response
    {
        if (null === $user) {
            return $this->json(['message' => 'User not authenticated'], Response::HTTP_UNAUTHORIZED);
        }

        $data = json_decode($request->getContent(), true);
        $newName = $data['newName'] ?? '';

        if (empty($newName)) {
            return $this->json(['status' => 'error', 'message' => 'New name cannot be empty'], Response::HTTP_BAD_REQUEST);
        }

        $user->setFirstName($newName);
        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $this->json(['status' => 'success', 'message' => 'Name successfully changed']);
    }

    #[Route('/api/change-surname', name: 'api_change_surname', methods: ['PATCH'])]
    public function changeSurname(#[CurrentUser] ?User $user, Request $request): Response
    {
        if (null === $user) {
            return $this->json(['message' => 'User not authenticated'], Response::HTTP_UNAUTHORIZED);
        }

        $data = json_decode($request->getContent(), true);
        $newSurname = $data['newSurname'] ?? '';

        if (empty($newSurname)) {
            return $this->json(['status' => 'error', 'message' => 'New surname cannot be empty'], Response::HTTP_BAD_REQUEST);
        }

        $user->setLastName($newSurname);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $this->json(['status' => 'success', 'message' => 'Surname successfully changed']);
    }



}
