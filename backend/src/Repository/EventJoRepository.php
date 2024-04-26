<?php

namespace App\Repository;

use App\Entity\EventJo;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<EventJo>
 *
 * @method EventJo|null find($id, $lockMode = null, $lockVersion = null)
 * @method EventJo|null findOneBy(array $criteria, array $orderBy = null)
 * @method EventJo[]    findAll()
 * @method EventJo[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EventJoRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, EventJo::class);
    }


    public function findAllWithCategories()
    {
        return $this->createQueryBuilder('e')
                ->leftJoin('e.categoriesEvents', 'c')
                ->addSelect('c')  // Eagerly load categories
                .getQuery()
                ->getResult();
    }

//    /**
//     * @return EventJo[] Returns an array of EventJo objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('e')
//            ->andWhere('e.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('e.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?EventJo
//    {
//        return $this->createQueryBuilder('e')
//            ->andWhere('e.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
