<?php

namespace HelpdeskBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class UsersController extends Controller
{

  /**
   * @Route("/ajaxAddUser", name="ajaxAddUser")
   */
  public function ajaxAddUserAction(Request $request)
  {
    $userManager = $this->get('fos_user.user_manager');
    $users = $this->getDoctrine()->getRepository('HelpdeskBundle:User')->saveUser($request, $userManager);
  }

  /**
   * @Route("/ajaxGetUsers", name="ajaxGetUsers")
   */
  public function ajaxGetUsersAction(Request $request)
{
    $users = $this->getDoctrine()->getRepository('HelpdeskBundle:User')->findUsers($request);
    return $users;
 }

 /**
  * @Route("/ajaxDeleteUser/{id}", name="ajaxDeleteUser")
  */
 public function ajaxDeleteUserAction($id)
{
   $user = $this->getDoctrine()->getRepository('HelpdeskBundle:User')->deleteUser($id);
}

  /**
   * @Route("/ajaxGetOneUser/{id}", name="ajaxGetOneUser")
   */
  public function getOneUserAction(Request $request, $id)
  {
    $user = $this->getDoctrine()->getRepository('HelpdeskBundle:User')->findBy(array('id'=>$id));
    $response = json_encode($user);
    echo $response;
    die;

  }
}
