angular.module('helpdeskModule').controller('OperatorsController', ['$scope', '$http', '$log', '$timeout', '$location','$routeParams', 'ajaxLoader','authentication','DTOptionsBuilder', 'DTColumnBuilder', 'Flash', '$filter', '$uibModal', 'confirmModal', function ($scope, $http, $log, $timeout, $location, $routeParams, ajaxLoader, authentication, DTOptionsBuilder, DTColumnBuilder, Flash, $filter, $uibModal, confirmModal) {
    $scope.candidateTableCheck = false;
    $scope.filterBy = {};
    $scope.listLength = 10;
    $scope.operatorsList = [];
    $scope.filteredOperatorList = [];
    $scope.finalFilteredOperatorList = [];
    $scope.currentPage = 1;
    $scope.paginationLengthArray = [];
    $scope.totalRecords = undefined;


    $scope.pageChanged = function (pageNo) {
      $scope.currentPage = pageNo;
    };

    $scope.$watch('filterBy.name + filterBy.line_name + listLength + searchTerm + currentPage', function() {
        $scope.filterData();
    });

    $scope.filterData = function(){

        var operatorsList = $scope.operatorsList,
            searchTerm = $scope.searchTerm,
            filteredOperatorList = [],
            filterByName = $scope.filterBy.name,
            filterByLineName = $scope.filterBy.line_name

        $scope.finalFilteredOperatorList = [];

        if($scope.searchTerm){
            for(var i = 0, y = operatorsList.length; i < y ; i++){
                if(
                    operatorsList[i].name.indexOf(searchTerm) !== -1 ||
                    operatorsList[i].firstname.indexOf(searchTerm) !== -1 ||
                    operatorsList[i].surname.indexOf(searchTerm) !== -1 ||
                    operatorsList[i].username.indexOf(searchTerm) !== -1 ||
                    operatorsList[i].line_name.indexOf(searchTerm) !== -1

                ){
                    filteredOperatorList.push(operatorsList[i]);
                }
            }
        }else{
            filteredOperatorList = operatorsList
        }

        for(var i=0, y = filteredOperatorList.length; i< y ; i++){

            if(filterByName && filterByLineName){
                if(filteredOperatorList[i].support_line_id == filterByLineName && filteredOperatorList[i].name == filterByName){
                    $scope.finalFilteredOperatorList.push(filteredOperatorList[i]);
                }
            }
            else if(filterByName){
                if(filteredOperatorList[i].name == filterByName){
                    $scope.finalFilteredOperatorList.push(filteredOperatorList[i]);
                }
            }
            else if(filterByLineName){
                if(filteredOperatorList[i].support_line_id == filterByLineName){
                    $scope.finalFilteredOperatorList.push(filteredOperatorList[i]);
                }
            }
            else{
                $scope.finalFilteredOperatorList.push(filteredOperatorList[i]);
            }
        }
        $scope.totalRecords = $scope.finalFilteredOperatorList.length;
        $scope.countRecords($scope.totalRecords,$scope.currentPage, $scope.listLength);

    }

    $scope.searchUser = function(name){
      if(name.length > 3 ){
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
    }

    $scope.prepareForOperator = function(firstname, surname, username, email){

        $scope.getCategoriesForOperators();

        $scope.candidateTable = {};
        $scope.candidateTable.firstname = firstname;
        $scope.candidateTable.surname = surname;
        $scope.candidateTable.username = username;
        $scope.candidateTable.email = email;

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

    $scope.getCategoriesForOperatorsListFilter = function(){

        var categoriesList = ajaxLoader.makeRequest('GET','/app_dev.php/ajaxGetCategoriesForOperators');

        categoriesList.then(function (response) {
            if(response.data !== false){
                $scope.getCategoriesForOperatorsListFilter = response.data.data;
            }
            else{
                $scope.getCategoriesForOperatorsListFilter = false;
            }
        })
    }
    $scope.getCategoriesForOperatorsListFilter();

    $scope.saveOperator = function(username, category, sLine){

      var data = {
          username: username,
          category: category,
          sLine: sLine
      }
      var saveOperator = ajaxLoader.makeRequest('POST','/app_dev.php/ajaxSaveOperator', data);
      saveOperator.then(function (response) {
          if(response.data.data !== false){
            if(response.data.data.code === 1){
              $location.path('/admin-operators');
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
      $scope.operatorSupportLine = value;
    }

    $scope.createOperatorsTable = function(){
        var operatorsList = ajaxLoader.makeRequest('GET','/app_dev.php/ajaxGetOperators');
        operatorsList.then(function (response) {
            if(response.data !== false){
              $scope.operatorsList = response.data.data;
              $scope.filterData()
            }
            else{
                $scope.operatorsList = false;
            }
        })

    }
    $scope.createOperatorsTable();

    $scope.filterByCategorySelect = function(categoryName){
      $scope.filterBy.name = categoryName;
    }

    $scope.orderByColumn = 'firstname';
    $scope.orderByDirection = true;

    $scope.sortBy = function(columnName){
      if($scope.orderByColumn == columnName){
        $scope.orderByDirection = !$scope.orderByDirection
      }else{
          $scope.orderByColumn = columnName;
          $scope.orderByDirection = true;
      }
    }

    $scope.isOrderedBy = function(columnName){
      return($scope.orderByColumn === columnName);
    }

    $scope.showOrderArrow = function(){
      return !$scope.orderByDirection;
    }

    $scope.deleteOperator = function(operatorUsername, categoryId, supportLineId){

        var options = {};
        confirmModal.open(options, 'Are you sure you want to delete this operator?', function(){
            data = {
              operatorUsername: operatorUsername,
              categoryId: categoryId,
              supportLineId: supportLineId
            }
            var operatorsList = ajaxLoader.makeRequest('POST','/app_dev.php/ajaxDeleteOperator', data);
            operatorsList.then(function (response) {
                $scope.createOperatorsTable();
                var message = 'Operator Removed';
                $scope.$parent.successAlert(message, 'success');
            },function(response){
              var message = 'Connection error operator not deleted';
              $scope.$parent.successAlert(message, 'danger');
              $log.error(response)
            })
        });
    }

    $scope.countRecords = function(total, currentPage, limit){
      $scope.begin = currentPage * limit - limit;
       $scope.end = currentPage * limit ;
      if($scope.begin === 0 && $scope.totalRecords !== 0) $scope.begin = 1;
      if ($scope.end > total){
        $scope.end = total;
      }
  }


    $scope.setFirstPage = function(){
        $scope.currentPage = 1;
    }

}])
