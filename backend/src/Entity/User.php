<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    private ?string $email = null;

    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[ORM\Column]
    private ?bool $isActive = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column(length: 255)]
    private ?string $token = null;

    #[ORM\Column(length: 255)]
    private ?string $firstname = null;

    #[ORM\Column(length: 255)]
    private ?string $lastname = null;

    #[ORM\Column]
    private ?bool $consent = null;


    #[ORM\Column(length: 255, nullable: true)]
    private ?string $TokenAuth = null;

    #[ORM\Column]
    private ?bool $isDoubleAuth = null;

    /**
     * @ORM\Column(type="string", unique=true, nullable=true)
     */
    private $apiToken;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: QrCode::class)]
    private Collection $qrCodes;

    #[ORM\OneToMany(mappedBy: 'mainUser', targetEntity: Accompagnant::class)]
    private Collection $accompagnants;

    #[ORM\OneToMany(mappedBy: 'User', targetEntity: ResetPassword::class)]
    private Collection $resetPasswords;

    public function __construct()
    {
        $this->qrCodes = new ArrayCollection();
        $this->accompagnants = new ArrayCollection();
        $this->resetPasswords = new ArrayCollection();
    }




    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function isIsActive(): ?bool
    {
        return $this->isActive;
    }

    public function setIsActive(bool $isActive): static
    {
        $this->isActive = $isActive;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getToken(): ?string
    {
        return $this->token;
    }

    public function setToken(string $token): static
    {
        $this->token = $token;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): static
    {
        $this->firstname = $firstname;

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

    public function isConsent(): ?bool
    {
        return $this->consent;
    }

    public function setConsent(bool $consent): static
    {
        $this->consent = $consent;

        return $this;
    }


    public function getTokenAuth(): ?string
    {
        return $this->TokenAuth;
    }

    public function setTokenAuth(?string $TokenAuth): static
    {
        $this->TokenAuth = $TokenAuth;

        return $this;
    }

    public function isIsDoubleAuth(): ?bool
    {
        return $this->isDoubleAuth;
    }

    public function setIsDoubleAuth(bool $isDoubleAuth): static
    {
        $this->isDoubleAuth = $isDoubleAuth;

        return $this;
    }

    /**
     * @return Collection<int, QrCode>
     */
    public function getQrCodes(): Collection
    {
        return $this->qrCodes;
    }

    public function addQrCode(QrCode $qrCode): static
    {
        if (!$this->qrCodes->contains($qrCode)) {
            $this->qrCodes->add($qrCode);
            $qrCode->setUser($this);
        }

        return $this;
    }

    public function removeQrCode(QrCode $qrCode): static
    {
        if ($this->qrCodes->removeElement($qrCode)) {
            // set the owning side to null (unless already changed)
            if ($qrCode->getUser() === $this) {
                $qrCode->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Accompagnant>
     */
    public function getAccompagnants(): Collection
    {
        return $this->accompagnants;
    }

    public function addAccompagnant(Accompagnant $accompagnant): static
    {
        if (!$this->accompagnants->contains($accompagnant)) {
            $this->accompagnants->add($accompagnant);
            $accompagnant->setMainUser($this);
        }

        return $this;
    }

    public function removeAccompagnant(Accompagnant $accompagnant): static
    {
        if ($this->accompagnants->removeElement($accompagnant)) {
            // set the owning side to null (unless already changed)
            if ($accompagnant->getMainUser() === $this) {
                $accompagnant->setMainUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, ResetPassword>
     */
    public function getResetPasswords(): Collection
    {
        return $this->resetPasswords;
    }

    public function addResetPassword(ResetPassword $resetPassword): static
    {
        if (!$this->resetPasswords->contains($resetPassword)) {
            $this->resetPasswords->add($resetPassword);
            $resetPassword->setUser($this);
        }

        return $this;
    }

    public function removeResetPassword(ResetPassword $resetPassword): static
    {
        if ($this->resetPasswords->removeElement($resetPassword)) {
            // set the owning side to null (unless already changed)
            if ($resetPassword->getUser() === $this) {
                $resetPassword->setUser(null);
            }
        }

        return $this;
    }


    
}
