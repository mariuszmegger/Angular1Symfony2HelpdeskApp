<?php

namespace HelpdeskBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

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
     */
    public function backendAction()
    {
        return $this->render('HelpdeskBundle::backend.html.twig');
    }
}
