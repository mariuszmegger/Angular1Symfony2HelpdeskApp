angular.module('helpdeskModule').controller('OperatorsController', ['$scope', '$http', '$log', '$timeout', '$location','$routeParams', 'ajaxLoader','authentication','DTOptionsBuilder', 'DTColumnBuilder', 'Flash', function ($scope, $http, $log, $timeout, $location, $routeParams, ajaxLoader, authentication, DTOptionsBuilder, DTColumnBuilder, Flash) {
    $scope.candidateTableCheck = false;

    $scope.searchUser = function(name){
      // if(name.length > 2 ){
      $scope.candidateTableCheck = false;
      if(name){
          var data = {
              name: name
          }
          var usersList = ajaxLoader.makeRequest('GET','/app_dev.php/ajaxGetUsersForOperators', data);

          usersList.then(function (response) {
              if(response.data !== false){
                  $scope.usersForOperators = response.data.data;
              }
              else{
                  $scope.usersForOperators = false;
              }
          })
        }
    }

    $scope.prepareForOperator = function(firstname, surname, username, email){

        $scope.getCategoriesForOperators();

        $scope.candidateTable = {};
        $scope.candidateTable.firstname = firstname
        $scope.candidateTable.surname = surname
        $scope.candidateTable.username = username
        $scope.candidateTable.email = email
    }

    $scope.getCategoriesForOperators = function(){

      var categoriesList = ajaxLoader.makeRequest('GET','/app_dev.php/ajaxGetCategoriesForOperators');

      categoriesList.then(function (response) {
          if(response.data !== false){
            $scope.candidateTableCheck = true;
            $scope.categoriesForOperators = response.data.data;
          }
          else{
              $scope.categoriesForOperators = false;
          }
      })
    }

    $scope.saveOperator = function(username, category, sLine){

      var data = {
          username: username,
          category: category,
          sLine: sLine,
      }
      var saveOperator = ajaxLoader.makeRequest('POST','/app_dev.php/ajaxSaveOperator', data);
      saveOperator.then(function (response) {
          if(response.data !== false){
            if(response.data.code == 1){
              // $location.path('/admin-operators');
              var message = 'Operator Added';
              $scope.$parent.successAlert(message, 'success');
            }
            else{
              var message = 'Operator Exists';
              $scope.$parent.successAlert(message, 'danger');
            }
          }
          else{
              $scope.usersForOperators = false;
              var message = 'Server connection problem';
              $scope.$parent.successAlert(message, 'danger');
          }
      })
    }

    $scope.saveValueFromSelect = function(value){
      $scope.operatorSupportLine = parseInt(value);
    }
}])
