$(document).ready(function () {

    $(".toggle-sidebar").click(function () {
        $("#sidebar").toggleClass("collapse-sidebar");

    });
});

(function () {
    var app = angular.module('helpdeskModule', ['ngRoute','ui.bootstrap', 'helpdeskService', 'helpdeskDirective', 'helpdeskFilter']);

    app.config(['$routeProvider', function ($routeProvider) {
      // $httpProvider.defaults.cache = true;
        $routeProvider.
            when('/admin-dashboard', {
                templateUrl: 'bundles/templates/Dashboard/dashboard.html',
                controller: 'DashboardController'
            }).
            when('/admin-users', {
                templateUrl: 'bundles/templates/Users/usersList.html',
                controller: 'UsersController'
            }).
            when('/admin-units', {
                templateUrl: 'bundles/templates/Units/unitsList.html',
                controller: 'UnitsController'
            }).
            when('/admin-support_lines', {
                templateUrl: 'bundles/templates/SupportLines/supportLinesList.html',
                controller: 'SupportLinesController'
            })
            .when('/admin-operators', {
                templateUrl: 'bundles/templates/Operators/OperatorsList.html',
                controller: 'OperatorsController'
            })
            .when('/admin-categories', {
                templateUrl: 'bundles/templates/Categories/categoriesList.html',
                controller: 'CategoriesController'
            })
            .when('/admin-add_category', {
                templateUrl: 'bundles/templates/Categories/add_category.html',
                controller: 'CategoriesController'
            })
            .when('/admin-edit_category', {
                templateUrl: 'bundles/templates/Categories/edit_category.html',
                controller: 'CategoriesController'
            })
            .when('/admin-settings', {
                templateUrl: 'bundles/templates/Settings/SettingsList.html',
                controller: 'SettingsController'
            }).
            otherwise({
                redirectTo: '/admin-dashboard'
            });
            // $locationProvider.html5Mode(true);
    }]);

    app.controller('DashboardController', ['$scope', function ($scope) {
        $scope.test = 'Dashboard';
    }]);

    app.controller('UsersController', ['$scope', function ($scope) {
        $scope.test = 'Users';

    }]);
    app.controller('UnitsController', ['$scope', function ($scope) {
        $scope.test = 'Units';

    }]);
    app.controller('SupportLinesController', ['$scope', function ($scope) {
        $scope.test = 'SupportLines';

    }]);
    app.controller('OperatorsController', ['$scope', function ($scope) {
        $scope.test = 'Operators';

    }]);
    app.controller('CategoriesController', ['$scope', '$http', '$log', '$timeout', '$location', 'ajaxLoader', function ($scope, $http, $log, $timeout, $location, ajaxLoader) {
        $scope.message = '';
        $scope.test = 'Categories';
        $scope.categories = false;
        $scope.orderByColumn = 'id';
        $scope.orderByDir = true;
        $scope.filterBy = {
        };
        $scope.limitRec = 100;
        $scope.bigTotalItems = 0;
        $scope.bigCurrentPage = 1;
        $scope.bigCurrentPage = $scope.bigTotalItems / $scope.limitRec;

        console.log($scope.bigTotalItems);
        console.log($scope.limitRec);
        console.log($scope.bigCurrentPage);

        $scope.saveCategory = function () {
            var data = {
                'name': $scope.categoryName,
                'isActive': $scope.categoryIsActive
            }
            var serviceResponse = ajaxLoader.makeRequest('POST','/app_dev.php/ajaxCategories', data);
            serviceResponse.then(function (response) {
                    $scope.data = response.data.code
                    $scope.message = (response.data.code == 1) ? 'Category Added' : response.data.message;
                    $scope.myStyle = {
                        visibility: 'visible',
                        opacity: '1'
                    }
//                    if(response.data.code == 1){
//                         $location.path('/categories');
//                    }
                },function(response){
                    $scope.message = 'Connection error category not added'
                    $scope.myStyle={
                        visibility:'visible',
                        opacity:'1'
                    }

                    $log.error(response)
                })

            $timeout(function(){
                $scope.myStyle={
                    visibility:'hidden',
                    opacity:'0'
                }
            }, 3000)
        }

        // $scope.getCategories = function(){
          var serviceResponse2 = ajaxLoader.makeRequest('GET','/app_dev.php/ajaxGetCategories', data = null);
          serviceResponse2.then(function (response) {
            if(response != false){
                $scope.categories = response.data;
                $scope.bigTotalItems = response.data.length;
                $scope.bigCurrentPage = Math.ceil($scope.bigTotalItems / $scope.limitRec);
                console.log($scope.bigCurrentPage);
            }
            else{
              $scope.categories = false;
            }

          }, function(response){

        })
        $scope.pageChanged = function(){
            console.log($scope.bigTotalItems);
            console.log($scope.limitRec);
            console.log($scope.bigCurrentPage);
        }

        $scope.changeOrder = function(columnName){
            if($scope.orderByColumn == columnName){
                $scope.orderByDir = !$scope.orderByDir;
              }else{
                $scope.orderByColumn = columnName
                $scope.orderByDir = false;
              }
        }

        $scope.isOrderedBy = function(columnName){
           return ($scope.orderByColumn == columnName);
        }

        $scope.isOrderedReverse = function(){
          return !$scope.orderByDir;
        }



    }])
    app.controller('SettingsController', ['$scope', function ($scope) {
        $scope.test = 'Settings';

    }]);


          // function(response){
          //   $scope.data = 0;
          //   $scope.message = 'Connection error category not added'
          //   $scope.myStyle={
          //     visibility:'visible',
          //     opacity:'1'
          //   }
          //   $timeout(function(){
          //       $scope.myStyle={
          //         visibility:'hidden',
          //         opacity:'0'
          //       }
          //   }, 3000)
          // }
        // )


})();
