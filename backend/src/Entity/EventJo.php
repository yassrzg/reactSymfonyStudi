<?php

namespace App\Entity;

use App\Repository\EventJoRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: EventJoRepository::class)]
class EventJo
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['event:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['event:read'])]
    private ?string $name = null;

    #[ORM\Column(length: 2000)]
    #[Groups(['event:read'])]
    private ?string $description = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Groups(['event:read'])]
    private ?\DateTimeInterface $date = null;

    #[ORM\Column(length: 255)]
    #[Groups(['event:read'])]
    private ?string $image = null;

    #[ORM\Column]
    #[Groups(['event:read'])]
    private ?float $price = null;

    #[ORM\Column(length: 1000)]
    #[Groups(['event:read'])]
    private ?string $location = null;

    #[ORM\ManyToMany(targetEntity: CategoriesEvent::class, mappedBy: 'Categories')]
    private Collection $categoriesEvents;

    #[ORM\Column]
    private ?float $PriceOffertFamille = null;

    #[ORM\Column(nullable: true)]
    private ?float $stockage = null;

    public function __construct()
    {
        $this->categoriesEvents = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): static
    {
        $this->date = $date;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): static
    {
        $this->image = $image;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getLocation(): ?string
    {
        return $this->location;
    }

    public function setLocation(string $location): static
    {
        $this->location = $location;

        return $this;
    }

    /**
     * @return Collection<int, CategoriesEvent>
     */
    public function getCategoriesEvents(): Collection
    {
        return $this->categoriesEvents;
    }

    public function addCategoriesEvent(CategoriesEvent $categoriesEvent): static
    {
        if (!$this->categoriesEvents->contains($categoriesEvent)) {
            $this->categoriesEvents->add($categoriesEvent);
            $categoriesEvent->addCategory($this);
        }

        return $this;
    }

    public function removeCategoriesEvent(CategoriesEvent $categoriesEvent): static
    {
        if ($this->categoriesEvents->removeElement($categoriesEvent)) {
            $categoriesEvent->removeCategory($this);
        }

        return $this;
    }

    public function getPriceOffertFamille(): ?float
    {
        return $this->PriceOffertFamille;
    }

    public function setPriceOffertFamille(float $PriceOffertFamille): static
    {
        $this->PriceOffertFamille = $PriceOffertFamille;

        return $this;
    }

    public function getStockage(): ?float
    {
        return $this->stockage;
    }

    public function setStockage(?float $stockage): static
    {
        $this->stockage = $stockage;

        return $this;
    }
}
