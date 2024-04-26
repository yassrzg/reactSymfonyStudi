<?php

namespace App\Controller;

use App\Entity\EventJo;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

class ApiDeleteEventJoController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/api/deleteEvent/{id}', name: 'app_api_delete_event_jo')]
    public function index(EventJo $eventJo): JsonResponse
    {
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
