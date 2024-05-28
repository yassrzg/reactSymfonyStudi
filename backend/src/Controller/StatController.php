<?php

namespace App\Controller;

use App\Entity\EventPurchaseStat;
use App\Entity\StatsEventPurchase;
use App\Entity\StatsQrCode;
use App\Entity\StatsUser;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Serializer\SerializerInterface;

class StatController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/api/admin/stats/qrcodes', name: 'api_stats_qrcodes', methods: ['GET'])]
    public function getQrCodeStats(AuthorizationCheckerInterface $authChecker): Response
    {
        if (!$authChecker->isGranted('ROLE_ADMIN')) {
            return $this->json(['message' => 'Access denied'], Response::HTTP_FORBIDDEN);
        }
        $qrCodeStats = $this->entityManager->getRepository(StatsQrCode::class)->findAll();
        return $this->json([
            'data' => $qrCodeStats
        ]);
    }

    #[Route('/api/admin/stats/userlogins', name: 'api_stats_userlogins', methods: ['GET'])]
    public function getUserLoginStats(AuthorizationCheckerInterface $authChecker): Response
    {
        if (!$authChecker->isGranted('ROLE_ADMIN')) {
            return $this->json(['message' => 'Access denied'], Response::HTTP_FORBIDDEN);
        }
        $userLoginStats = $this->entityManager->getRepository(StatsUser::class)->findAll();
        return $this->json([
            'data' => $userLoginStats
        ]);
    }

    #[Route('/api/admin/stats/eventpurchase', name: 'api_stats_eventpurchase', methods: ['GET'])]
    public function getEventPurchaseStats(AuthorizationCheckerInterface $authChecker, SerializerInterface $serializer): Response
    {
        if (!$authChecker->isGranted('ROLE_ADMIN')) {
            return $this->json(['message' => 'Access denied'], Response::HTTP_FORBIDDEN);
        }

        $eventPurchaseStats = $this->entityManager->getRepository(StatsEventPurchase::class)->findAll();

        $data = $serializer->normalize($eventPurchaseStats, null, ['groups' => 'event_purchase_stat:read']);

        return $this->json(['data' => $data]);
    }

}
