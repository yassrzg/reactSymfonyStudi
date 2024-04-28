<?php

namespace App\Controller;

use App\Entity\Accompagnant;
use App\Entity\EventJo;
use App\Entity\QrCode;
use App\Entity\QrCodeAccompagnant;
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
    public function index(Request $request): Response
    {
//        $data = json_decode($request->getContent(), true);

        $eventId = $request->get('eventId');
        $userEmail = $request->get('userEmail');
        $companions = $request->get('companions');

//        dd($companions);
        $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $userEmail]);
        if (!$user) {
            return new JsonResponse(['message' => 'User not found'], 404);
        }

        $event = $this->entityManager->getRepository(EventJo::class)->find($eventId);
        if (!$event) {
            return new JsonResponse(['message' => 'Event not found'], 404);
        }

        $countOfStock = $event->getStockage();
        if ($countOfStock <= 0) {
            return new JsonResponse(['message' => 'No more stock available for the event'], 409); // Conflict status code
        }

        $qrCode = new QrCode();
        $qrCode->setTokenQrCode(uniqid());
        $qrCode->setUserToken($user->getToken());
        $qrCode->setEvent($event);
        $qrCode->setUser($user);
        $qrCode->setIsUsed(false);  // Initialize as not used
        $qrCode->setTokenUrl(uniqid());  // Generate a random token URL
        $event->setStockage($countOfStock - 1);

        $this->entityManager->persist($qrCode);

        if($companions) {
            foreach ($companions as $companionData) {
                $countOfStock = $event->getStockage(); // Refresh stock count from the event
                if ($countOfStock <= 0) {
                    return new JsonResponse(['message' => 'No more stock available for the event'], 409); // Conflict status code
                }

                $companion = new Accompagnant();
                $companion->setName($companionData['name'] ?? 'Default Name');
                $companion->setLastname($companionData['surname'] ?? 'Default Surname');
                $this->entityManager->persist($companion);

                $qrCodeAccompagnant = new QrCodeAccompagnant();
                $qrCodeAccompagnant->setQrCodeUser($qrCode);
                $qrCodeAccompagnant->setAccompagnantUser($companion);
                $qrCodeAccompagnant->setIsUsed(false);  // Initialize as not used
                $qrCodeAccompagnant->setTokenUrl(uniqid());  // Generate a random token URL
                $this->entityManager->persist($qrCodeAccompagnant);
                $event->setStockage($event->getStockage() - 1);
            }
        }

        $this->entityManager->flush();

        return new JsonResponse(['message' => 'QR code and companions created successfully'], 200);
    }
    #[Route('/api/get-qrcode/{id}', name: 'api_qr_code', methods: ['GET'])]
    public function getQrCode(#[CurrentUser] ?User $user, int $id,  SerializerInterface $serializer, QrCodeRepository $qrCodeRepository): Response
    {
        if (null === $user) {
            return $this->json([
                'message' => 'User not authenticated',
            ], Response::HTTP_UNAUTHORIZED);
        }

        // Fetching the QR code by ID
//        $qrCode = $this->getDoctrine()->getRepository(QrCode::class)->find($id);
        $qrCode = $this->entityManager->getRepository(QrCode::class)->find($id);


        if (!$qrCode) {
            return $this->json(['message' => 'QR code not found'], 404);
        }

        // Checking if the QR code belongs to the current user
        if ($qrCode->getUser() !== $user) {
            return $this->json(['message' => 'QR code does not belong to this user'], 403);
        }
        $userQrCode = $qrCode->getUser($user);
        $nameUser = $userQrCode->getFirstname();
        $lastnameUser = $userQrCode->getLastname();

        $event = $qrCode->getEvent();
        $eventName = $event->getName();  // This should load the object
        $eventLocation = $event->getLocation();
        $eventDate = $event->getDate();
        $isUsed = $qrCode->isIsUsed();
        $tokenUrl = $qrCode->getTokenUrl();

        $accompagnants = $qrCode->getQrCodeAccompagnants();
        $accompagnantData = [];

// Iterate over the collection of accompagnants once and collect all necessary information
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
            // If found, gather data from the primary QR code
            $user = $qrCode->getUser();
            $event = $qrCode->getEvent();
            $qrData = [
                'name' => $user ? $user->getFirstname() : 'Unknown',
                'surname' => $user ? $user->getLastname() : 'Unknown',
                'eventName' => $event ? $event->getName() : 'Unknown',
                'eventLocation' => $event ? $event->getLocation() : 'Unknown',
                'eventDate' => $event ? $event->getDate()->format('Y-m-d H:i:s') : 'Unknown',
                'isUsed' => $qrCode->isIsUsed(),
                'type' => 'primary'
            ];
        } else {
            // If not found, try finding the accompanying QR code
            $qrCode = $entityManager->getRepository(QrCodeAccompagnant::class)->findOneBy(['TokenUrl' => $token]);
            if (!$qrCode) {
                // If no QR code is found, return a not found JSON response
                return new JsonResponse(['message' => 'QR code not found'], 404);
            }
            // Gather data from the accompanying QR code
            $accompagnant = $qrCode->getAccompagnantUser();
            $QrCodeUser = $qrCode->getQrCodeUser();
            $event = $QrCodeUser ? $QrCodeUser->getEvent() : null;
            $qrData = [
                'name' => $accompagnant ? $accompagnant->getName() : 'Unknown',
                'surname' => $accompagnant ? $accompagnant->getLastname() : 'Unknown',
                'eventName' => $event ? $event->getName() : 'Unknown',
                'eventLocation' => $event ? $event->getLocation() : 'Unknown',
                'eventDate' => $event ? $event->getDate()->format('Y-m-d H:i:s') : 'Unknown',
                'isUsed' => $qrCode->isIsUsed(),
                'type' => 'accompagnant'
            ];
        }

        return new JsonResponse($qrData);
    }

}