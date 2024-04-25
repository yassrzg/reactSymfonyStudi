<?php

namespace App\Entity;

use App\Repository\CategoriesEventRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CategoriesEventRepository::class)]
class CategoriesEvent
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["category_list"])]
    private ?int $id = null;

    #[ORM\ManyToMany(targetEntity: EventJo::class, inversedBy: 'categoriesEvents')]
    private Collection $Categories;

    #[ORM\Column(length: 255)]
    #[Groups(["category_list"])]
    private ?string $name = null;

    public function __construct()
    {
        $this->Categories = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection<int, EventJo>
     */
    public function getCategories(): Collection
    {
        return $this->Categories;
    }

    public function addCategory(EventJo $category): static
    {
        if (!$this->Categories->contains($category)) {
            $this->Categories->add($category);
        }

        return $this;
    }

    public function removeCategory(EventJo $category): static
    {
        $this->Categories->removeElement($category);

        return $this;
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
}
