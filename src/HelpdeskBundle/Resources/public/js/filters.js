
(function () {
  angular.module('helpdeskModule').filter('pagination', function(){
    return function(value, currentPage, limit){
      console.log(value);
      var begin = currentPage * limit - limit;
      var end = currentPage * limit ;
      filteredValue = value.slice(begin,end);
      console.log(filteredValue);
            // $scope.totalRecords = filteredValue.length;
      return filteredValue;

    }
  })
  angular.module('helpdeskModule').filter('countRecords', function(){
    return function(value){
      filteredRecords = value.length;
      return filteredRecords;
    }
  })
})();
