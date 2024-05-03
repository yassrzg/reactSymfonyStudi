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
        if (!$authChecker->isGranted('ROLE_ADMIN')) {
            return $this->json(['message' => 'Access denied'], Response::HTTP_FORBIDDEN);
        }

        if (!$eventJo) {
            return new JsonResponse(['error' => 'Event not found'], Response::HTTP_NOT_FOUND);
        }

        $files = new Filesystem();
        $image = $eventJo->getImage();
        $path = $this->getParameter('images_directory') . '/' . $image;
        $files->remove($path);

        // Delete the event
        $this->entityManager->remove($eventJo);
        $this->entityManager->flush();

        // Return a success message
        return new JsonResponse(['message' => 'Event deleted successfully'], Response::HTTP_OK);
    }
}
