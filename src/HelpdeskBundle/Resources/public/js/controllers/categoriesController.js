angular.module('helpdeskModule').controller('CategoriesController', ['$scope', '$http', '$log', '$timeout', '$location','$routeParams', 'ajaxLoader','authentication','DTOptionsBuilder', 'DTColumnBuilder', 'Flash', function ($scope, $http, $log, $timeout, $location, $routeParams, ajaxLoader, authentication, DTOptionsBuilder, DTColumnBuilder, Flash) {

	//    authentication.auth()

	$scope.categories = false;
	$scope.filterBy = {}
	$scope.companyName = '';
	$scope.companyIsActive = '';

	/**
	* Company name filter
	*/
	$scope.saveCompanyName = function(name){
		$scope.companyName = name;
		$scope.propagateTable($scope.companyName, $scope.companyIsActive);
	}

	/**
	* Is Active filter
	*/
	$scope.saveCompanyisActive = function(isActive){
		$scope.companyIsActive = isActive;
		$scope.propagateTable($scope.companyName, $scope.companyIsActive);
	}

	/**
	* Ajax data dipslaying in datatable
	*/
	$scope.propagateTable = function(name, active){

		var startData = {
			'name': name ,
			'isActive': active
		}
		$scope.dtOptions = DTOptionsBuilder.newOptions()
		.withOption('ajax', {
			url: '/app_dev.php/ajaxGetCategories',
			type: 'GET',
			data: startData
		})
		.withDataProp('data')
		.withOption('processing', true)
		.withOption('serverSide', true)
		.withPaginationType('full_numbers')
		.withBootstrap()

		$scope.dtColumns = [
			DTColumnBuilder.newColumn('id').withTitle('ID').withOption('width', '5%'),
			DTColumnBuilder.newColumn('name').withTitle('name'),
			DTColumnBuilder.newColumn('created_by').withTitle('createdBy'),
			DTColumnBuilder.newColumn('created_date').withTitle('createdDate'),
			DTColumnBuilder.newColumn('is_active').withTitle('isActive').renderWith(function(data, type, full) {
				if(data == 1){
					return '<span class="text-success">YES</span>';
				}
				else{
					return '<span class="text-danger">NO</span>'
				}
			}),
			DTColumnBuilder.newColumn('operations').withTitle('Operations').notSortable()
			.renderWith(function(data, type, full) {
				return '<a href="#/admin-edit_category:'+full.id+'"><i class="fa fa-pencil-square" aria-hidden="true"></i></a>';
			})
		]
		$scope.dtInstance = {};

	}
	$scope.propagateTable($scope.companyName, $scope.companyIsActive);

	/**
	* New category adding
	*/
	$scope.saveCategory = function () {

		var data = {
			'name': $scope.addCategoryName,
			'isActive': $scope.addCategoryIsActive,
			'createdBy':userData.userName
		}
		var serviceResponse = ajaxLoader.makeRequest('POST','/app_dev.php/ajaxCategories', data);
		serviceResponse.then(function (response) {

			$scope.data = response.data.code;
			(response.data.code == 1)? $scope.dtInstance.rerender():''
			$scope.addCategoryName = '';
			$scope.addCategoryIsActive = '';

			if(response.data.code == 1){
				$location.path('/admin-categories');
				var message = 'Category Added';
				$scope.$parent.successAlert(message, 'success');
			}
			else{
				$location.path('/admin-categories');
				var message = 'Category name already exists';
				$scope.$parent.successAlert(message, 'danger');
			}
		},function(response){
			$location.path('/admin-categories');
			var message = 'Connection error category not changed';
			$scope.$parent.successAlert(message, 'danger');

			$log.error(response)
		})

		$timeout(function(){
			$scope.myStyle={
				visibility:'hidden',
				opacity:'0'
			}
		}, 3000)
	}

	/**
	* Updating one category
	*/
	$scope.editCategory = function(){


		var data = {
			'name': $scope.singleCategory.name,
			'isActive': $scope.singleCategory.isActive,
			'id':$routeParams.id
		}
		var serviceResponse = ajaxLoader.makeRequest('POST','/app_dev.php/ajaxUpdateCategory', data);
		serviceResponse.then(function (response) {

			$scope.data = response.data.code;
			$scope.message = (response.data.code == 1) ? 'Category Edited' : response.data.message;
			// (response.data.code == 1)? $scope.dtInstance.rerender():''
			$scope.myStyle = {
				visibility: 'visible',
				opacity: '1'
			}
			$scope.addCategoryName = '';
			$scope.addCategoryIsActive = '';
			if(response.data.code == 1){
				$location.path('/admin-categories');
				var message = 'Category Edited';
				$scope.$parent.successAlert(message, 'success');
			}
			else{
				console.log('aaa');
				$location.path('/admin-edit_category:'+397+'');
				var message = 'Category name already exists';
				$scope.$parent.successAlert(message, 'danger');
			}
		},function(response){
			var message = 'Connection error category not changed';
			$scope.$parent.successAlert(message, 'danger');
			$log.error(response)
		})

		$timeout(function(){
			$scope.myStyle={
				visibility:'hidden',
				opacity:'0'
			}
		}, 3000)
	}


	/**
	* Getting one category for update
	*/
	$scope.getOneCategory = function(id){
		var id = id.replace(':',' ');
		var data = {
			'id': id
		}
		var serviceResponse3 = ajaxLoader.makeRequest('POST','/app_dev.php/ajaxGetOneCategory', data);
		serviceResponse3.then(function (response) {
			if(response.data != false){
				$scope.singleCategory = response.data[0];
			}
			else{
				$location.path('/admin-categories');
			}
		})
	}
	if($routeParams.id){
		$scope.getOneCategory($routeParams.id)
	}

	$scope.checkIsActive = function(is_active){
		if(is_active === 1){ return true } else{ return false};
	}

	/**
	* Getting all categories
	*/
	$scope.getCategories = function(){
		var serviceResponse2 = ajaxLoader.makeRequest('GET','/app_dev.php/ajaxGetCategories', data = null);
		serviceResponse2.then(function (response) {
			if(response != false){
				$scope.categories = response.data;
			}
			else{
				$scope.categories = false;
			}
		})
	}
}])
