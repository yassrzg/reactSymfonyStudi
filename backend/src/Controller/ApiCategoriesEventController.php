<?php

namespace App\Controller;

use App\Entity\CategoriesEvent;
use App\Repository\CategoriesEventRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Serializer\SerializerInterface;

class ApiCategoriesEventController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    #[Route('/api/admin/setCategories', name: 'api_admin_create_category', methods: ['POST'])]
    public function create(Request $request, AuthorizationCheckerInterface $authChecker): Response
    {
        // Je vérifie si l'utilisateur est bien admin
        if (!$authChecker->isGranted('ROLE_ADMIN')) {
            return $this->json(['message' => 'Access denied'], Response::HTTP_FORBIDDEN);
        }

        // je récupère le contenu de la requête
        $data = json_decode($request->getContent(), true);

        $category = new CategoriesEvent();

        // je vérifie si le champ name est bien rempli
        if (!empty($data['name'])) {
            $category->setName($data['name']);
        } else {
            return $this->json(['message' => 'Name is required'], Response::HTTP_BAD_REQUEST);
        }

        // j'enregistre en base de donnée

        $this->entityManager->persist($category);
        $this->entityManager->flush();

        // je renvoie les données pour les ajoutés dynamiquement
        return $this->json([
            'id' => $category->getId(),
            'name' => $category->getName()
        ], Response::HTTP_CREATED);
    }

    #[Route('/api/getCategories', name: 'api_get_categories', methods: ['GET'])]
    public function getCategories(CategoriesEventRepository $categoriesEventRepository, SerializerInterface $serializer): Response
    {
        // je récupère toutes les catégories
        $categories = $categoriesEventRepository->findAll();
        // pour éviter les références circulaires
        $jsonContent = $serializer->serialize($categories, 'json', ['groups' => 'category_list']);

        return new Response($jsonContent, Response::HTTP_OK, ['Content-Type' => 'application/json']);
    }

}
