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
    public function index(#[CurrentUser] ?User $user): Response
    {
        if (null === $user) {
            return $this->json([
                'message' => 'User not authenticated',
            ], Response::HTTP_UNAUTHORIZED);
        }
        // Initialize the qrCodes collection if it's not already loaded
        if (!$user->getQrCodes()->isInitialized()) {
            $user->getQrCodes()->initialize();
        }

        $qrCodes = $user->getQrCodes();

        // Serialize the collection to array of arrays
        $eventData = [];
        foreach ($qrCodes as $qrCode) {
            $event = $qrCode->getEvent();
            $accompagnants = $qrCode->getQrCodeAccompagnants();
            $accompagnantNames = [];

            // Collecting names of all accompagnants for this QR code
            foreach ($accompagnants as $accompagnant) {
                $accompagnantUser = $accompagnant->getAccompagnantUser();
                if ($accompagnantUser) {
                    $accompagnantNames[] = $accompagnantUser->getName() ; // Assuming getName and getLastname methods are available
                }
            }

            $eventData[] = [
                'qrCodeId' => $qrCode->getId(),
                'tokenQrCode' => $qrCode->getTokenQrCode(),
                'isUsed' => $qrCode->isIsUsed(),
                'event' => $event ? [
                    'eventId' => $event->getId(),
                    'eventName' => $event->getName(), // assuming there is a getName() method in EventJo
                    'eventDate' => $event->getDate()->format('Y-m-d H:i:s') ,
                    'loation' => $event->getLocation(),
                    'image' => $event->getImage()// assuming there is a getDate() method in EventJo
                ] : null,
                'accompagnantsCount' => count($accompagnantNames),
                'accompagnantNames' => $accompagnantNames
            ];
        }

        return $this->json($eventData);
    }
}
