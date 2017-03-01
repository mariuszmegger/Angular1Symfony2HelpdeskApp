angular.module('helpdeskModule').controller('UsersController', ['$scope', '$http', '$log', '$timeout', '$location','$routeParams', 'ajaxLoader','authentication','DTOptionsBuilder', 'DTColumnBuilder', 'Flash', '$compile',  function ($scope, $http, $log, $timeout, $location, $routeParams, ajaxLoader, authentication, DTOptionsBuilder, DTColumnBuilder, Flash, $compile) {

//        authentication.auth()

    // Unit name filter

      $scope.saveCompanyName = function(name){
        $scope.companyName = name;
        $scope.propagateTable($scope.userInUnit, $scope.userIsActive);
      }

      // Is Locked filter

      $scope.saveCompanyisActive = function(isActive){
        $scope.companyIsActive = isActive;
        $scope.propagateTable($scope.userInUnit, $scope.userIsActive);
      }

      // Ajax data dipslaying in datatable

      $scope.propagateTable = function(name, active){

      var startData = {
          'userInUnit': name,
          'isActive': active
      }
      $scope.dtOptions = DTOptionsBuilder.newOptions()
      .withOption('ajax', {
        url: '/app_dev.php/ajaxGetUsers',
        type: 'GET',
        data: startData
      })
        .withDataProp('data')
        .withPaginationType('full_numbers')
        .withBootstrap()
        .withOption('createdRow', function(row) {
          // Recompiling so we can bind Angular directive to the DT
          $compile(angular.element(row).contents())($scope);
        });
      $scope.dtColumns = [
         DTColumnBuilder.newColumn('id').withTitle('ID').withOption('width', '5%'),
         DTColumnBuilder.newColumn('username').withTitle('login'),
         DTColumnBuilder.newColumn('email').withTitle('email'),
         DTColumnBuilder.newColumn('firstname').withTitle('first name'),
         DTColumnBuilder.newColumn('surname').withTitle('surname'),
         DTColumnBuilder.newColumn('unit_id').withTitle('unit'),
         DTColumnBuilder.newColumn('locked').withTitle('is locked').renderWith(function(data, type, full) {
           if(data == 1){
             return '<span class="text-danger">YES</span>';
           }
           else{
             return '<span class="text-success">NO</span>'
           }
         }),
         DTColumnBuilder.newColumn('operations').withTitle('Operations').notSortable()
           .renderWith(function(data, type, full) {
              return '<a href="#/admin-edit_user:'+full.id+'"><i class="fa fa-pencil-square" aria-hidden="true"></i></a><a ng-click="deleteUser('+full.id+')"><i class="fa fa-trash" aria-hidden="true"></i></a>';
         })
    ]
    $scope.dtInstance = {};

}
  $scope.propagateTable($scope.userInUnit, $scope.userIsActive);

    // New user adding

    $scope.saveUser = function () {

        var data = {
            'login': $scope.addUserLogin,
            'email': $scope.addUserEmail,
            'firstName': $scope.addUserFirstName,
            'surName': $scope.addUserSureName,
            'city':$scope.addUserCity,
            'street':$scope.addUserStreet,
            'postCode':$scope.addUserPostCode,
            'unit':$scope.addUserUnit,
            'isActive':$scope.addUserIsActive
        }
        console.log($scope.addUserIsActive);
        var serviceResponse = ajaxLoader.makeRequest('POST','/app_dev.php/ajaxAddUser', data);
        serviceResponse.then(function (response) {

          $scope.data = response.data.code;
          (response.data.code == 1)? $scope.dtInstance.rerender():''
          $scope.addCategoryName = '';
          $scope.addCategoryIsActive = '';

               if(response.data.code == 1){
                 $location.path('/admin-users');
                 var message = 'User Added';
                 $scope.$parent.successAlert(message, 'success');
               }
               else{
                 $location.path('/admin-users');
                 var message = 'User login already exists';
                 $scope.$parent.successAlert(message, 'danger');
               }
        },function(response){
          $location.path('/admin-users');
          var message = 'Connection error user not changed';
          $scope.$parent.successAlert(message, 'danger');

          $log.error(response)
        })
    }

    $scope.deleteUser = function(id){
      var data = {
        id: id
      }
      var serviceResponse = ajaxLoader.makeRequest('POST','/app_dev.php/ajaxDeleteUser', data);
      serviceResponse.then(function (response) {
        console.log(response.data.code);
        $scope.data = response.data.code;
        (response.data.code == 1)? $scope.dtInstance.rerender():''
        $scope.addCategoryName = '';
        $scope.addCategoryIsActive = '';
             if(response.data.code == 1){
               $location.path('/admin-users');
               var message = 'User Deleted';
               $scope.$parent.successAlert(message, 'success');
             }
             else{
               $location.path('/admin-users');
               var message = 'User login not exists';
               $scope.$parent.successAlert(message, 'danger');
             }
      },function(response){
        $location.path('/admin-users');
        var message = 'Connection error user not deleted';
        $scope.$parent.successAlert(message, 'danger');

        $log.error(response)
      })
    }
    //Category Editing

    $scope.updateUser = function(){
      var data = {
          'id':$scope.editUser.id,
          'username': $scope.editUser.login,
          'firstname': $scope.editUser.firstname,
          'surname': $scope.editUser.surname,
          'email': $scope.editUser.email,
          'city': $scope.editUser.city,
          'street': $scope.editUser.street,
          'postcode': $scope.editUser.postcode,
          'unit': $scope.editUser.unit,
          'islocked': $scope.editUser.islocked
      }
      var serviceResponse = ajaxLoader.makeRequest('POST','/app_dev.php/ajaxUpdateUser', data);
      serviceResponse.then(function (response) {

        $scope.data = response.data.code;
        $scope.message = (response.data.code == 1) ? 'User Edited' : response.data.message;
        // (response.data.code == 1)? $scope.dtInstance.rerender():''
        $scope.myStyle = {
            visibility: 'visible',
            opacity: '1'
        }
        $scope.addCategoryName = '';
        $scope.addCategoryIsActive = '';
             if(response.data.code == 1){
                  $location.path('/admin-users');
                  var message = 'User Edited';
                  $scope.$parent.successAlert(message, 'success');
             }
             else if(response.data.code == 3){
               var message = 'User email already exists';
               $scope.$parent.successAlert(message, 'danger');
             }
             else{
               var message = 'User not exists';
               $scope.$parent.successAlert(message, 'danger');
             }
      },function(response){
          var message = 'Connection error user not changed';
          $scope.$parent.successAlert(message, 'danger');

          $log.error(response)
      })
    }

    $scope.getOneUser = function(id){
      $scope.editUser = {};
      var id = id.replace(':','');
      var data = {
        'id': id
      }
      var serviceResponse3 = ajaxLoader.makeRequest('GET','/app_dev.php/ajaxGetOneUser/'+id, data);
      serviceResponse3.then(function (response) {
        if(response.data != false){
            $scope.editUser.id = response.data.id;
            $scope.editUser.login = response.data.login;
            $scope.editUser.email = response.data.email;
            $scope.editUser.basicEmail = response.data.email;
            $scope.editUser.firstname = response.data.firstname;
            $scope.editUser.surname = response.data.surname;
            $scope.editUser.city = response.data.city;
            $scope.editUser.street = response.data.street;
            $scope.editUser.postcode = response.data.postcode;
            $scope.editUser.unit = response.data.unit;
            $scope.editUser.islocked = response.data.locked;

            $scope.editUser.loginNoChange = response.data.login;
            $scope.editUser.emailNoChange = response.data.email;
            $scope.editUser.firstnameNoChange = response.data.firstname;
            $scope.editUser.surnameNoChange = response.data.surname;
            $scope.editUser.cityNoChange = response.data.city;
            $scope.editUser.streetNoChange = response.data.street;
            $scope.editUser.postcodeNoChange = response.data.postcode;
            $scope.editUser.unitNoChange = response.data.unit;
            $scope.editUser.islockedNoChange = response.data.locked;

        }
        else{
            $location.path('/admin-users');
            var message = 'User not exists';
            $scope.$parent.successAlert(message, 'danger');
        }
    })
  }
  if($routeParams.user_id){
    $scope.getOneUser($routeParams.user_id)
  }

  $scope.checkIsActive = function(is_active){
    if(is_active === 1){ return true } else{ return false};
  }

}]);
