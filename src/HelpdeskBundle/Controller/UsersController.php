<?php

namespace HelpdeskBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\BrowserKit\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use FOS\UserBundle\Doctrine\UserManager;

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
      $isActive  = (isset($content['isActive']) === true)? 0:1;

      $userManager = $this->get('fos_user.user_manager');
      $user = $userManager->createUser();
      $user->setUsername($login);
      $user->setEmail('test@test3.pl');
      $user->setPlainPassword('abc');
      $user->setEnabled(1);
      $user->setLocked($isActive);
      $duplicated = $this->getDoctrine()->getRepository('HelpdeskBundle:User')->findByUsername($login);
      if(!$duplicated){
        $userManager->updateUser($user);

        $response['code'] = ($user->getId())? 1:0;
        $response['message'] = '';
      }else{
        $response['code'] = 0;
        $response['message'] = 'Category exists';
      }
    }catch(Exception $e){
    }
    $response = json_encode($response);
    echo $response;
    die;
  }
}
