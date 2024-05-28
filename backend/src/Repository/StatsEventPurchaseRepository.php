<?php

namespace App\Repository;

use App\Entity\StatsEventPurchase;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<StatsEventPurchase>
 *
 * @method StatsEventPurchase|null find($id, $lockMode = null, $lockVersion = null)
 * @method StatsEventPurchase|null findOneBy(array $criteria, array $orderBy = null)
 * @method StatsEventPurchase[]    findAll()
 * @method StatsEventPurchase[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class StatsEventPurchaseRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, StatsEventPurchase::class);
    }

//    /**
//     * @return StatsEventPurchase[] Returns an array of StatsEventPurchase objects
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

//    public function findOneBySomeField($value): ?StatsEventPurchase
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
