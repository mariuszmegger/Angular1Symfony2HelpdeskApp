angular.module('helpdeskModule').directive('validateEmailAvailable',['$http','$log', function($http,$log) {

    return {
      restrict: 'AE',
      require: 'ngModel',
      link: function(element, attrs, scope, ngModel) {
        ngModel.$asyncValidators.emailAvailable = function(value) {
           return $http.get('/app_dev.php/checkUserEmail/'+value);
        }

      },
    };
}]);
