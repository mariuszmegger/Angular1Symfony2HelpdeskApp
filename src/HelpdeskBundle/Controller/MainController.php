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

class MainController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction()
    {
      $twig = new Twig_Environment();

      $lexer = new Twig_Lexer($twig, array(
          'tag_comment'   => array('{#', '#}'),
          'tag_block'     => array('{%', '%}'),
          'tag_variable'  => array('{/', '/}'),
          'interpolation' => array('#{', '}'),
      ));
      $twig->setLexer($lexer);
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
