<?php

namespace HelpdeskBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use HelpdeskBundle\Entity\Operators;
use Symfony\Component\HttpFoundation\JsonResponse;
use Twig_Environment;

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
            $response['message'] =  $e->getMessage();
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
            $response['message'] =  $e->getMessage();
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
            $username = (isset($content['username']))? $content['username'] : '';
            $category = (isset($content['category']))? $content['category'] : '';
            $sline = (isset($content['sLine']))? $content['sLine'] : '';
            if($username && $category && $sline){
                $duplicated = $this->getDoctrine()->getRepository('HelpdeskBundle:Operators')->findBy(array('userUsername'=>$username, 'categoryId'=>$category, 'supportLineId'=>$sline));
                if(!$duplicated){
                    $operator = new Operators();
                    $operator->setUserUsername($username);
                    $operator->setCategoryId($category);
                    $operator->setSupportLineId($sline);
                    $em = $this->getDoctrine()->getManager();
                    $em->persist($operator);
                    $em->flush();

                    $response['code'] = 1;
                }else{
                    $response['code'] = 0;
                }
            }
        }catch(Exception $e){
            $response['message'] =  $e->getMessage();
        }

        $responseContainer = new JsonResponse();
        $responseContainer->setEncodingOptions(JSON_NUMERIC_CHECK);
        $responseContainer->setData(array('data'=>$response));
        $responseContainer->headers->set('Content-Type', 'application/json');
        return $responseContainer;
    }
}
