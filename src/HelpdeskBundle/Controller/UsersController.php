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
   * Ajax function used for saving user to database
   *
   * @Route("/ajaxAddUser", name="ajaxAddUser")
   */
  public function ajaxAddUserAction(Request $request)
  {
    if($request->isXmlHttpRequest()) {
        $userManager = $this->get('fos_user.user_manager');
        $users = $this->getDoctrine()->getRepository('HelpdeskBundle:User')->saveUser($request, $userManager);
    }
    die;
  }

	/**
	* Ajax function used for getting all users
	*
 	* @Route("/ajaxGetUsers", name="ajaxGetUsers")
 	*/
  public function ajaxGetUsersAction(Request $request)
{
    if($request->isXmlHttpRequest()) {
        $users = $this->getDoctrine()->getRepository('HelpdeskBundle:User')->findUsers($request);
        return $users;
    }
    die;
 }

 /**
 	* Ajax function used for deleting one user
	*
  * @Route("/ajaxDeleteUser", name="ajaxDeleteUser")
  */
 public function ajaxDeleteUserAction(Request $request)
{
    if($request->isXmlHttpRequest()) {
        $content = json_decode($request->getContent(),true);
        $id = $content['id'];
        $user = $this->getDoctrine()->getRepository('HelpdeskBundle:User')->deleteUser($id);
    }
    die;
}

  /**
	* Ajax function used for getting one user
	*
  * @Route("/ajaxGetOneUser/{id}", name="ajaxGetOneUser")
  */
  public function getOneUserAction(Request $request, $id)
  {

      if($request->isXmlHttpRequest()) {
        $user = $this->getDoctrine()->getRepository('HelpdeskBundle:User')->findBy(array('id'=>addslashes(htmlspecialchars($id))));

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
    die;
  }

  /**
	* Ajax function used for updating one user
	*
  * @Route("/ajaxUpdateUser", name="ajaxUpdateUser")
  */
  public function ajaxUpdateUserAction(Request $request)
 {
     if($request->isXmlHttpRequest()) {
         $userManager = $this->get('fos_user.user_manager');
         $user = $this->getDoctrine()->getRepository('HelpdeskBundle:User')->updateUser($request, $userManager);
     }
     die;
 }

 /**
 	* Ajax function used for checking if the written email exists
	*
  * @Route("/checkUserEmail/{email}", name="checkUserEmail")
  */
 public function checkUserEmailAction(Request $request, $email)
 {
       $user = $this->getDoctrine()->getRepository('HelpdeskBundle:User')->findOneByEmail(addslashes(htmlspecialchars($email)));
       if(!$user){
         $userCheck = true;
       }else{
         $userCheck = false;
       }
       $responseContainer = new JsonResponse();
       $responseContainer->setData($userCheck);
       $responseContainer->headers->set('Content-Type', 'application/json');
       return $responseContainer;
 }

}
