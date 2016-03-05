<?php

namespace HelpdeskBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class MainController extends Controller
{
    /**
     * @Route("/frontend")
     */
    public function indexAction()
    {
        return $this->render('HelpdeskBundle::frontend.html.twig');
    }

    /**
     * @Route("/backend")
     */
    public function backendAction()
    {
        return $this->render('HelpdeskBundle::backend.html.twig');
    }
}
