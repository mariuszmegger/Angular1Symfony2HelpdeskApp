<?php

namespace HelpdeskBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\BrowserKit\Response;
use HelpdeskBundle\Entity\Categories;
use Symfony\Component\HttpFoundation\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Twig_Environment;
use Twig_Lexer;

class OperatorsController extends Controller
{

    /**
     * @Route("/ajaxGetUsersForOperators", name="ajaxGetusersForOperators")
     */
    public function ajaxAction(Request $request)
    {
        try{
            $content = json_decode($request->getContent(),true);
            $name = $content['name'];
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


}
