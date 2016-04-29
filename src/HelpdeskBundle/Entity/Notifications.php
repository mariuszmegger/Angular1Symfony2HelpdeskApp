<?php

namespace HelpdeskBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Notifications
 *
 * @ORM\Table(name="notifications")
 * @ORM\Entity(repositoryClass="HelpdeskBundle\Repository\NotificationsRepository")
 */
class Notifications
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
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255)
     */
    private $title;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="string", length=500)
     */
    private $description;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="entry_date", type="date")
     */
    private $entryDate;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="close_date", type="date")
     */
    private $closeDate;

    /**
     * @var string
     *
     * @ORM\Column(name="change_date", type="string", length=255)
     */
    private $changeDate;

    /**
     * @var string
     *
     * @ORM\Column(name="sending_person", type="string", length=255)
     */
    private $sendingPerson;

    /**
     * @var string
     *
     * @ORM\Column(name="subject_person", type="string", length=255)
     */
    private $subjectPerson;

    /**
     * @var array
     *
     * @ORM\Column(name="atachments_id", type="array")
     */
    private $atachmentsId;

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
     * @var string
     *
     * @ORM\Column(name="type", type="string", length=255)
     */
    private $type;


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
     * Set title
     *
     * @param string $title
     * @return Notifications
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string 
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return Notifications
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string 
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set entryDate
     *
     * @param \DateTime $entryDate
     * @return Notifications
     */
    public function setEntryDate($entryDate)
    {
        $this->entryDate = $entryDate;

        return $this;
    }

    /**
     * Get entryDate
     *
     * @return \DateTime 
     */
    public function getEntryDate()
    {
        return $this->entryDate;
    }

    /**
     * Set closeDate
     *
     * @param \DateTime $closeDate
     * @return Notifications
     */
    public function setCloseDate($closeDate)
    {
        $this->closeDate = $closeDate;

        return $this;
    }

    /**
     * Get closeDate
     *
     * @return \DateTime 
     */
    public function getCloseDate()
    {
        return $this->closeDate;
    }

    /**
     * Set changeDate
     *
     * @param string $changeDate
     * @return Notifications
     */
    public function setChangeDate($changeDate)
    {
        $this->changeDate = $changeDate;

        return $this;
    }

    /**
     * Get changeDate
     *
     * @return string 
     */
    public function getChangeDate()
    {
        return $this->changeDate;
    }

    /**
     * Set sendingPerson
     *
     * @param string $sendingPerson
     * @return Notifications
     */
    public function setSendingPerson($sendingPerson)
    {
        $this->sendingPerson = $sendingPerson;

        return $this;
    }

    /**
     * Get sendingPerson
     *
     * @return string 
     */
    public function getSendingPerson()
    {
        return $this->sendingPerson;
    }

    /**
     * Set subjectPerson
     *
     * @param string $subjectPerson
     * @return Notifications
     */
    public function setSubjectPerson($subjectPerson)
    {
        $this->subjectPerson = $subjectPerson;

        return $this;
    }

    /**
     * Get subjectPerson
     *
     * @return string 
     */
    public function getSubjectPerson()
    {
        return $this->subjectPerson;
    }

    /**
     * Set atachmentsId
     *
     * @param array $atachmentsId
     * @return Notifications
     */
    public function setAtachmentsId($atachmentsId)
    {
        $this->atachmentsId = $atachmentsId;

        return $this;
    }

    /**
     * Get atachmentsId
     *
     * @return array 
     */
    public function getAtachmentsId()
    {
        return $this->atachmentsId;
    }

    /**
     * Set categoryId
     *
     * @param integer $categoryId
     * @return Notifications
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
     * @return Notifications
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

    /**
     * Set type
     *
     * @param string $type
     * @return Notifications
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return string 
     */
    public function getType()
    {
        return $this->type;
    }
}
