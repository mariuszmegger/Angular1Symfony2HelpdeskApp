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
    try{
      $content = json_decode($request->getContent(),true);
      $login = $content['login'];
      $firstName = $content['firstName'];
      $surName = $content['surName'];
      $city = (isset($content['city'])) ? $content['city']: '';
      $street = (isset($content['street'])) ? $content['street']: '';
      $postCode = (isset($content['postCode'])) ? $content['postCode']: '';
      $unit = $content['unit'];
      $email = $content['email'];
      $isActive  = (isset($content['isActive']) === true)? 0:1;

      $userManager = $this->get('fos_user.user_manager');
      $user = $userManager->createUser();
      $user->setUsername($login);
      $user->setFirstname($firstName);
      $user->setSurname($surName);
      $user->setEmail($email);
      $user->setPlainPassword('abc');
      $user->setEnabled(1);
      $user->setUnitId($email);
      $user->setLocked($isActive);
      $duplicated = $this->getDoctrine()->getRepository('HelpdeskBundle:User')->findByUsername($login);
      if(!$duplicated){
        $userManager->updateUser($user);

        $response['code'] = ($user->getId())? 1:0;
        $response['message'] = '';
      }else{
        $response['code'] = 0;
        $response['message'] = 'User exists';
      }
    }catch(Exception $e){
    }
    $response = json_encode($response);
    echo $response;
    die;
  }

  /**
   * @Route("/ajaxGetUsers", name="ajaxGetUsers")
   */
  public function ajaxGetUsersAction(Request $request){

    $em = $this->getDoctrine()->getManager();
    $sql = "SELECT id, username, email,  firstname, surname, locked FROM fos_user ";
    $stmt = $em->getConnection()->prepare($sql);
    $stmt->execute();
    $data = $stmt->fetchAll();
    // dump($data);
    // die;
    if($data){
      $responseContainer = new JsonResponse();
      $responseContainer->setEncodingOptions(JSON_NUMERIC_CHECK);
      $responseContainer->setData(array('data'=>$data));
      // $responseContainer->headers->set('Content-Type', 'application/json');
    }
    return $responseContainer;
 }

}
