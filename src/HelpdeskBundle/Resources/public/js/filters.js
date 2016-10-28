
(function () {
  angular.module('helpdeskModule').filter('pagination', function(){
    return function(value,limit){
        value = value.slice(0,limit);
      return value;
    }
  })
})();
