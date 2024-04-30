<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

class ApiGetUserEventController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager) {
        $this->entityManager = $entityManager;
    }

    #[Route('/api/user/event', name: 'api_get_user_event', methods: ['GET'])]
    public function getUpcomingEvents(#[CurrentUser] ?User $user): Response
    {
        if (null === $user) {
            return $this->json(['message' => 'User not authenticated'], Response::HTTP_UNAUTHORIZED);
        }

        $now = new \DateTime();
        $eventsData = $this->filterEventsByDate($user, $now, '>=');

        return $this->json($eventsData);
    }

    #[Route('/api/user/eventPast', name: 'api_get_user_event_past', methods: ['GET'])]
    public function getPastEvents(#[CurrentUser] ?User $user): Response
    {
        if (null === $user) {
            return $this->json(['message' => 'User not authenticated'], Response::HTTP_UNAUTHORIZED);
        }

        $now = new \DateTime();
        $eventsData = $this->filterEventsByDate($user, $now, '<');

        return $this->json($eventsData);
    }

    private function filterEventsByDate(User $user, \DateTime $date, string $comparison): array
    {
        $qrCodes = $user->getQrCodes();
        $eventData = [];

        foreach ($qrCodes as $qrCode) {
            $event = $qrCode->getEvent();
            if (!$event) continue;

            // Filter events based on date comparison
            if ($comparison === '>=' && $event->getDate() >= $date || $comparison === '<' && $event->getDate() < $date) {
                $accompagnants = $qrCode->getQrCodeAccompagnants();
                $accompagnantNames = [];
                foreach ($accompagnants as $accompagnant) {
                    $accompagnantUser = $accompagnant->getAccompagnantUser();
                    if ($accompagnantUser) {
                        $accompagnantNames[] = $accompagnantUser->getName(); // Assuming getName method is available
                    }
                }

                $eventData[] = [
                    'qrCodeId' => $qrCode->getId(),
                    'tokenQrCode' => $qrCode->getTokenQrCode(),
                    'isUsed' => $qrCode->isIsUsed(),
                    'event' => [
                        'eventId' => $event->getId(),
                        'eventName' => $event->getName(),
                        'eventDate' => $event->getDate()->format('Y-m-d H:i:s'),
                        'location' => $event->getLocation(),
                        'image' => $event->getImage()
                    ],
                    'accompagnantsCount' => count($accompagnantNames),
                    'accompagnantNames' => $accompagnantNames
                ];
            }
        }

        return $eventData;
    }
}
