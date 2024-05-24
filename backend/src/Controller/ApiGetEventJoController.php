<?php

namespace App\Controller;

use App\Repository\CategoriesEventRepository;
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
        // je récupère tous les évènements
        $events = $eventJoRepository->findAll();
        $context = [
            DateTimeNormalizer::FORMAT_KEY => 'd/m/Y H:i', // Set the datetime format
            'groups' => 'event:read'
        ];
        // j'utilise le serializer pour éviter les références circulaires
        $json = $serializer->serialize($events, 'json', $context);
        return new Response($json, 200, ['Content-Type' => 'application/json']);
    }
    #[Route('/api/getEvent/byCategories', name: 'app_event_get_by_categories', methods: ['GET'])]
    public function geteventByCategories(CategoriesEventRepository $categoriesEventRepository, SerializerInterface $serializer): Response
    {
        // je récupère toutes les catégories
        $events = $categoriesEventRepository->findAll();
        $context = [
            DateTimeNormalizer::FORMAT_KEY => 'd/m/Y H:i', // Set the datetime format
            'groups' => ['event-category:read']
        ];
        // j'utilise le serializer pour éviter les références circulaires
        $json = $serializer->serialize($events, 'json', $context);
        return new Response($json, 200, ['Content-Type' => 'application/json']);
    }
    #[Route('/api/getEvent/{id}', name: 'app_event_get_id', methods: ['GET'])]
    public function getEvent(EventJoRepository $eventJoRepository, int $id): Response
    {
        // je récupère l'évènement par son id
        $event = $eventJoRepository->find($id);

        // je gère l'erreur si l'évènement n'existe pas
        if (!$event) {
            return $this->json(['message' => 'Event not found'], Response::HTTP_NOT_FOUND);
        }

        return $this->json($event, Response::HTTP_OK, [], ['groups' => ['event:read']]);
    }

    #[Route('/api/getEvent/byCategories/{id}', name: 'api_get_category_by_id', methods: ['GET'])]
    public function getCategoryById(int $id, CategoriesEventRepository $categoriesEventRepository, SerializerInterface $serializer): Response
    {
        // je récupère la catégorie par son id
        $category = $categoriesEventRepository->find($id);

        // je gère l'erreur si la catégorie n'existe pas
        if (!$category) {
            return new Response(json_encode(['error' => 'Category not found']), Response::HTTP_NOT_FOUND, ['Content-Type' => 'application/json']);
        }

        $context = [
            DateTimeNormalizer::FORMAT_KEY => 'd/m/Y H:i', // Set the datetime format
            'groups' => ['event-category:read']
        ];
        // j'utilise le serializer pour éviter les références circulaires
        $json = $serializer->serialize($category, 'json', $context);
        return new Response($json, 200, ['Content-Type' => 'application/json']);
    }
}
