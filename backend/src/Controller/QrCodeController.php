<?php

namespace App\Controller;

use App\Entity\Accompagnant;
use App\Entity\EventJo;
use App\Entity\QrCode;
use App\Entity\QrCodeAccompagnant;
use App\Entity\StatsQrCode;
use App\Entity\User;
use App\Repository\QrCodeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class QrCodeController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager) {
        $this->entityManager = $entityManager;
    }

    #[Route('/api/create-qrcode', methods: ['POST'], name: 'api_create_qr_code')]
    public function createQrCode(Request $request): Response
    {
        $eventId = $request->get('eventId');
        $userEmail = $request->get('userEmail');
        $companions = $request->get('companions', []);

        $userRepository = $this->entityManager->getRepository(User::class);
        $user = $userRepository->findOneBy(['email' => $userEmail]);

        // gérer les erreurs
        if (!$user) {
            return new JsonResponse(['message' => 'User not found'], 404);
        }

        if (!$user->isIsDoubleAuth()) {
            return new JsonResponse(['message' => 'Double authentication is required'], 401);
        }

        $eventRepository = $this->entityManager->getRepository(EventJo::class);
        $event = $eventRepository->find($eventId);

        if (!$event) {
            return new JsonResponse(['message' => 'Event not found'], 404);
        }

        if ($event->getDate() < new \DateTime('now', new \DateTimeZone('Europe/Paris'))) {
            return new JsonResponse(['message' => 'Event already passed'], 400);
        }

        if ($event->getStockage() <= 0) {
            return new JsonResponse(['message' => 'No more stock available for the event'], 409);
        }

        $qrCodeRepository = $this->entityManager->getRepository(QrCode::class);
        $existingQrCode = $qrCodeRepository->findOneByEventAndUser($eventId, $user->getId());

        if ($existingQrCode) {
            return new JsonResponse(['message' => 'QR code already exists for this user and event'], 409);
        }

        // gère le stockage

        $event->setStockage($event->getStockage() - 1);

        // création du qr code

        $qrCode = new QrCode();
        $qrCode->setTokenQrCode(uniqid());
        $qrCode->setUserToken($user->getToken());
        $qrCode->setEvent($event);
        $qrCode->setUser($user);
        $qrCode->setIsUsed(false);
        $qrCode->setCreatedAt(new \DateTimeImmutable('now', new \DateTimeZone('Europe/London')));
        $qrCode->setIsPaye(true);
        $qrCode->setNumCommand(uniqid());
        $qrCode->setTokenUrl(uniqid());

        $this->entityManager->persist($qrCode);
        // création des accompagnants + qr code et mise à jour des stats
        $this->handleCompanions($companions, $user, $event, $qrCode);
        $this->updateQrCodeStats();

        $this->entityManager->flush();

        return new JsonResponse(['message' => 'QR code and companions created successfully'], 200);
    }

    private function updateQrCodeStats(): void
    {
        $currentMonth = (int) date('m');
        $currentYear = (int) date('Y');
        $statsRepository = $this->entityManager->getRepository(StatsQrCode::class);
        $stats = $statsRepository->findOneBy([
            'month' => $currentMonth,
            'year' => $currentYear
        ]);

        if (!$stats) {
            $stats = new StatsQrCode();
            $stats->setMonth($currentMonth);
            $stats->setYear($currentYear);
            $stats->setQrCodeCount(1);
        } else {
            $stats->setQrCodeCount($stats->getQrCodeCount() + 1);
        }

        $this->entityManager->persist($stats);
    }

    private function handleCompanions(array $companions, User $user, EventJo $event, QrCode $qrCode): void
    {
        foreach ($companions as $companionData) {
            // vérifie si le stockage est disponible
            if ($event->getStockage() <= 0) {
                throw new \Exception('No more stock available for the event');
            }

            $name = $companionData['name'] ?? 'Default Name';
            $lastname = $companionData['surname'] ?? 'Default Surname';
            $companionRepository = $this->entityManager->getRepository(Accompagnant::class);
            $companion = $companionRepository->findOneByNameLastnameAndUserId($name, $lastname, $user->getId());

            if (!$companion) {
                $companion = new Accompagnant();
                $companion->setName($name);
                $companion->setLastname($lastname);
                $companion->setMainUser($user);
                $this->entityManager->persist($companion);
            }

            $companion->addEvent($event);
            $event->setStockage($event->getStockage() - 1);

            $qrCodeCompanion = new QrCodeAccompagnant();
            $qrCodeCompanion->setQrCodeUser($qrCode);
            $qrCodeCompanion->setAccompagnantUser($companion);
            $qrCodeCompanion->setIsUsed(false);
            $qrCodeCompanion->setTokenUrl(uniqid());
            $qrCodeCompanion->setCreatedAt(new \DateTimeImmutable('now', new \DateTimeZone('Europe/London')));
            $this->updateQrCodeStats();
            $this->entityManager->persist($qrCodeCompanion);

        }
    }
    #[Route('/api/get-qrcode/{id}', name: 'api_qr_code', methods: ['GET'])]
    public function getQrCode(#[CurrentUser] ?User $user, int $id,  SerializerInterface $serializer, QrCodeRepository $qrCodeRepository): Response
    {
        if (null === $user) {
            return $this->json([
                'message' => 'User not authenticated',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $qrCode = $this->entityManager->getRepository(QrCode::class)->find($id);


        if (!$qrCode) {
            return $this->json(['message' => 'QR code not found'], 404);
        }


        if ($qrCode->getUser() !== $user) {
            return $this->json(['message' => 'QR code does not belong to this user'], 403);
        }
        $userQrCode = $qrCode->getUser($user);
        $nameUser = $userQrCode->getFirstname();
        $lastnameUser = $userQrCode->getLastname();

        $event = $qrCode->getEvent();
        $eventName = $event->getName();
        $eventLocation = $event->getLocation();
        $eventDate = $event->getDate();
        $isUsed = $qrCode->isIsUsed();
        $tokenUrl = $qrCode->getTokenUrl();

        $accompagnants = $qrCode->getQrCodeAccompagnants();
        $accompagnantData = [];


        foreach ($accompagnants as $accompagnant) {
            $accompagnantData[] = [
                'name' => $accompagnant->getAccompagnantUser()->getName(),
                'lastname' => $accompagnant->getAccompagnantUser()->getLastname(),
                'tokenUrl' => $accompagnant->getTokenUrl(), // Add token URL in the same data structure
                'isUsed' => $accompagnant->isIsUsed()
            ];
        }

        $qrCodeData = [
            'userFirstName' => $nameUser,
            'userLastName' => $lastnameUser,
            'eventName' => $eventName,
            'isUsed' => $isUsed,
            'eventLocation' => $eventLocation,
            'eventDate' => $eventDate->format('Y-m-d H:i:s'),
            'accompagnants' => $accompagnantData,
            'tokenUrl' => $tokenUrl,

        ];

        return new JsonResponse($qrCodeData, 200);
    }
    #[Route('/api/get-data-qr-code/{token}', name: 'api_get_data_qr_code', methods: ['GET'])]
    public function getDataUserQrCode(string $token, EntityManagerInterface $entityManager): Response
    {


        $qrCode = $entityManager->getRepository(QrCode::class)->findOneBy(['TokenUrl' => $token]);
        if ($qrCode) {

            $user = $qrCode->getUser();
            $event = $qrCode->getEvent();
            $qrData = [
                'mainUser' => null,
                'name' => $user ? $user->getFirstname() : 'Unknown',
                'surname' => $user ? $user->getLastname() : 'Unknown',
                'eventName' => $event ? $event->getName() : 'Unknown',
                'eventLocation' => $event ? $event->getLocation() : 'Unknown',
                'eventDate' => $event ? $event->getDate()->format('Y-m-d H:i:s') : 'Unknown',
                'isUsed' => $qrCode->isIsUsed(),
                'times' => $qrCode->getCreatedAt()->format('Y-m-d H:i:s'),
                'type' => 'Principal acheteur'
            ];
        } else {

            $qrCode = $entityManager->getRepository(QrCodeAccompagnant::class)->findOneBy(['TokenUrl' => $token]);
            if (!$qrCode) {

                return new JsonResponse(['message' => 'QR code not found'], 404);
            }

            $accompagnant = $qrCode->getAccompagnantUser();
            $QrCodeUser = $qrCode->getQrCodeUser();
            $event = $QrCodeUser ? $QrCodeUser->getEvent() : null;
            $mainUserName = $accompagnant ? $accompagnant->getMainUser()->getFirstname() : null;
            $mainUserLastname = $accompagnant ? $accompagnant->getMainUser()->getLastname() : null;
            $mainUser = $mainUserName . ' ' . $mainUserLastname;
            $qrData = [
                'mainUser' => $mainUser,
                'name' => $accompagnant ? $accompagnant->getName() : 'Unknown',
                'surname' => $accompagnant ? $accompagnant->getLastname() : 'Unknown',
                'eventName' => $event ? $event->getName() : 'Unknown',
                'eventLocation' => $event ? $event->getLocation() : 'Unknown',
                'eventDate' => $event ? $event->getDate()->format('Y-m-d H:i:s') : 'Unknown',
                'isUsed' => $qrCode->isIsUsed(),
                'times' => $qrCode->getCreatedAt()->format('Y-m-d H:i:s'),
                'type' => 'Accompagnant'
            ];
        }

        return new JsonResponse($qrData);
    }

}