<?php

namespace HelpdeskBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\BrowserKit\Response;
use HelpdeskBundle\Entity\Categories;
use HelpdeskBundle\Entity\Operators;
use Symfony\Component\HttpFoundation\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Twig_Environment;
use Twig_Lexer;

class OperatorsController extends Controller
{

    /**
     * @Route("/ajaxGetUsersForOperators", name="ajaxGetusersForOperators")
     */
    public function ajaxGetusersForOperators(Request $request)
    {
        try{
            $name = $request->query->get('name');
            $response = array();
            $response = $this->getDoctrine()->getRepository('HelpdeskBundle:Operators')->getUsersByName($name);
        }catch(Exception $e){
        }
        $responseContainer = new JsonResponse();
        $responseContainer->setEncodingOptions(JSON_NUMERIC_CHECK);
        $responseContainer->setData(array('data'=>$response));
        $responseContainer->headers->set('Content-Type', 'application/json');
        return $responseContainer;
    }

    /**
     * @Route("/ajaxGetCategoriesForOperators", name="ajaxGetCategoriesForOperators")
     */
    public function ajaxGetCategoriesForOperators()
    {
      try{
          $response = $this->getDoctrine()->getRepository('HelpdeskBundle:Operators')->getCategoriesForOperators();
      }catch(Exception $e){
      }
      $responseContainer = new JsonResponse();
      $responseContainer->setEncodingOptions(JSON_NUMERIC_CHECK);
      $responseContainer->setData(array('data'=>$response));
      $responseContainer->headers->set('Content-Type', 'application/json');
      return $responseContainer;
    }

    /**
     * @Route("/ajaxSaveOperator", name="ajaxSaveOperator")
     */
    public function ajaxSaveOperator(Request $request)
    {
      try{
        $content = json_decode($request->getContent(),true);
        $username = $content['username'];
        $category = $content['category'];
        // dump($content); die;
        $sline = $content['sLine'];
        $operator = new Operators();

        $operator->setUserUsername($username);
        $operator->setCategoryId($category);
        $operator->setSupportLineId($sline);
        $em = $this->getDoctrine()->getManager();
        $duplicated = $this->getDoctrine()->getRepository('HelpdeskBundle:Operators')->findBy(array('userUsername'=>$username, 'categoryId'=>$category, 'supportLineId'=>$sline));
        dump($duplicated);
        die;
        if(!$duplicated){
          $em->persist($operator);
          $em->flush();

          $response['code'] = ($operator->getId())? 1:0;
          $response['message'] = '';
        }else{
          $response['code'] = 0;
          $response['message'] = 'Operator exists';
        }
      }catch(Exception $e){
      }
      $response = json_encode($response);
      echo $response;
      die;
    }


}
