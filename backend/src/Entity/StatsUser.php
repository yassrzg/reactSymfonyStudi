<?php

namespace App\Entity;

use App\Repository\StatsUserRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: StatsUserRepository::class)]
class StatsUser
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    // Champs pour stocker l'année et le mois de l'agrégat
    #[ORM\Column(type: Types::INTEGER)]
    private ?int $year = null;

    #[ORM\Column(type: Types::INTEGER)]
    private ?int $month = null;

    // Compteur des connexions
    #[ORM\Column]
    private ?int $loginCount = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getYear(): ?int
    {
        return $this->year;
    }

    public function setYear(int $year): self
    {
        $this->year = $year;
        return $this;
    }

    public function getMonth(): ?int
    {
        return $this->month;
    }

    public function setMonth(int $month): self
    {
        $this->month = $month;
        return $this;
    }

    public function getLoginCount(): ?int
    {
        return $this->loginCount;
    }

    public function setLoginCount(int $loginCount): self
    {
        $this->loginCount = $loginCount;
        return $this;
    }

    public function incrementLoginCount(): self
    {
        $this->loginCount = ($this->loginCount ?? 0) + 1;
        return $this;
    }
}
