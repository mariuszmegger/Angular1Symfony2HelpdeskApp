
(function () {
    var app = angular.module('helpdeskService', []);

    app.factory('ajaxLoader', ['$http', function ($http) {

        var _makeRequest = function(method,url,data){
            return $http({method:method,url:url, data:data})
        }
        return {
            makeRequest : _makeRequest
        }
    }])

    app.factory('authentication', ['$location', function ($location) {

        var _auth = function(){
          var authenticated = false;
          for(var i = 0; i<=userData.user.length; i++ ){
            if (userData.user[i] == 'ROLE_ADMIN'){
              authenticated = true;
            }
          }
          if (authenticated !== true){
             $location.path('/');
          }
          return authenticated;
        }
        return {
            auth : _auth
        }
    }])
})();
