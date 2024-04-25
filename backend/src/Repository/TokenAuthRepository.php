<?php

namespace App\Repository;

use App\Entity\TokenAuth;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<TokenAuth>
 *
 * @method TokenAuth|null find($id, $lockMode = null, $lockVersion = null)
 * @method TokenAuth|null findOneBy(array $criteria, array $orderBy = null)
 * @method TokenAuth[]    findAll()
 * @method TokenAuth[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TokenAuthRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TokenAuth::class);
    }

//    /**
//     * @return TokenAuth[] Returns an array of TokenAuth objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('t')
//            ->andWhere('t.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('t.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?TokenAuth
//    {
//        return $this->createQueryBuilder('t')
//            ->andWhere('t.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
