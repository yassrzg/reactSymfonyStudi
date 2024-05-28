<?php

namespace App\Entity;

use App\Repository\StatsEventPurchaseRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: StatsEventPurchaseRepository::class)]
class StatsEventPurchase
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['event_purchase_stat:read'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['event_purchase_stat:read'])]
    private ?int $count = null;

    #[ORM\ManyToOne(inversedBy: 'statsEventPurchases')]
    #[Groups(['event_purchase_stat:read'])]
    private ?EventJo $event = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCount(): ?int
    {
        return $this->count;
    }

    public function setCount(int $count): static
    {
        $this->count = $count;

        return $this;
    }

    public function getEvent(): ?EventJo
    {
        return $this->event;
    }

    public function setEvent(?EventJo $event): static
    {
        $this->event = $event;

        return $this;
    }
}
