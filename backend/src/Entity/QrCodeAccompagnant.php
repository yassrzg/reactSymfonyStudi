<?php

namespace App\Entity;

use App\Repository\QrCodeAccompagnantRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: QrCodeAccompagnantRepository::class)]
class QrCodeAccompagnant
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['qrcodeUser'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'qrCodeAccompagnants')]
    #[Groups(['qrcodeUser'])]
    private ?QrCode $QrCodeUser = null;

    #[ORM\ManyToOne(inversedBy: 'qrCodeAccompagnants')]
    #[Groups(['qrcodeUser'])]
    private ?Accompagnant $accompagnantUser = null;

    #[ORM\Column]
    #[Groups(['qrcodeUser'])]
    private ?bool $isUsed = null;

    #[ORM\Column(length: 255)]
    private ?string $TokenUrl = null;

    #[ORM\Column(type: "datetime_immutable", nullable: true)]
    private ?\DateTimeImmutable $created_at = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQrCodeUser(): ?QrCode
    {
        return $this->QrCodeUser;
    }

    public function setQrCodeUser(?QrCode $QrCodeUser): static
    {
        $this->QrCodeUser = $QrCodeUser;

        return $this;
    }

    public function getAccompagnantUser(): ?Accompagnant
    {
        return $this->accompagnantUser;
    }

    public function setAccompagnantUser(?Accompagnant $accompagnantUser): static
    {
        $this->accompagnantUser = $accompagnantUser;

        return $this;
    }

    public function isIsUsed(): ?bool
    {
        return $this->isUsed;
    }

    public function setIsUsed(bool $isUsed): static
    {
        $this->isUsed = $isUsed;

        return $this;
    }

    public function getTokenUrl(): ?string
    {
        return $this->TokenUrl;
    }

    public function setTokenUrl(string $TokenUrl): static
    {
        $this->TokenUrl = $TokenUrl;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeImmutable $created_at): static
    {
        $this->created_at = $created_at;

        return $this;
    }
}
