<?php

namespace App\Repository;

use App\Entity\StatsUser;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<StatsUser>
 *
 * @method StatsUser|null find($id, $lockMode = null, $lockVersion = null)
 * @method StatsUser|null findOneBy(array $criteria, array $orderBy = null)
 * @method StatsUser[]    findAll()
 * @method StatsUser[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class StatsUserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, StatsUser::class);
    }

//    /**
//     * @return StatsUser[] Returns an array of StatsUser objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('s.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?StatsUser
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
