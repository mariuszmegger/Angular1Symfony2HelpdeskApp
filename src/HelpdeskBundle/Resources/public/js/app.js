$(document).ready(function () {

    $(".toggle-sidebar").click(function () {
        $("#sidebar").toggleClass("collapse-sidebar");

    });
});

(function () {
    var app = angular.module('helpdeskModule', ['ngRoute','datatables','datatables.light-columnfilter','datatables.bootstrap', 'ui.bootstrap', 'helpdeskService', 'helpdeskDirective', 'helpdeskFilter']);

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
            .when('/admin-edit_category:id', {
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

    app.controller('MainController', ['$scope', function ($scope) {
        $scope.testMain = 'test main';
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
    app.controller('CategoriesController', ['$scope', '$http', '$log', '$timeout', '$location','$routeParams', 'ajaxLoader','authentication','DTOptionsBuilder', 'DTColumnBuilder', function ($scope, $http, $log, $timeout, $location, $routeParams, ajaxLoader, authentication, DTOptionsBuilder, DTColumnBuilder) {

//        authentication.auth()

        $scope.message = '';
        $scope.categories = false;
        $scope.filterBy = {}
        $scope.companyName = '';
        $scope.companyIsActive = '';
        console.log($scope.companyName);

          $scope.saveCompanyName = function(name){
            $scope.companyName = name;
            $scope.propagateTable($scope.companyName, $scope.companyIsActive);
          }
          $scope.saveCompanyisActive = function(isActive){
            $scope.companyIsActive = isActive;
            $scope.propagateTable($scope.companyName, $scope.companyIsActive);
          }

          $scope.propagateTable = function(name, active){

          var startData = {
              'name': name ,
              'isActive': active
          }
          $scope.dtOptions = DTOptionsBuilder.newOptions()
          .withOption('ajax', {
            url: '/app_dev.php/ajaxGetCategories',
            type: 'GET',
            data: startData
          })
            .withDataProp('data')
            .withOption('processing', true)
            .withOption('serverSide', true)
            .withPaginationType('full_numbers')
            .withBootstrap()

          $scope.dtColumns = [
             DTColumnBuilder.newColumn('id').withTitle('ID').withOption('width', '5%'),
             DTColumnBuilder.newColumn('name').withTitle('name'),
             DTColumnBuilder.newColumn('created_by').withTitle('createdBy'),
             DTColumnBuilder.newColumn('created_date').withTitle('createdDate'),
             DTColumnBuilder.newColumn('is_active').withTitle('isActive').renderWith(function(data, type, full) {
               if(data == 1){
                 return 'YES';
               }
               else{
                 return 'NO'
               }
             }),
             DTColumnBuilder.newColumn('operations').withTitle('Operations').notSortable()
               .renderWith(function(data, type, full) {
                  return '<a href="#/admin-edit_category:'+full.id+'"><i class="fa fa-pencil-square" aria-hidden="true"></i></a>';
             })
        ]
        $scope.dtInstance = {};

    }
$scope.propagateTable($scope.companyName, $scope.companyIsActive);
                //  DTColumnBuilder.newColumn('operations').withTitle('operations')
// $scope.propagateTable(name,isActive)
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
                'name': $scope.addCategoryName,
                'isActive': $scope.addCategoryIsActive
            }

            var serviceResponse = ajaxLoader.makeRequest('POST','/app_dev.php/ajaxCategories', data);
            serviceResponse.then(function (response) {

              $scope.data = response.data.code;
              $scope.message = (response.data.code == 1) ? 'Category Added' : response.data.message;
              (response.data.code == 1)? $scope.dtInstance.rerender():''
              $scope.myStyle = {
                  visibility: 'visible',
                  opacity: '1'
              }
              $scope.addCategoryName = '';
              $scope.addCategoryIsActive = '';
                  //  if(response.data.code == 1){
                  //       $location.path('/admin-categories');
                  //  }
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

        $scope.getOneCategory = function(id){
          var id = id.replace(':',' ');
          var data = {
            'id': id
          }
          var serviceResponse3 = ajaxLoader.makeRequest('POST','/app_dev.php/ajaxGetOneCategory', data);
          serviceResponse3.then(function (response) {
            if(response.data != false){
                $scope.singleCategory = response.data[0];

            }
            else{
                $location.path('/admin-categories');
            }
        })
      }
      if($routeParams.id){
        $scope.getOneCategory($routeParams.id)
      }

      $scope.checkIsActive = function(is_active){
        if(is_active === 1){ return true } else{ return false};
      }

        $scope.getCategories = function(){
          var serviceResponse2 = ajaxLoader.makeRequest('GET','/app_dev.php/ajaxGetCategories', data = null);
          serviceResponse2.then(function (response) {
            if(response != false){
                $scope.categories = response.data;

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

        // $scope.getCategories();

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
