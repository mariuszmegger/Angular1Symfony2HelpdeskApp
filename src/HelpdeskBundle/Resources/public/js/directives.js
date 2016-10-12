angular.module('helpdeskModule').directive('validateEmailAvailable',['$http','$log','$q', function($http,$log, $q) {

    return {
      restrict: 'AE',
      require: 'ngModel',
      link: function(element, attrs, scope, ngModel, controller) {
        ngModel.$asyncValidators.emailAvailable = function(modelValue, viewValue) {
            var value = modelValue || viewValue;

            return $http.get('/app_dev.php/checkUserEmail/'+value)
        }
      }
    };
}]);
