<?php

namespace App\Entity;

use App\Repository\StatsQrCodeRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: StatsQrCodeRepository::class)]
class StatsQrCode
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::INTEGER)]
    private ?int $month = null;

    #[ORM\Column(type: Types::INTEGER)]
    private ?int $year = null;

    #[ORM\Column]
    private ?int $qrCodeCount = null;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getYear(): ?int
    {
        return $this->year;
    }

    public function setYear(int $year): self
    {
        $this->year = $year;
        return $this;
    }

    public function getQrCodeCount(): ?int
    {
        return $this->qrCodeCount;
    }

    public function setQrCodeCount(int $qrCodeCount): self
    {
        $this->qrCodeCount = $qrCodeCount;
        return $this;
    }
}
