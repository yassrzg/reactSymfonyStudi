<?php

namespace App\Controller;

use App\Entity\EventJo;
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
    public function setEvent(Request $request): Response
    {

        $event = new EventJo();
        $event->setName($request->request->get('name'));
        $event->setDescription($request->request->get('description'));
        $event->setDate(new \DateTime($request->request->get('date')));
        $event->setPrice((float) $request->request->get('price'));
        $event->setLocation($request->request->get('location'));
        $event->setPriceOffertFamille($request->request->get('price_famille'));

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

        $this->entityManager->persist($event);
        $this->entityManager->flush();

        return new Response('Saved new event with id '.$event->getId(), Response::HTTP_CREATED);
    }
}
