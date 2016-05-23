$(document).ready(function () {

    $(".toggle-sidebar").click(function () {
        $("#sidebar").toggleClass("collapse-sidebar");

    });
});

(function () {
    var app = angular.module('helpdeskModule', ['ngRoute']);

    app.config(['$routeProvider', function ($routeProvider) {
            $routeProvider.
                    when('/dashboard', {
                        templateUrl: 'bundles/templates/Dashboard/dashboard.html',
                        controller: 'DashboardController'
                    }).
                    when('/users', {
                        templateUrl: 'bundles/templates/Users/usersList.html',
                        controller: 'UsersController'
                    }).
                    when('/units', {
                        templateUrl: 'bundles/templates/Units/unitsList.html',
                        controller: 'UnitsController'
                    }).
                    when('/support_lines', {
                        templateUrl: 'bundles/templates/SupportLines/supportLinesList.html',
                        controller: 'SupportLinesController'
                    })
                    .when('/operators', {
                        templateUrl: 'bundles/templates/Operators/OperatorsList.html',
                        controller: 'OperatorsController'
                    })
                    .when('/categories', {
                        templateUrl: 'bundles/templates/Categories/categoriesList.html',
                        controller: 'CategoriesController'
                    })
                    .when('/add_category', {
                        templateUrl: 'bundles/templates/Categories/add_category.html',
                        controller: 'CategoriesController'
                    })
                    .when('/edit_category', {
                        templateUrl: 'bundles/templates/Categories/edit_category.html',
                        controller: 'CategoriesController'
                    })
                    .when('/settings', {
                        templateUrl: 'bundles/templates/Settings/SettingsList.html',
                        controller: 'SettingsController'
                    }).
                    otherwise({
                        redirectTo: '/dashboard'
                    });
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
    app.controller('CategoriesController', ['$scope', '$http', '$log','$timeout','$location','ajaxLoader', function ($scope, $http, $log, $timeout, $location, ajaxLoader ) {
            $scope.test = 'Categories';
            $scope.message = '';


        $scope.saveCategory = function(){
          var data = {
              'name':$scope.categoryName,
              'isActive':$scope.categoryIsActive
          }
          ajaxLoader.setCategory('/app_dev.php/ajaxCategories', data)
          .then(function(response){
            $log.error(response)
            $scope.data = response.code
            $scope.message = (response.code == 1)? 'Category Added':'Category exists ';
            $scope.myStyle={
              visibility:'visible',
              opacity:'1'
            }
            // if(response.data.code == 1){
            //     $location.path('/categories');
            // }

            $timeout(function(){
                $scope.myStyle={
                  visibility:'hidden',
                  opacity:'0'
                }
            }, 3000)


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
      })
$log.error($scope.message);
}
        }]);

        app.factory('ajaxLoader', ['$http', '$q', function($http, $q){

          // successCallback = successCallback||function(){};
          // errorCallback = errorCallback||function(){};
          var factory = {};
           var _categoryList = factory.setCategory = function(url,data){
            var defer = $q.defer();
            $http.post(url, data).
            success(function(response) {
            // alter data if needed
              defer.resolve(response);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });
            return defer.promise;
          }
          console.log(_categoryList);
           return {
             categoryList : _categoryList
           };
            // return function(url,data, succesCallback, errorCallback){
            //     succesCallback = succesCallback||function(){};
            //     errorCallback = errorCallback||function(){};
            //     $http.post(url, data).then(succesCallback, errorCallback);
            //     $http({
            //         method: method,
            //         url: url,
            //         data:data
            //     }).then(succesCallback, errorCallback)
            // }
        }])
        app.controller('SettingsController', ['$scope', function ($scope) {
                $scope.test = 'Settings';

            }]);


})();
