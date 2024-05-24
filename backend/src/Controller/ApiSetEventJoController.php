<?php

namespace App\Controller;

use App\Entity\CategoriesEvent;
use App\Entity\EventJo;
use App\Repository\CategoriesEventRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;

class ApiSetEventJoController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager) {
        $this->entityManager = $entityManager;
    }


    #[Route('api/admin/setEvent', name: 'api_admin_event_set', methods: ['POST'])]
    public function setEvent(Request $request, CategoriesEventRepository $categoriesEventRepository, AuthorizationCheckerInterface $authChecker): Response
    {
        // vérifie si l'utilisateur est bien admin
        if (!$authChecker->isGranted('ROLE_ADMIN')) {
            return $this->json(['message' => 'Access denied'], Response::HTTP_FORBIDDEN);
        }
        // création d'un nouvel event
        $event = new EventJo();
        return $this->processEvent($request, $event, $categoriesEventRepository, 'Created');
    }

    #[Route('api/admin/updateEvent/{id}', name: 'api_admin_event_update', methods: ['POST'])]
    public function updateEvent(AuthorizationCheckerInterface $authChecker, Request $request, int $id, CategoriesEventRepository $categoriesEventRepository): Response
    {
        // vérifie si l'utilisateur est bien admin
        if (!$authChecker->isGranted('ROLE_ADMIN')) {
            return $this->json(['message' => 'Access denied'], Response::HTTP_FORBIDDEN);
        }
        // recherche de l'event par l'id
        $event = $this->entityManager->getRepository(EventJo::class)->find($id);
        if (!$event) {
            return $this->json(['error' => 'Event not found'], Response::HTTP_NOT_FOUND);
        }


        return $this->processEvent($request, $event, $categoriesEventRepository, 'Updated');
    }

    // Méthode pour traiter la création et la mise à jour d'un évènement
    private function processEvent(Request $request, EventJo $event, CategoriesEventRepository $categoriesEventRepository, $action = 'Updated'): Response
    {
        $event->setName($request->get('name', $event->getName()));
        $event->setDescription($request->get('description', $event->getDescription()));
        $event->setLocation($request->get('location', $event->getLocation()));
        $event->setPrice((float) $request->get('price', $event->getPrice()));
        $event->setPriceOffertFamille((float) $request->get('price_famille', $event->getPriceOffertFamille()));
        $event->setPriceOffertDuo((float) $request->get('price_duo', $event->getPriceOffertDuo())); // Handling new field
        $event->setStockage((float) $request->get('stock', $event->getStockage()));

        try {
            $event->setDate($this->parseDate($request->get('date')));
        } catch (\InvalidArgumentException $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }

        $this->handleFileUpload($request, $event);
        $this->updateCategories($request->get('category', ''), $event, $categoriesEventRepository);

        $this->entityManager->persist($event);
        $this->entityManager->flush();

        return $this->json(['message' => 'Event ' . $action . ' successfully'], Response::HTTP_OK);
    }

    // Méthode pour gérer l'upload de fichier
    private function handleFileUpload(Request $request, EventJo $event) {
        $file = $request->files->get('image');
        if ($file) {
            $newFilename = uniqid() . '.' . $file->guessExtension();
            try {
                $file->move($this->getParameter('images_directory'), $newFilename);
                $event->setImage($newFilename);
            } catch (FileException $e) {
                throw new \RuntimeException("Error uploading file: " . $e->getMessage());
            }
        }
    }

    // Méthode pour mettre à jour la catégorie de l'évènement
    private function updateCategories($categoryId, EventJo $event, CategoriesEventRepository $categoriesEventRepository) {
        if ($categoryId) {
            $category = $categoriesEventRepository->find($categoryId);
            if ($category) {
                $event->setCategory($category);
            }
        }
    }

    // Méthode pour formater la date
    private function parseDate($dateString) {
        $date = \DateTime::createFromFormat('d/m/Y H:i', $dateString);
        if (!$date) {
            throw new \InvalidArgumentException("Invalid date format: " . implode(", ", \DateTime::getLastErrors()["errors"]));
        }
        return $date;
    }


}

