<?php

namespace HelpdeskCommonBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class LayoutController extends Controller
{
    /**
     * @Route("/")
     */
    public function indexAction()
    {
        return $this->render('HelpdeskCommonBundle:Layout:index.html.twig');
    }
}
