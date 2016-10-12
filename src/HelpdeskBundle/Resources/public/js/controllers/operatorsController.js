angular.module('helpdeskModule').controller('OperatorsController', ['$scope', '$http', '$log', '$timeout', '$location','$routeParams', 'ajaxLoader','authentication','DTOptionsBuilder', 'DTColumnBuilder', 'Flash', function ($scope, $http, $log, $timeout, $location, $routeParams, ajaxLoader, authentication, DTOptionsBuilder, DTColumnBuilder, Flash) {
    $scope.searchUser = function(name){
        var data = {
            name: name
        }

        var usersList = ajaxLoader.makeRequest('GET','/app_dev.php/ajaxGetUsersForOperators', data);

        usersList.then(function (response) {
            if(response.data !== false){
                console.log(response.data);
                $scope.usersForOperators = response.data.data;
            }
            else{
                $scope.usersForOperators = false;
            }
        })
    }
}])
