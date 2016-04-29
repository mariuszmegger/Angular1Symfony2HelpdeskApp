<?php

namespace HelpdeskBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Units
 *
 * @ORM\Table(name="units")
 * @ORM\Entity(repositoryClass="HelpdeskBundle\Repository\UnitsRepository")
 */
class Units
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
     * @ORM\Column(name="name", type="string", length=60)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="city", type="string", length=45)
     */
    private $city;

    /**
     * @var string
     *
     * @ORM\Column(name="street", type="string", length=45)
     */
    private $street;

    /**
     * @var string
     *
     * @ORM\Column(name="code", type="string", length=45)
     */
    private $code;

    /**
     * @var string
     *
     * @ORM\Column(name="country", type="string", length=45)
     */
    private $country;

    /**
     * @var int
     *
     * @ORM\Column(name="parent_unit_id", type="integer")
     */
    private $parentUnitId;


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
     * Set name
     *
     * @param string $name
     * @return Units
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set city
     *
     * @param string $city
     * @return Units
     */
    public function setCity($city)
    {
        $this->city = $city;

        return $this;
    }

    /**
     * Get city
     *
     * @return string 
     */
    public function getCity()
    {
        return $this->city;
    }

    /**
     * Set street
     *
     * @param string $street
     * @return Units
     */
    public function setStreet($street)
    {
        $this->street = $street;

        return $this;
    }

    /**
     * Get street
     *
     * @return string 
     */
    public function getStreet()
    {
        return $this->street;
    }

    /**
     * Set code
     *
     * @param string $code
     * @return Units
     */
    public function setCode($code)
    {
        $this->code = $code;

        return $this;
    }

    /**
     * Get code
     *
     * @return string 
     */
    public function getCode()
    {
        return $this->code;
    }

    /**
     * Set country
     *
     * @param string $country
     * @return Units
     */
    public function setCountry($country)
    {
        $this->country = $country;

        return $this;
    }

    /**
     * Get country
     *
     * @return string 
     */
    public function getCountry()
    {
        return $this->country;
    }

    /**
     * Set parentUnitId
     *
     * @param integer $parentUnitId
     * @return Units
     */
    public function setParentUnitId($parentUnitId)
    {
        $this->parentUnitId = $parentUnitId;

        return $this;
    }

    /**
     * Get parentUnitId
     *
     * @return integer 
     */
    public function getParentUnitId()
    {
        return $this->parentUnitId;
    }
}
