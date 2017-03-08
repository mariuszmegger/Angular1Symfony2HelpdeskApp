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
	* Get users for filter in operators list
	*
	* @Route("/ajaxGetUsersForOperators", name="ajaxGetusersForOperators")
	*/
	public function ajaxGetusersForOperators(Request $request)
	{
		if($request->isXmlHttpRequest()) {
			try{
				$name = addslashes(htmlspecialchars($request->query->get('name')));
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
		die;
	}

	/**
	* Get categories for filter in operators list
	*
	* @Route("/ajaxGetCategoriesForOperators", name="ajaxGetCategoriesForOperators")
	*/
	public function ajaxGetCategoriesForOperators(Request $request)
	{
		if($request->isXmlHttpRequest()) {
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
		die;
	}

	/**
	* Save new operator
	*
	* @Route("/ajaxSaveOperator", name="ajaxSaveOperator")
	*/
	public function ajaxSaveOperator(Request $request)
	{
		if($request->isXmlHttpRequest()) {
			try{
				$content = json_decode($request->getContent(),true);
				$username = addslashes(htmlspecialchars((isset($content['username']))? $content['username'] : ''));
				$category = addslashes(htmlspecialchars((isset($content['category']))? $content['category'] : ''));
				$sline = addslashes(htmlspecialchars((isset($content['sLine']))? $content['sLine'] : ''));
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
		die;
	}

	/**
	* Get all operators
	*
	* @Route("/ajaxGetOperators", name="ajaxGetOperators")
	*/
	public function ajaxGetOperators(Request $request)
	{
		if($request->isXmlHttpRequest()) {
			try{
				$response = $this->getDoctrine()->getRepository('HelpdeskBundle:Operators')->getOperatorsQuery();
			}catch(Exception $e){
				$response['message'] =  $e->getMessage();
			}
			$responseContainer = new JsonResponse();
			$responseContainer->setEncodingOptions(JSON_NUMERIC_CHECK);
			$responseContainer->setData(array('data'=>$response));
			$responseContainer->headers->set('Content-Type', 'application/json');
			return $responseContainer;

		}
		die;

	}

	/**
	* Delete single operator
	*
	* @Route("/ajaxDeleteOperator", name="ajaxDeleteOperator")
	*/
	public function ajaxDeleteOperator(Request $request)
	{
		if($request->isXmlHttpRequest()) {
			$content = json_decode($request->getContent(),true);
			$userUsername = $content['operatorUsername'];
			$categoryId = $content['categoryId'];
			$supportLineId = $content['supportLineId'];
			try{
				if($userUsername && $categoryId && $supportLineId){
					$operator = $this->getDoctrine()->getRepository('HelpdeskBundle:Operators')->findOneBy(array(
						'userUsername'=>$userUsername,
						'categoryId'=>$categoryId,
						'supportLineId'=>$supportLineId
					));
					$em = $this->getDoctrine()->getEntityManager();
					$em->remove($operator);
					$em->flush();
					$response['code'] = 1;
				}
			}catch(Exception $e){
				$response['message'] =  $e->getMessage();
				$response['code'] = 0;
			}
			$responseContainer = new JsonResponse();
			$responseContainer->setEncodingOptions(JSON_NUMERIC_CHECK);
			$responseContainer->setData(array('data'=>$response));
			$responseContainer->headers->set('Content-Type', 'application/json');
			return $responseContainer;

		}
		die;
	}

}
