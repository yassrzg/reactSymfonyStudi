<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ApiLogoutController extends AbstractController
{

    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager) {
        $this->entityManager = $entityManager;
    }
    #[Route('/api/logout', name: 'app_api_logout')]
    public function index(Request $request): Response
    {

        $data = json_decode($request->getContent(), true);
        $email = $data['email'] ?? null;
        $token = $data['token'] ?? null;
        if(!$email) {
            return new JsonResponse(['message' => 'No user found'], 400);
        }

        $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $email]);
        if(!$user) {
            $user = $this->entityManager->getRepository(User::class)->findOneBy(['tokenAuth' => $token]);
        }

        $user->setIsDoubleAuth(false);
        $this->entityManager->persist($user);
        $this->entityManager->flush();
        return new JsonResponse(['message' => 'User logout successfully'], 201);
    }
}
