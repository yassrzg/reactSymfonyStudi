<?php

namespace App\Controller;

use App\Repository\EventJoRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

class ApiGetEventJoController extends AbstractController
{
    #[Route('/api/getEvent', name: 'app_event_get', methods: ['GET'])]
    public function index(EventJoRepository $eventJoRepository, SerializerInterface $serializer): Response
    {
        $events = $eventJoRepository->findAll();
        $context = [
            DateTimeNormalizer::FORMAT_KEY => 'd/m/Y H:i', // Set the datetime format
            'groups' => 'event:read'
        ];
        $json = $serializer->serialize($events, 'json', $context);
        return new Response($json, 200, ['Content-Type' => 'application/json']);
    }
    #[Route('/api/getEvent/{id}', name: 'app_event_get_id', methods: ['GET'])]
    public function getEvent(EventJoRepository $eventJoRepository, int $id): Response
    {
        $event = $eventJoRepository->findById($id);

        if (!$event) {
            return $this->json(['message' => 'Event not found'], Response::HTTP_NOT_FOUND);
        }

        return $this->json($event, Response::HTTP_OK, [], ['groups' => ['event:read']]);
    }
}
