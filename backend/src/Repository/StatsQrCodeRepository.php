<?php

namespace App\Repository;

use App\Entity\StatsQrCode;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<StatsQrCode>
 *
 * @method StatsQrCode|null find($id, $lockMode = null, $lockVersion = null)
 * @method StatsQrCode|null findOneBy(array $criteria, array $orderBy = null)
 * @method StatsQrCode[]    findAll()
 * @method StatsQrCode[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class StatsQrCodeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, StatsQrCode::class);
    }

//    /**
//     * @return StatsQrCode[] Returns an array of StatsQrCode objects
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

//    public function findOneBySomeField($value): ?StatsQrCode
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
