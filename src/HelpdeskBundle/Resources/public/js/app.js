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
    app.controller('CategoriesController', ['$scope', '$http', '$log', '$timeout', '$location', 'ajaxLoader', function ($scope, $http, $log, $timeout, $location, ajaxLoader) {
        $scope.message = '';
        $scope.test = 'Categories';
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
    }]);

    app.factory('ajaxLoader', ['$http', function ($http) {

        var __makeRequest = function(method,url,data){
            return $http({method:method,url:url, data:data})
        }
        return {
            makeRequest : __makeRequest
        }

    }])
    app.controller('SettingsController', ['$scope', function ($scope) {
        $scope.test = 'Settings';

    }]);


})();
