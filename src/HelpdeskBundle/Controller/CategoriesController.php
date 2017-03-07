<?php

namespace HelpdeskBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\BrowserKit\Response;
use HelpdeskBundle\Entity\Categories;
use Symfony\Component\HttpFoundation\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

class CategoriesController extends Controller
{

	/**
	* Create category ajax action
	*
	* @Route("/ajaxCategories", name="ajaxCategories")
	*/
	public function ajaxAction(Request $request)
	{

		if($request->isXmlHttpRequest()) {
			try{
				$content = json_decode($request->getContent(),true);

				$name = addslashes(htmlspecialchars($content['name']));
				$createdBy = addslashes(htmlspecialchars($content['createdBy']));
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

		}
		die;
	}

	/**
	* Update category ajax action
	*
	* @Route("/ajaxUpdateCategory", name="ajaxUpdateCategory")
	*/
	public function ajaxUpdateCategoryAction(Request $request)
	{
		if($request->isXmlHttpRequest()) {
			try{
				$content = json_decode($request->getContent(),true);
				$id = addslashes(htmlspecialchars(ltrim( $content['id'], ':')));
				$name = addslashes(htmlspecialchars($content['name']));
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
		}
		die;
	}


	/**
	* Get all categories ajax action
	*
	* @Route("/ajaxGetCategories", name="ajaxGetCategories")
	*/
	public function ajaxGetCategories(Request $request)
	{

		if($request->isXmlHttpRequest()) {
			$postData = $request->query->all();
			try{
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
		die;

	}


	/**
	*Get one category for update ajax action
	*
	* @Route("/ajaxGetOneCategory", name="ajaxGetOneCategory")
	*/
	public function ajaxGetOneCategory(Request $request){

		if($request->isXmlHttpRequest()) {
			$content = json_decode($request->getContent(),true);
			$id = addslashes(htmlspecialchars($content['id']));
			try{
				$response = $this->getDoctrine()->getRepository('HelpdeskBundle:Categories')->getOneCategory($id);
			}catch(Exception $e){
				$response = $e->getMessage();
			}
			$responseContainer = new JsonResponse();
			$responseContainer->setEncodingOptions(JSON_NUMERIC_CHECK);
			$responseContainer->setData($response);

			return $responseContainer;
		}
		die;
	}

}
