/**
* Directive for validating email change for user. User can not change email to one existing in database
*/

angular.module('helpdeskModule').directive('emailAvailable',['$http','$q', function($http, $q) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
          var oldEmail = scope.editUser.emailNoChange;

          ngModel.$asyncValidators.emailAvailable = function(value) {
			  if(oldEmail !== element.val()){
	             return $http.get('/app_dev.php/checkUserEmail/'+value).then(function(response){
	               	if(response.data){
	                   return;
              		}else{
	                   return $q.reject(response.data.errorMessage);
	               	}
	             });
			 }else{
				    return $q.resolve();
			 }
          }
      }
  };
}]);
