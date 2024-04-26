<?php

namespace App\Repository;

use App\Entity\QrCodeAccompagnant;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<QrCodeAccompagnant>
 *
 * @method QrCodeAccompagnant|null find($id, $lockMode = null, $lockVersion = null)
 * @method QrCodeAccompagnant|null findOneBy(array $criteria, array $orderBy = null)
 * @method QrCodeAccompagnant[]    findAll()
 * @method QrCodeAccompagnant[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class QrCodeAccompagnantRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, QrCodeAccompagnant::class);
    }

//    /**
//     * @return QrCodeAccompagnant[] Returns an array of QrCodeAccompagnant objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('q')
//            ->andWhere('q.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('q.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?QrCodeAccompagnant
//    {
//        return $this->createQueryBuilder('q')
//            ->andWhere('q.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
