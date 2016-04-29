<?php

namespace HelpdeskBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Operators
 *
 * @ORM\Table(name="operators")
 * @ORM\Entity(repositoryClass="HelpdeskBundle\Repository\OperatorsRepository")
 */
class Operators
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var int
     *
     * @ORM\Column(name="user_id", type="integer")
     */
    private $userId;

    /**
     * @var int
     *
     * @ORM\Column(name="support_line_id", type="integer")
     */
    private $supportLineId;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set userId
     *
     * @param integer $userId
     * @return Operators
     */
    public function setUserId($userId)
    {
        $this->userId = $userId;

        return $this;
    }

    /**
     * Get userId
     *
     * @return integer 
     */
    public function getUserId()
    {
        return $this->userId;
    }

    /**
     * Set supportLineId
     *
     * @param integer $supportLineId
     * @return Operators
     */
    public function setSupportLineId($supportLineId)
    {
        $this->supportLineId = $supportLineId;

        return $this;
    }

    /**
     * Get supportLineId
     *
     * @return integer 
     */
    public function getSupportLineId()
    {
        return $this->supportLineId;
    }
}
