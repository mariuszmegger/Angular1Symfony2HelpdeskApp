<?php

namespace HelpdeskBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\JsonResponse;

class MainController extends Controller
{
	/**
	* @Route("/", name="homepage")
	* @Security("has_role('ROLE_ADMIN')")
	*/
	public function indexAction()
	{
		return $this->render('HelpdeskBundle::backend.html.twig');
	}

	/**
	* @Route("/getAjaxUserData", name="getAjaxUserData")
	*/
	public function getAjaxUserDataAction(Request $request){

		if($request->isXmlHttpRequest()) {

			$response = $this->getUser();
			$user = array();
			$user['login'] = $response->getUsername();
			foreach($response->getRoles() as $role){
				$user['roles'][] = $role;
			}
			$responseContainer = new JsonResponse();
			$responseContainer->setEncodingOptions(JSON_NUMERIC_CHECK);
			$responseContainer->setData(array('user'=>$user));
			$responseContainer->headers->set('Content-Type', 'application/json');

			return $responseContainer;
		}
		die;
	}
}
