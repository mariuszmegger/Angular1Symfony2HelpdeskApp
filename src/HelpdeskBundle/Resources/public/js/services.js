
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
})();
