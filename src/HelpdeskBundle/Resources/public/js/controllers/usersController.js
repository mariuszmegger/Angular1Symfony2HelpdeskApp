angular.module('helpdeskModule').controller('UsersController', ['$scope', '$http', '$log', '$timeout', '$location','$routeParams', 'ajaxLoader','authentication','DTOptionsBuilder', 'DTColumnBuilder', 'Flash', '$compile', function ($scope, $http, $log, $timeout, $location, $routeParams, ajaxLoader, authentication, DTOptionsBuilder, DTColumnBuilder, Flash, $compile) {

//        authentication.auth()

    $scope.categories = false;
    $scope.filterBy = {}
    $scope.companyName = '';
    $scope.companyIsActive = '';

    // Company name filter

      $scope.saveCompanyName = function(name){
        $scope.companyName = name;
        $scope.propagateTable($scope.userInUnit, $scope.userIsActive);
      }

      // Is Active filter

      $scope.saveCompanyisActive = function(isActive){
        $scope.companyIsActive = isActive;
        $scope.propagateTable($scope.userInUnit, $scope.userIsActive);
      }

      // Ajax data dipslaying in datatable

      $scope.propagateTable = function(name, active){

      var startData = {
          'userInUnit': name ,
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
             return '<span class="text-success">YES</span>';
           }
           else{
             return '<span class="text-danger">NO</span>'
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

        $timeout(function(){
            $scope.myStyle={
                visibility:'hidden',
                opacity:'0'
            }
        }, 3000)
    }

    $scope.deleteUser = function(id){
      var data = {
          'id': id
      }
      var serviceResponse = ajaxLoader.makeRequest('GET','/app_dev.php/ajaxDeleteUser/'+id, data);
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

    $scope.editUser = function(){


      var data = {
          'name': $scope.singleCategory.name,
          'isActive': $scope.singleCategory.isActive,
          'id':$routeParams.id
      }
      var serviceResponse = ajaxLoader.makeRequest('POST','/app_dev.php/ajaxUpdateCategory', data);
      serviceResponse.then(function (response) {

        $scope.data = response.data.code;
        $scope.message = (response.data.code == 1) ? 'Category Edited' : response.data.message;
        // (response.data.code == 1)? $scope.dtInstance.rerender():''
        $scope.myStyle = {
            visibility: 'visible',
            opacity: '1'
        }
        $scope.addCategoryName = '';
        $scope.addCategoryIsActive = '';
             if(response.data.code == 1){
                  $location.path('/admin-categories');
                  var message = 'Category Edited';
                  $scope.$parent.successAlert(message, 'success');
             }
             else{
               console.log('aaa');
               $location.path('/admin-edit_category:'+397+'');
               var message = 'User login already exists';
               $scope.$parent.successAlert(message, 'danger');
             }
      },function(response){
          var message = 'Connection error user not changed';
          $scope.$parent.successAlert(message, 'danger');
          // $scope.myStyle={
          //     visibility:'visible',
          //     opacity:'1'
          // }

          $log.error(response)
      })

      $timeout(function(){
          $scope.myStyle={
              visibility:'hidden',
              opacity:'0'
          }
      }, 3000)
    }

    $scope.getOneUser = function(id){
      var id = id.replace(':','');
      var data = {
        'id': id
      }
      var serviceResponse3 = ajaxLoader.makeRequest('GET','/app_dev.php/ajaxGetOneUser/'+id, data);
      serviceResponse3.then(function (response) {
        if(response.data != false){
            $scope.singleUser = response.data[0];
        }
        else{
            // $location.path('/admin-categories');
            console.log('brak uzytkownika');
        }
    })
  }
  if($routeParams.user_id){
    console.log($routeParams.user_id);
    $scope.getOneUser($routeParams.user_id)
  }

  $scope.checkIsActive = function(is_active){
    if(is_active === 1){ return true } else{ return false};
  }


    $scope.filterChanged = function(){
      console.log($scope.filterBy)
    }
// mechanical filter
    // $scope.filterByName = function(){
    //   $scope.getCategories()
    //   if($scope.filterBy !=={}){
    //
    //     $scope.filteredCategories = [];
    //     angular.forEach($scope.categories, function(value,key){
    //         if(value.name.indexOf($scope.filterBy.name) !== -1){
    //           $scope.filteredCategories.push(value)
    //         }
    //     })
    //       $scope.categories = $scope.filteredCategories;
    //
    //   }
    // }




    // $scope.changeOrder = function(columnName){
    //     if($scope.orderByColumn == columnName){
    //         $scope.orderByDir = !$scope.orderByDir;
    //       }else{
    //         $scope.orderByColumn = columnName
    //         $scope.orderByDir = false;
    //       }
    // }

    // $scope.isOrderedBy = function(columnName){
    //    return ($scope.orderByColumn == columnName);
    // }
    //
    // $scope.isOrderedReverse = function(){
    //   return !$scope.orderByDir;
    // }

    // $scope.getCategories();

}])
