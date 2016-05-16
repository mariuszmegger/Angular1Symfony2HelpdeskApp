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
                    .when('/categories', {
                        templateUrl: 'bundles/templates/Categories/CategoriesList.html',
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
    app.controller('CategoriesController', ['$scope', '$http','$log', function ($scope, $http, $log) {
            $scope.test = 'Categories';

        $scope.saveCategory = function(){
            $http({
                method: 'POST',
                url: '/app_dev.php/ajaxCategories',
                data:{
                    'name':$scope.categoryName,
                    'isActive':$scope.categoryIsActive
                }
            }).then(function successCallback(response) {
                var data = response.data;
                data = angular.fromJson(data);
                $scope.category = data.categoryId;
                $log.response;
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                $scope.category = response;
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }



        }]);
    app.controller('SettingsController', ['$scope', function ($scope) {
            $scope.test = 'Settings';

        }]);



})();
