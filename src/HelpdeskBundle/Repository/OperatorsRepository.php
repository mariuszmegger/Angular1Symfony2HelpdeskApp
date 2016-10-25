<?php

namespace HelpdeskBundle\Repository;

use Doctrine\ORM\EntityRepository;

/**
* OperatorsRepository
*
* This class was generated by the Doctrine ORM. Add your own custom
* repository methods below.
*/
class OperatorsRepository extends EntityRepository
{
  public function getUsersByName($name){
    $result = $this->getEntityManager()->getRepository("HelpdeskBundle:User")->createQueryBuilder('u')
    ->andWhere('u.username LIKE :name')
    ->orWhere('u.firstname LIKE :name')
    ->orWhere('u.surname LIKE :name')
    ->setParameter('name', '%'.$name. '%')
    ->orderBy('u.firstname', 'ASC')
    ->setMaxResults('5')
    ->getQuery()
    ->getResult(\Doctrine\ORM\AbstractQuery::HYDRATE_ARRAY);

    return $result;
  }

  public function getCategoriesForOperators(){
    $result = $this->getEntityManager()->getRepository("HelpdeskBundle:Categories")->createQueryBuilder('u')
    ->getQuery()
    ->getResult(\Doctrine\ORM\AbstractQuery::HYDRATE_ARRAY);

    return $result;
  }

  public function getOperatorsQuery(){
    $conn = $this->getEntityManager()->getConnection();
    $sql = 'SELECT fos_user.firstname, fos_user.surname, fos_user.username, categories.name, support_lines.line_name FROM operators
     INNER JOIN fos_user
     ON fos_user.username_canonical = operators.user_username
     INNER JOIN categories
     ON categories.id = operators.category_id
     INNER JOIN support_lines
     ON support_lines.id = operators.support_line_id
     ';
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll();
    return $result;
  }
}
