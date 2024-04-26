<?php

namespace App\Repository;

use App\Entity\PriceOffertDuo;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<PriceOffertDuo>
 *
 * @method PriceOffertDuo|null find($id, $lockMode = null, $lockVersion = null)
 * @method PriceOffertDuo|null findOneBy(array $criteria, array $orderBy = null)
 * @method PriceOffertDuo[]    findAll()
 * @method PriceOffertDuo[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PriceOffertDuoRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PriceOffertDuo::class);
    }

//    /**
//     * @return PriceOffertDuo[] Returns an array of PriceOffertDuo objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('p.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?PriceOffertDuo
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
