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

class ApiSetEventJoController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager) {
        $this->entityManager = $entityManager;
    }


    #[Route('api/setEvent', name: 'event_set', methods: ['POST'])]
    public function setEvent(Request $request, CategoriesEventRepository $categoriesEventRepository): Response
    {
        $event = new EventJo();
        return $this->processEvent($request, $event, $categoriesEventRepository, 'Created');
    }

    #[Route('api/updateEvent/{id}', name: 'api_event_update', methods: ['POST'])]
    public function updateEvent(Request $request, int $id, CategoriesEventRepository $categoriesEventRepository): Response
    {
        $event = $this->entityManager->getRepository(EventJo::class)->find($id);
        if (!$event) {
            return $this->json(['error' => 'Event not found'], Response::HTTP_NOT_FOUND);
        }

        return $this->processEvent($request, $event, $categoriesEventRepository, 'Updated');
    }

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

    private function updateCategories($categoryId, EventJo $event, CategoriesEventRepository $categoriesEventRepository) {
        if ($categoryId) {
            $category = $categoriesEventRepository->find($categoryId);
            if ($category) {
                $event->setCategory($category); // Assuming you have a setCategory method appropriate for many-to-one
            }
        }
    }

    private function parseDate($dateString) {
        $date = \DateTime::createFromFormat('d/m/Y H:i', $dateString);
        if (!$date) {
            throw new \InvalidArgumentException("Invalid date format: " . implode(", ", \DateTime::getLastErrors()["errors"]));
        }
        return $date;
    }

//    private function deleteImage($imageName) {
//        $files = new Filesystem();
//        $imagePath = $this->getParameter('images_directory') . '/' . $imageName;
//        if ($files->exists($imagePath)) {
//            $files->remove($imagePath);
//        }
//    }

}

