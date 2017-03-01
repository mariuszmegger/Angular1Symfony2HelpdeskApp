  /**
  * Service created for ajax calls
  */

  angular.module('helpdeskModule').factory('ajaxLoader', ['$http', function ($http) {

        var _makeRequest = function(method,url,data){
          if(method === 'POST'){
            return $http({method:method,url:url, data:data})
          }else if (method === 'GET'){
            return $http({method:method,url:url, params:data})
          }
        }
        return {
            makeRequest : _makeRequest
        }
    }])

  /**
  * Service used to autheticate user
  */

  angular.module('helpdeskModule').factory('authentication', ['$location', function ($location) {

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
