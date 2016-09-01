<?php

namespace HelpdeskBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
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

    // dump($user);die;
    $data = array(
      'id'=>$user[0]->getId(),
      'login'=>$user[0]->getUsername(),
      'email'=>$user[0]->getEmail(),
      'firstname'=>$user[0]->getFirstname(),
      'surname'=>$user[0]->getSurname(),
      'city'=>$user[0]->getCity(),
      'street'=>$user[0]->getStreet(),
      'postcode'=>$user[0]->getPostcode(),
      'unit'=>$user[0]->getUnitid(),
      'locked'=>$user[0]->isLocked()
    );
    $responseContainer = new JsonResponse();
    $responseContainer->setEncodingOptions(JSON_NUMERIC_CHECK);
    $responseContainer->setData($data);
    $responseContainer->headers->set('Content-Type', 'application/json');
    return $responseContainer;
  }

  /**
   * @Route("/ajaxUpdateUser", name="ajaxDeleteUser")
   */
  public function ajaxUpdateUserAction(Request $request)
 {
   $userManager = $this->get('fos_user.user_manager');
   $user = $this->getDoctrine()->getRepository('HelpdeskBundle:User')->updateUser($request, $userManager);
 }

 /**
  * @Route("/checkUserEmail/{email}", name="checkUserEmail")
  */
 public function checkUserEmailAction(Request $request, $email)
 {
   $user = $this->getDoctrine()->getRepository('HelpdeskBundle:User')->findOneByEmail($email);
   $userCheck = ($user)? false : true;
   $userCheck = json_encode($userCheck);
   echo $userCheck;
   die;
 }

}
