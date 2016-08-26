<?php

namespace HelpdeskBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use ContactsBundle\Entity\Contact;
use Doctrine\ORM\Query\ResultSetMapping;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

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
 public function ajaxDeleteUserAction(Request $request, $id)
{
   $user = $this->getDoctrine()->getRepository('HelpdeskBundle:User')->findOneById($id);
   $em = $this->getDoctrine()->getManager();
   $em->remove($user);
   die;
}

}
