angular.module('helpdeskModule').controller('UnitsController', ['$scope', '$http', '$log', '$timeout', '$location','$routeParams', 'ajaxLoader','authentication','DTOptionsBuilder', 'DTColumnBuilder', 'Flash', function ($scope, $http, $log, $timeout, $location, $routeParams, ajaxLoader, authentication, DTOptionsBuilder, DTColumnBuilder, Flash) {
      $scope.test = 'Units';
}])
