<?php

namespace HelpdeskBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\BrowserKit\Response;
use HelpdeskBundle\Entity\Categories;

class MainController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction()
    {
        return $this->render('HelpdeskBundle::backend.html.twig');
    }

    /**
     * @Route("/admin", name="admin")
     */
    public function backendAction()
    {
        return $this->render('HelpdeskBundle::backend.html.twig');
    }
    
    
    /**
     * @Route("/ajaxCategories", name="ajaxCategories")
     */
    public function ajaxAction(Request $request)
    {
        $content = json_decode($request->getContent(),true);
        $name = $content['name'];
        $isActive  = (isset($content['isActive']) === true)? 1:0; 
        $name  = $content['name'];
        $dt = new \DateTime('now');
//        $dt = date('Y-m-d H:i:s');
//        $dt = $dt->format('Y-m-d H:i:s');
        $category = new Categories();
        $category->setName($name);
        $category->setIsActive($isActive);
        $category->setCreatedBy(1);
        $category->setCreatedDate($dt);
        $em = $this->getDoctrine()->getManager();
        $em->persist($category);
        $em->flush();
        var_dump($em);
        die;
    }
}
