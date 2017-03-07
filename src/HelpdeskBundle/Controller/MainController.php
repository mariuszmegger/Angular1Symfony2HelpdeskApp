<?php

namespace HelpdeskBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
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
}
