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
                        templateUrl: 'bundlesa/templates/Categories/categoriesList.html',
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
    app.controller('CategoriesController', ['$scope', '$http', function ($scope, $http ) {
            $scope.test = 'Categories';
            $scope.message = '';

        $scope.saveCategory = function(){
            $http({
                method: 'POST',
                url: '/app_dev.php/ajaxCategories',
                data:{
                    'name':$scope.categoryName,
                    'isActive':$scope.categoryIsActive
                }
            }).then(function successCallback(response) {
                // response.data = 1;
                $scope.data = response.data.code

                $scope.message = (response.data.code == 1)? 'Category Added':'Taka kategoria juz istnieje ';
            }, function errorCallback(response) {
              $scope.data = 0;
              $scope.message = 'Wystąpił błąd s'
            });
        }



        }]);
    app.controller('SettingsController', ['$scope', function ($scope) {
            $scope.test = 'Settings';

        }]);



})();
