$(document).ready(function () {

    $(".toggle-sidebar").click(function () {
        $("#sidebar").toggleClass("collapse-sidebar");

    });
});
    angular.module('helpdeskModule',[]);
    angular.module('helpdeskModule', ['ngRoute','datatables','datatables.light-columnfilter','datatables.bootstrap',
     'ui.bootstrap', 'ngFlash', 'ngAnimate']);
     angular.module('helpdeskModule').config(['$routeProvider', function ($routeProvider) {
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
            when('/admin-edit_user:user_id', {
                templateUrl: 'bundles/templates/Users/edit_user.html',
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
                controller: 'OperatorsController',
            })
            .when('/admin-addOperators', {
                templateUrl: 'bundles/templates/Operators/addOperator.html',
                controller: 'OperatorsController',
                controllerAs: 'Oper'
            })
            .when('/admin-categories', {
                templateUrl: 'bundles/templates/Categories/categoriesList.html',
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

    angular.module('helpdeskModule').controller('MainController', ['$scope', 'Flash','$timeout', function ($scope, Flash, $timeout) {

      $scope.successAlert = function (message, type) {
          var id = Flash.create(type, message, 0, {class: 'custom-class', id: 'custom-id'}, true);
          $timeout(function(){
            $('.alert').fadeOut(500, function(){
              Flash.dismiss(id);
            });
        },5000);
      }
    }]);



    // angular.module('helpdeskModule').controller('CategoriesController', ['$scope', '$http', '$log', '$timeout', '$location','$routeParams', 'ajaxLoader','authentication','DTOptionsBuilder', 'DTColumnBuilder', 'Flash', function ($scope, $http, $log, $timeout, $location, $routeParams, ajaxLoader, authentication, DTOptionsBuilder, DTColumnBuilder, Flash) {
    //
    //     $scope.test = 'Users';
    //
    //     $scope.propagateTable = function(unit, active){
    //
    //     var startData = {
    //         'unit': unit ,
    //         'isActive': active
    //     }
    //     $scope.dtOptions = DTOptionsBuilder.newOptions()
    //     .withOption('ajax', {
    //       url: '/app_dev.php/ajaxGetUsers',
    //       type: 'GET',
    //       data: startData
    //     })
    //       .withDataProp('data')
    //       .withOption('processing', true)
    //       .withOption('serverSide', true)
    //       .withPaginationType('full_numbers')
    //       .withBootstrap()
    //
    //     $scope.dtColumns = [
    //        DTColumnBuilder.newColumn('id').withTitle('ID').withOption('width', '5%'),
    //        DTColumnBuilder.newColumn('Login').withTitle('login'),
    //        DTColumnBuilder.newColumn('First Name').withTitle('first name'),
    //        DTColumnBuilder.newColumn('Last Name').withTitle('last name'),
    //        DTColumnBuilder.newColumn('City').withTitle('city'),
    //        DTColumnBuilder.newColumn('Street').withTitle('street'),
    //        DTColumnBuilder.newColumn('Post Code').withTitle('post code'),
    //        DTColumnBuilder.newColumn('created_by').withTitle('createdBy'),
    //        DTColumnBuilder.newColumn('created_date').withTitle('createdDate'),
    //        DTColumnBuilder.newColumn('is_active').withTitle('isActive').renderWith(function(data, type, full) {
    //          if(data == 1){
    //            return '<span class="text-success">YES</span>';
    //          }
    //          else{
    //            return '<span class="text-danger">NO</span>'
    //          }
    //        }),
    //        DTColumnBuilder.newColumn('operations').withTitle('Operations').notSortable()
    //          .renderWith(function(data, type, full) {
    //             return '<a href="#/admin-edit_user:'+full.id+'"><i class="fa fa-pencil-square" aria-hidden="true"></i></a><a href="/app_dev.php/ajaxDeleteUser/:'+full.id+'"><i class="fa fa-pencil-square" aria-hidden="true"></i></a>';
    //        })
    //   ]
    //   $scope.dtInstance = {};
    //
    //   }
    //   $scope.propagateTable($scope.companyName, $scope.companyIsActive);
    //
    //
    // }]);






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
