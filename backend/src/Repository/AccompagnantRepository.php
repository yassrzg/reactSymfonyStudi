<?php

namespace App\Repository;

use App\Entity\Accompagnant;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Accompagnant>
 *
 * @method Accompagnant|null find($id, $lockMode = null, $lockVersion = null)
 * @method Accompagnant|null findOneBy(array $criteria, array $orderBy = null)
 * @method Accompagnant[]    findAll()
 * @method Accompagnant[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AccompagnantRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Accompagnant::class);
    }

    public function findOneByNameAndLastname(string $name, string $lastname): ?Accompagnant
    {
        return $this->createQueryBuilder('a')
            ->where('a.name = :name')
            ->andWhere('a.lastname = :lastname')
            ->setParameter('name', $name)
            ->setParameter('lastname', $lastname)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function findOneByNameLastnameAndUserId(string $name, string $lastname, int $userId): ?Accompagnant
    {
        return $this->createQueryBuilder('a')
            ->innerJoin('a.mainUser', 'u')
            ->where('a.name = :name')
            ->andWhere('a.lastname = :lastname')
            ->andWhere('u.id = :userId')
            ->setParameter('name', $name)
            ->setParameter('lastname', $lastname)
            ->setParameter('userId', $userId)
            ->getQuery()
            ->getOneOrNullResult();
    }


//    /**
//     * @return Accompagnant[] Returns an array of Accompagnant objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('a.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Accompagnant
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
