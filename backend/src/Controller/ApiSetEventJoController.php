<?php

namespace App\Controller;

use App\Entity\CategoriesEvent;
use App\Entity\EventJo;
use App\Repository\CategoriesEventRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
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
        $event->setName($request->request->get('name'));
        $event->setDescription($request->request->get('description'));
        $event->setDate(new \DateTime($request->request->get('date')));
        $event->setPrice((float) $request->request->get('price'));
        $event->setLocation($request->request->get('location'));
        $event->setPriceOffertFamille($request->request->get('price_famille'));
        $event->setStockage($request->request->get('stock'));

        // Handle File Upload
        $file = $request->files->get('image');

        if ($file) {
            $newFilename = uniqid().'.'.$file->guessExtension();

            try {
                $file->move($this->getParameter('images_directory'), $newFilename);
                $event->setImage($newFilename);
            } catch (FileException $e) {
                // Handle exception if something happens during file upload
                return new Response("Error uploading file: " . $e->getMessage(), Response::HTTP_BAD_REQUEST);
            }
        }
        $categoriesIdsString = $request->request->get('category');
        $categoriesIds = explode(',', $categoriesIdsString);
        foreach ($categoriesIds as $categoryId) {
            $category = $this->entityManager->getRepository(CategoriesEvent::class)->find($categoryId);
            $event->addCategoriesEvent($category);
        }

        $this->entityManager->persist($event);
        $this->entityManager->flush();

        return new Response('Saved new event', Response::HTTP_CREATED);
    }

    #[Route('api/updateEvent/{id}', name: 'api_event_update', methods: ['POST'])]
    public function updateEvent(Request $request, int $id, CategoriesEventRepository $categoriesEventRepository): Response
    {
        $event = $this->entityManager->getRepository(EventJo::class)->find($id);
        if (!$event) {
            return $this->json(['error' => 'Event not found'], Response::HTTP_NOT_FOUND);
        }

        // Use general `$request->get()` method which works well with `multipart/form-data`
        $name = $request->get('name');
        if ($name) {
            $event->setName($name);
        }

        $description = $request->get('description');
        if ($description) {
            $event->setDescription($description);
        }

        $date = $request->get('date');
        if ($date) {
            try {
                $event->setDate(new \DateTime($date));
            } catch (\Exception $e) {
                return $this->json(['error' => "Invalid date format: " . $date], Response::HTTP_BAD_REQUEST);
            }
        }

        $price = $request->get('price');
        if (is_numeric($price)) {
            $event->setPrice((float)$price);
        }

        $location = $request->get('location');
        if ($location) {
            $event->setLocation($location);
        }

        $priceOffertFamille = $request->get('PriceOffertFamille');
        if (is_numeric($priceOffertFamille)) {
            $event->setPriceOffertFamille((float)$priceOffertFamille);
        }

        $stock = $request->get('stock');
        if (is_numeric($stock)) {
            $event->setStockage((float)$stock);
        }

        // File processing remains unchanged
        $file = $request->files->get('image');
        if ($file) {
            $newFilename = uniqid().'.'.$file->guessExtension();
            try {
                $file->move($this->getParameter('images_directory'), $newFilename);
                $event->setImage($newFilename);
            } catch (FileException $e) {
                return $this->json(['error' => "Error uploading file: " . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        }

        // Categories processing remains unchanged
        $categoriesIdsString = $request->get('category');
        if ($categoriesIdsString) {
            $categoriesIds = explode(',', $categoriesIdsString);
            // Update categories as previously described
        }
//        dd($event);

        $this->entityManager->persist($event);
        $this->entityManager->flush();

        return $this->json(['message' => 'Event updated successfully'], Response::HTTP_OK);
    }

}

