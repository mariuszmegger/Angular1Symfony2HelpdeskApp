$(document).ready(function () {

    $(".toggle-sidebar").click(function () {
        $("#sidebar").toggleClass("collapse-sidebar");

    });
});

/**
 * Main config with module creation, dependency injection, routes and other configuration
 */

angular.module('helpdeskModule', []);
angular.module('helpdeskModule', [
    'ngRoute',
    'datatables',
    'datatables.light-columnfilter',
    'datatables.bootstrap',
    'ui.bootstrap',
    'ngFlash',
    'ngAnimate'
]);

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

/**
 * Main controller with flash message using flash message angular plugin
 */

angular.module('helpdeskModule').controller('MainController', ['$scope', 'Flash', '$timeout', function ($scope, Flash, $timeout) {

    $scope.successAlert = function (message, type) {
        var id = Flash.create(type, message, 0, {class: 'custom-class', id: 'custom-id'}, true);
        $timeout(function () {
            $('.alert').fadeOut(500, function () {
                Flash.dismiss(id);
            });
        }, 5000);
    }
}]);




