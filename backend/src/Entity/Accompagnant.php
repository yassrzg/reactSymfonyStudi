<?php

namespace App\Entity;

use App\Repository\AccompagnantRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AccompagnantRepository::class)]
class Accompagnant
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['qrcodeUser'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['qrcodeUser'])]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Groups(['qrcodeUser'])]
    private ?string $lastname = null;

    #[ORM\OneToMany(mappedBy: 'accompagnantUser', targetEntity: QrCodeAccompagnant::class)]
    private Collection $qrCodeAccompagnants;

    public function __construct()
    {
        $this->qrCodeAccompagnants = new ArrayCollection();
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

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): static
    {
        $this->lastname = $lastname;

        return $this;
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
            $qrCodeAccompagnant->setAccompagnantUser($this);
        }

        return $this;
    }

    public function removeQrCodeAccompagnant(QrCodeAccompagnant $qrCodeAccompagnant): static
    {
        if ($this->qrCodeAccompagnants->removeElement($qrCodeAccompagnant)) {
            // set the owning side to null (unless already changed)
            if ($qrCodeAccompagnant->getAccompagnantUser() === $this) {
                $qrCodeAccompagnant->setAccompagnantUser(null);
            }
        }

        return $this;
    }
}
