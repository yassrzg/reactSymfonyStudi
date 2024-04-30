<?php

namespace App\Entity;

use App\Repository\QrCodeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: QrCodeRepository::class)]
class QrCode
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $userToken = null;

    #[ORM\ManyToOne(inversedBy: 'qrCodes')]
    private ?User $user = null;

    #[ORM\ManyToOne(inversedBy: 'qrCodes')]
    private ?EventJo $event = null;

    #[ORM\Column(length: 255)]
    private ?string $tokenQrCode = null;

    #[ORM\OneToMany(mappedBy: 'QrCodeUser', targetEntity: QrCodeAccompagnant::class)]
    private Collection $qrCodeAccompagnants;

    #[ORM\Column]
    private ?bool $IsUsed = null;

    #[ORM\Column(length: 255)]
    private ?string $TokenUrl = null;

    #[ORM\Column(type: "datetime_immutable", nullable: true)]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\Column(length: 255)]
    private ?string $NumCommand = null;

    public function __construct()
    {
        $this->qrCodeAccompagnants = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

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

    public function getTokenQrCode(): ?string
    {
        return $this->tokenQrCode;
    }

    public function setTokenQrCode(string $tokenQrCode): static
    {
        $this->tokenQrCode = $tokenQrCode;

        return $this;
    }

    public function setUserToken(string $userToken): void
    {
        $this->userToken = $userToken;
    }

    // Getter method for getting the user token
    public function getUserToken(): ?string
    {
        return $this->userToken;
    }

    /**
     * @return Collection<int, QrCodeAccompagnant>
     */
    public function getQrCodeAccompagnants(): Collection
    {
        return $this->qrCodeAccompagnants;
    }

    public function addQrCodeAccompagnant(QrCodeAccompagnant $qrCodeAccompagnant): static
    {
        if (!$this->qrCodeAccompagnants->contains($qrCodeAccompagnant)) {
            $this->qrCodeAccompagnants->add($qrCodeAccompagnant);
            $qrCodeAccompagnant->setQrCodeUser($this);
        }

        return $this;
    }

    public function removeQrCodeAccompagnant(QrCodeAccompagnant $qrCodeAccompagnant): static
    {
        if ($this->qrCodeAccompagnants->removeElement($qrCodeAccompagnant)) {
            // set the owning side to null (unless already changed)
            if ($qrCodeAccompagnant->getQrCodeUser() === $this) {
                $qrCodeAccompagnant->setQrCodeUser(null);
            }
        }

        return $this;
    }

    public function isIsUsed(): ?bool
    {
        return $this->IsUsed;
    }

    public function setIsUsed(bool $IsUsed): static
    {
        $this->IsUsed = $IsUsed;

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

    public function getNumCommand(): ?string
    {
        return $this->NumCommand;
    }

    public function setNumCommand(string $NumCommand): static
    {
        $this->NumCommand = $NumCommand;

        return $this;
    }
}
