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
        return $this->render('HelpdeskBundle::frontend.html.twig');
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
      try{
        $content = json_decode($request->getContent(),true);
        $name = $content['name'];
        $isActive  = (isset($content['isActive']) === true)? 1:0;
        $dt = new \DateTime('now');
        $category = new Categories();
        $category->setName($name);
        $category->setIsActive($isActive);
        $category->setCreatedBy(1);
        $category->setCreatedDate($dt);
        $em = $this->getDoctrine()->getManager();
        $duplicated = $this->getDoctrine()->getRepository('HelpdeskBundle:Categories')->findByName($name);
        if(!$duplicated){
          $em->persist($category);
          $em->flush();

          $response['code'] = ($category->getId())? 1:0;
          $response['message'] = '';
        }else{
          $response['code'] = 0;
          $response['message'] = 'Category exists';
        }
      }catch(Exception $e){
      }
      $response = json_encode($response);
      echo $response;
      die;
    }
}
