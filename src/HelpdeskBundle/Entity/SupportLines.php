<?php

namespace HelpdeskBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * SupportLines
 *
 * @ORM\Table(name="support_lines")
 * @ORM\Entity(repositoryClass="HelpdeskBundle\Repository\SupportLinesRepository")
 */
class SupportLines
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
     * @ORM\Column(name="line_name", type="string", length=60)
     */
    private $lineName;

    /**
     * @var string
     *
     * @ORM\Column(name="level", type="string", length=60)
     */
    private $level;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="create_date", type="date")
     */
    private $createDate;


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
     * Set lineName
     *
     * @param string $lineName
     * @return SupportLines
     */
    public function setLineName($lineName)
    {
        $this->lineName = $lineName;

        return $this;
    }

    /**
     * Get lineName
     *
     * @return string 
     */
    public function getLineName()
    {
        return $this->lineName;
    }

    /**
     * Set level
     *
     * @param string $level
     * @return SupportLines
     */
    public function setLevel($level)
    {
        $this->level = $level;

        return $this;
    }

    /**
     * Get level
     *
     * @return string 
     */
    public function getLevel()
    {
        return $this->level;
    }

    /**
     * Set createDate
     *
     * @param \DateTime $createDate
     * @return SupportLines
     */
    public function setCreateDate($createDate)
    {
        $this->createDate = $createDate;

        return $this;
    }

    /**
     * Get createDate
     *
     * @return \DateTime 
     */
    public function getCreateDate()
    {
        return $this->createDate;
    }
}
