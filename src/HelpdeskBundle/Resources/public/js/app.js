$(document).ready(function () {

    $(".toggle-sidebar").click(function () {
        $("#sidebar").toggleClass("collapse-sidebar");

    });
});

(function () {
    var app = angular.module('helpdeskModule', ['ngRoute','datatables','datatables.columnfilter','datatables.bootstrap', 'ui.bootstrap', 'helpdeskService', 'helpdeskDirective', 'helpdeskFilter']);

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
    app.controller('CategoriesController', ['$scope', '$http', '$log', '$timeout', '$location', 'ajaxLoader','DTOptionsBuilder', 'DTColumnBuilder', function ($scope, $http, $log, $timeout, $location, ajaxLoader, DTOptionsBuilder, DTColumnBuilder) {
        $scope.message = '';
        $scope.test = 'Categories';
        $scope.categories = false;
        $scope.filterBy = {
        };

        var vm = this;
        $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers')
            .withBootstrap()
        console.log($scope.dtOptions);

        // $scope.orderByColumn = 'id';
        // $scope.orderByDir = true;

        // $scope.itemsPerPage = 10;
        // $scope.totalItems = 0;
        // $scope.currentPage = 1;

//        $scope.bigCurrentPage = $scope.bigTotalItems / $scope.limitRec;

        // console.log($scope.totalItems);
        // console.log($scope.currentPage);

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

        $scope.getCategories = function(){
          var serviceResponse2 = ajaxLoader.makeRequest('GET','/app_dev.php/ajaxGetCategories', data = null);
          serviceResponse2.then(function (response) {
            if(response != false){
              if(!$scope.filteredCategories){
                $scope.categories = response.data;
              }

              //   $scope.totalItems = response.data.length;
               //
              //  $scope.$watch('currentPage + itemsPerPage', function() {
              //   var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
              //     end = begin + $scope.itemsPerPage;
               //
              //   $scope.filteredCategories = $scope.categories.slice(begin, end);
               //
              //   $scope.pageCount = function () {
              //     return Math.ceil($scope.filteredCategories.length / $scope.itemsPerPage);
              //   };
              //   console.log($scope.filteredCategories);
              //   console.log($scope.currentPage);
              //   console.log($scope.totalItems);
              //   console.log($scope.itemsPerPage);
              // });

                // console.log($scope.currentPage);
                // console.log($scope.totalItems);
                // console.log($scope.categories);
            }
            else{
              $scope.categories = false;
            }

          }, function(response){

        })
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

        $scope.getCategories();

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
