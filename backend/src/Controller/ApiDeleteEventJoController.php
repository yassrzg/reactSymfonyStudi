<?php

namespace App\Controller;

use App\Entity\EventJo;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;

class ApiDeleteEventJoController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/api/admin/deleteEvent/{id}', name: 'api_admin_delete_event_jo')]
    public function index(AuthorizationCheckerInterface $authChecker, EventJo $eventJo): JsonResponse
    {
        // vérifie si l'utilisateur est bien admin
        if (!$authChecker->isGranted('ROLE_ADMIN')) {
            return $this->json(['message' => 'Access denied'], Response::HTTP_FORBIDDEN);
        }
        // vérifie si l'evènement existe
        if (!$eventJo) {
            return new JsonResponse(['error' => 'Event not found'], Response::HTTP_NOT_FOUND);
        }
        // vu que j'ai des relation avec QrCodes, pour chaque évènement je supprime les QrCodes
        foreach ($eventJo->getQrCodes() as $qrCode) {
            // vu que j'ai des relation avec QrCodeAccompagnants, pour chaque QrCode je supprime les QrCodeAccompagnants
            foreach ($qrCode->getQrCodeAccompagnants() as $accompagnant) {
                $this->entityManager->remove($accompagnant);
            }
            $this->entityManager->flush(); // Add this line

            $this->entityManager->remove($qrCode);
        }

        // je supprime l'image associé à l'évènement
        $files = new Filesystem();
        $image = $eventJo->getImage();
        $path = $this->getParameter('images_directory') . '/' . $image;
        $files->remove($path);

        // j'enregistre en base de donnée
        $this->entityManager->remove($eventJo);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Event deleted successfully'], Response::HTTP_OK);
    }
}
