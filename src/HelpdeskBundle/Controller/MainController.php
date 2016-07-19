<?php

namespace HelpdeskBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\BrowserKit\Response;
use HelpdeskBundle\Entity\Categories;
use Symfony\Component\HttpFoundation\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

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
     * @Security("has_role('ROLE_ADMIN')")
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
        $createdBy = $content['createdBy'];
        $isActive  = (isset($content['isActive']) === true)? 1:2;
        $dt =  date('Y-m-d H:i:s');
        $category = new Categories();
        $category->setName($name);
        $category->setCreatedBy($createdBy);
        $category->setIsActive($isActive);
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

    /**
     * @Route("/ajaxUpdateCategory", name="ajaxUpdateCategory")
     */
    public function ajaxUpdateCategoryAction(Request $request)
    {
      try{
        $content = json_decode($request->getContent(),true);
        $id = ltrim( $content['id'], ':');
        $name = $content['name'];
        $isActive  = (isset($content['isActive']) === true)? 1:2;
        $category = $this->getDoctrine()->getRepository('HelpdeskBundle:Categories')->findOneById($id);
        $category->setName($name);
        $category->setIsActive($isActive);
        $em = $this->getDoctrine()->getManager();
        $duplicated = $this->getDoctrine()->getRepository('HelpdeskBundle:Categories')->findByName($name);
        if(!$duplicated || ($duplicated[0]->getId() == $id)){
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


    /**
     * @Route("/ajaxGetCategories", name="ajaxGetCategories")
     */
    public function ajaxGetCategories(Request $request)
    {
      $postData = $request->query->all();
      try{
        // $response = $this->getDoctrine()
        //        ->getRepository('HelpdeskBundle:Categories')
        //        ->createQueryBuilder('e')
        //        ->select('e')
        //        ->getQuery()
        //        ->getResult(\Doctrine\ORM\Query::HYDRATE_ARRAY);


        $response = $this->getDoctrine()->getRepository('HelpdeskBundle:Categories')->getCategories($postData);

         if(empty($response)){
           $response = false;
         }
      }catch(Exception $e){
        $response = $e->getMessage();
    }
    $responseContainer = new JsonResponse();
    $responseContainer->setEncodingOptions(JSON_NUMERIC_CHECK);
    $responseContainer->setData($response);

    return $responseContainer;
  }


  /**
   * @Route("/ajaxGetOneCategory", name="ajaxGetOneCategory")
   */
   public function ajaxGetOneCategory(Request $request){
     $content = json_decode($request->getContent(),true);
     $id = $content['id'];
     try{
       $response = $this->getDoctrine()->getRepository('HelpdeskBundle:Categories')->getOneCategory($id);
     }catch(Exception $e){
       $response = $e->getMessage();
     }

    //  var_dump($response) ;
    //  die;
     $responseContainer = new JsonResponse();
     $responseContainer->setEncodingOptions(JSON_NUMERIC_CHECK);
     $responseContainer->setData($response);

     return $responseContainer;
   }

}
