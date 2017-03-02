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

    /**
    * Service used to create confirm modals
    */

    angular.module('helpdeskModule').service('confirmModal', ['$uibModal', function ($uibModal) {

          var _open = function(options, text, callbackOnConfirm){
          var tempOptions = {};
          var defaultOptions = {
            animation:true,
            keyboard:true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy:'modal-body',
            template: '<div class="modal-header">'
                              +'<h3 class="modal-title" id="modal-title">Confirmation Box</h3></div>'
                              +'<div class="modal-body" id="modal-body">'
                              +'<h4>'+text+'</h4></div>'
                      +'<div class="modal-footer">'
                              +'<button class="btn btn-primary" type="button" ng-click="modalOptions.ok(); modalOptions.close()">OK</button>'
                              +'<button class="btn btn-default" type="button" ng-click="modalOptions.close()">Cancel</button>'
                      +'</div>',
            size:'md',
          }
          tempOptions = angular.extend(defaultOptions, options);

          if (!tempOptions.controller) {
           tempOptions.controller = function ($scope, $uibModalInstance) {
               $scope.modalOptions = {};
               if(callbackOnConfirm){
                 $scope.modalOptions.ok = callbackOnConfirm;
               }
                $scope.modalOptions.close = function (result) {
                  $uibModalInstance.dismiss('cancel');
               };
           };
       }
          $uibModal.open(tempOptions);
        }
          return {
              open : _open
          }
      }])
