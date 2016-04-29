<?php

namespace HelpdeskBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * NotificationsHistory
 *
 * @ORM\Table(name="notifications_history")
 * @ORM\Entity(repositoryClass="HelpdeskBundle\Repository\NotificationsHistoryRepository")
 */
class NotificationsHistory
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
     * @ORM\Column(name="notification_id", type="integer")
     */
    private $notificationId;

    /**
     * @var int
     *
     * @ORM\Column(name="operator_id", type="integer")
     */
    private $operatorId;

    /**
     * @var string
     *
     * @ORM\Column(name="note", type="text")
     */
    private $note;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="change_date", type="date")
     */
    private $changeDate;

    /**
     * @var int
     *
     * @ORM\Column(name="support_line_id", type="integer")
     */
    private $supportLineId;

    /**
     * @var int
     *
     * @ORM\Column(name="category_id", type="integer")
     */
    private $categoryId;

    /**
     * @var int
     *
     * @ORM\Column(name="personal_category_id", type="integer")
     */
    private $personalCategoryId;


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
     * Set notificationId
     *
     * @param integer $notificationId
     * @return NotificationsHistory
     */
    public function setNotificationId($notificationId)
    {
        $this->notificationId = $notificationId;

        return $this;
    }

    /**
     * Get notificationId
     *
     * @return integer 
     */
    public function getNotificationId()
    {
        return $this->notificationId;
    }

    /**
     * Set operatorId
     *
     * @param integer $operatorId
     * @return NotificationsHistory
     */
    public function setOperatorId($operatorId)
    {
        $this->operatorId = $operatorId;

        return $this;
    }

    /**
     * Get operatorId
     *
     * @return integer 
     */
    public function getOperatorId()
    {
        return $this->operatorId;
    }

    /**
     * Set note
     *
     * @param string $note
     * @return NotificationsHistory
     */
    public function setNote($note)
    {
        $this->note = $note;

        return $this;
    }

    /**
     * Get note
     *
     * @return string 
     */
    public function getNote()
    {
        return $this->note;
    }

    /**
     * Set changeDate
     *
     * @param \DateTime $changeDate
     * @return NotificationsHistory
     */
    public function setChangeDate($changeDate)
    {
        $this->changeDate = $changeDate;

        return $this;
    }

    /**
     * Get changeDate
     *
     * @return \DateTime 
     */
    public function getChangeDate()
    {
        return $this->changeDate;
    }

    /**
     * Set supportLineId
     *
     * @param integer $supportLineId
     * @return NotificationsHistory
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

    /**
     * Set categoryId
     *
     * @param integer $categoryId
     * @return NotificationsHistory
     */
    public function setCategoryId($categoryId)
    {
        $this->categoryId = $categoryId;

        return $this;
    }

    /**
     * Get categoryId
     *
     * @return integer 
     */
    public function getCategoryId()
    {
        return $this->categoryId;
    }

    /**
     * Set personalCategoryId
     *
     * @param integer $personalCategoryId
     * @return NotificationsHistory
     */
    public function setPersonalCategoryId($personalCategoryId)
    {
        $this->personalCategoryId = $personalCategoryId;

        return $this;
    }

    /**
     * Get personalCategoryId
     *
     * @return integer 
     */
    public function getPersonalCategoryId()
    {
        return $this->personalCategoryId;
    }
}
