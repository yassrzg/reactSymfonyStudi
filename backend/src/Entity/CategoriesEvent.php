<?php

namespace App\Entity;

use App\Repository\CategoriesEventRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity(repositoryClass: CategoriesEventRepository::class)]
class CategoriesEvent
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["category_list", 'event:read', 'event-category:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["category_list", 'event:read', 'event-category:read'])]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: "category", targetEntity: EventJo::class)]
    #[Groups(['event-category:read'])]  // Ensuring correct serialization group
    private Collection $events;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function addEvent(EventJo $event): self {
        if (!$this->events->contains($event)) {
            $this->events[] = $event;
            $event->setCategory($this);
        }
        return $this;
    }

    public function removeEvent(EventJo $event): self {
        if ($this->events->removeElement($event)) {
            // set the owning side to null (unless already changed)
            if ($event->getCategory() === $this) {
                $event->setCategory(null);
            }
        }
        return $this;
    }

    public function getEvents(): Collection {
        return $this->events;
    }
}