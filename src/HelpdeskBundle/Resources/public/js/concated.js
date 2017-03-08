
/**
* Main config with module creation, dependency injection, routes and other configuration
*/

angular.module('helpdeskModule', []);
angular.module('helpdeskModule', [
	'ngRoute',
	'datatables',
	'datatables.bootstrap',
	'ui.bootstrap',
	'ngFlash',
	'ngAnimate'
]);

angular.module('helpdeskModule').config(['$routeProvider', function ($routeProvider) {
	// $httpProvider.defaults.cache = true;
	$routeProvider.
	when('/admin-dashboard', {
		templateUrl: 'bundles/templates/Dashboard/dashboard.html',
		controller: 'DashboardController'
	}).
	when('/admin-users', {
		templateUrl: 'bundles/templates/Users/usersList.html',
		controller: 'UsersController'
	}).
	when('/admin-edit_user:user_id', {
		templateUrl: 'bundles/templates/Users/edit_user.html',
		controller: 'UsersController'
	}).
	when('/admin-units', {
		templateUrl: 'bundles/templates/Units/unitsList.html',
		controller: 'UnitsController'
	}).
	when('/admin-support_lines', {
		templateUrl: 'bundles/templates/SupportLines/supportLinesList.html',
		controller: 'SupportLinesController'
	})
	.when('/admin-operators', {
		templateUrl: 'bundles/templates/Operators/operatorsList.html',
		controller: 'OperatorsController',
	})
	.when('/admin-addOperators', {
		templateUrl: 'bundles/templates/Operators/addOperator.html',
		controller: 'OperatorsController',
		controllerAs: 'Oper'
	})
	.when('/admin-categories', {
		templateUrl: 'bundles/templates/Categories/categoriesList.html',
		controller: 'CategoriesController'
	})
	.when('/admin-edit_category:id', {
		templateUrl: 'bundles/templates/Categories/edit_category.html',
		controller: 'CategoriesController'
	})
	.when('/admin-settings', {
		templateUrl: 'bundles/templates/Settings/SettingsList.html',
		controller: 'SettingsController'
	}).
	otherwise({
		redirectTo: '/admin-dashboard'
	});
	// $locationProvider.html5Mode(true);
}]);

/**
* Main controller with flash message using flash message angular plugin
*/

angular.module('helpdeskModule').controller('MainController', ['$scope', 'Flash', '$timeout','authentication', function ($scope, Flash, $timeout, authentication) {

	$scope.successAlert = function (message, type) {
		var id = Flash.create(type, message, 0, {class: 'custom-class', id: 'custom-id'}, true);
		$timeout(function () {
			$('.alert').fadeOut(500, function () {
				Flash.dismiss(id);
			});
		}, 5000);
	}

	var result = authentication.getUserData();
	 result.then(function(response){
		 if(response.data.user){
			 $scope.oneUser = response.data.user;
			//  authentication.auth($scope.oneUser);
		 }
	 })

}]);
;angular.module('helpdeskModule').controller('CategoriesController', ['$scope', '$http', '$log', '$timeout', '$location','$routeParams', 'ajaxLoader','DTOptionsBuilder', 'DTColumnBuilder', 'Flash', 'authentication', function ($scope, $http, $log, $timeout, $location, $routeParams, ajaxLoader, DTOptionsBuilder, DTColumnBuilder, Flash, authentication) {

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
			'createdBy':$scope.$parent.oneUser.login
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
;angular.module('helpdeskModule').controller('DashboardController', ['$scope', '$http', '$log', '$timeout', '$location','$routeParams', 'ajaxLoader', 'DTOptionsBuilder', 'DTColumnBuilder', 'Flash', function ($scope, $http, $log, $timeout, $location, $routeParams, ajaxLoader, DTOptionsBuilder, DTColumnBuilder, Flash) {
}])
;angular.module('helpdeskModule').controller('OperatorsController', ['$scope', '$http', '$log', '$timeout', '$location','$routeParams', 'ajaxLoader','DTOptionsBuilder', 'DTColumnBuilder', 'Flash', '$filter', 'confirmModal', function ($scope, $http, $log, $timeout, $location, $routeParams, ajaxLoader, DTOptionsBuilder, DTColumnBuilder, Flash, $filter, confirmModal) {
	$scope.candidateTableCheck = false;
	$scope.filterBy = {};
	$scope.listLength = 10;
	$scope.operatorsList = [];
	$scope.filteredOperatorList = [];
	$scope.finalFilteredOperatorList = [];
	$scope.currentPage = 1;
	$scope.paginationLengthArray = [];
	$scope.totalRecords = undefined;


	/**
	* Function for assigning current page number on page change
	*/
	$scope.pageChanged = function (pageNo) {
		$scope.currentPage = pageNo;
	};

	/**
	* Function for checking if any filer in operators table have changed
	*/
	$scope.$watch('filterBy.name + filterBy.line_name + listLength + searchTerm + currentPage', function() {
		$scope.filterData();
	});

	/**
	* Function for filtering data in operators table, First search box next outside select filters
	*/
	$scope.filterData = function(){

		var operatorsList = $scope.operatorsList,
		searchTerm = $scope.searchTerm,
		filteredOperatorList = [],
		filterByName = $scope.filterBy.name,
		filterByLineName = $scope.filterBy.line_name

		$scope.finalFilteredOperatorList = [];

		if($scope.searchTerm){
			for(var i = 0, y = operatorsList.length; i < y ; i++){
				if(
					operatorsList[i].name.indexOf(searchTerm) !== -1 ||
					operatorsList[i].firstname.indexOf(searchTerm) !== -1 ||
					operatorsList[i].surname.indexOf(searchTerm) !== -1 ||
					operatorsList[i].username.indexOf(searchTerm) !== -1 ||
					operatorsList[i].line_name.indexOf(searchTerm) !== -1

				){
					filteredOperatorList.push(operatorsList[i]);
				}
			}
		}else{
			filteredOperatorList = operatorsList
		}

		for(var i=0, y = filteredOperatorList.length; i< y ; i++){

			if(filterByName && filterByLineName){
				if(filteredOperatorList[i].support_line_id == filterByLineName && filteredOperatorList[i].name == filterByName){
					$scope.finalFilteredOperatorList.push(filteredOperatorList[i]);
				}
			}
			else if(filterByName){
				if(filteredOperatorList[i].name == filterByName){
					$scope.finalFilteredOperatorList.push(filteredOperatorList[i]);
				}
			}
			else if(filterByLineName){
				if(filteredOperatorList[i].support_line_id == filterByLineName){
					$scope.finalFilteredOperatorList.push(filteredOperatorList[i]);
				}
			}
			else{
				$scope.finalFilteredOperatorList.push(filteredOperatorList[i]);
			}
		}
		$scope.totalRecords = $scope.finalFilteredOperatorList.length;
		$scope.countRecords($scope.totalRecords,$scope.currentPage, $scope.listLength);

	}
	/**
	* Function for searching users by name on change the input filter
	*/
	$scope.searchUser = function(name){
		if(name.length > 2 ){
			$scope.candidateTableCheck = false;
			if(name){
				var data = {
					name: name
				}
				var usersList = ajaxLoader.makeRequest('GET','/app_dev.php/ajaxGetUsersForOperators', data);

				usersList.then(function (response) {
					if(response.data !== false){
						$scope.usersForOperators = response.data.data;
					}
					else{
						$scope.usersForOperators = false;
					}
				})
			}
		}
	}
	/**
	* Function for creation of the one user avaliable to stays as an operator
	*/
	$scope.prepareForOperator = function(firstname, surname, username, email){

		$scope.getCategoriesForOperators();

		$scope.candidateTable = {};
		$scope.candidateTable.firstname = firstname;
		$scope.candidateTable.surname = surname;
		$scope.candidateTable.username = username;
		$scope.candidateTable.email = email;

	}

	/**
	* Function for getting categories for filter in operators list
	*/
	$scope.getCategoriesForOperators = function(){

		var categoriesList = ajaxLoader.makeRequest('GET','/app_dev.php/ajaxGetCategoriesForOperators');

		categoriesList.then(function (response) {
			if(response.data !== false){
				$scope.candidateTableCheck = true;
				$scope.categoriesForOperators = response.data.data;
			}
			else{
				$scope.categoriesForOperators = false;
			}
		})
	}

	/**
	* Function for getting categories for acribing user to operators
	*/
	$scope.getCategoriesForOperatorsListFilter = function(){

		var categoriesList = ajaxLoader.makeRequest('GET','/app_dev.php/ajaxGetCategoriesForOperators');

		categoriesList.then(function (response) {
			if(response.data !== false){
				$scope.getCategoriesForOperatorsListFilter = response.data.data;
			}
			else{
				$scope.getCategoriesForOperatorsListFilter = false;
			}
		})
	}
	$scope.getCategoriesForOperatorsListFilter();

	/**
	* Function for acribing user to operators
	*/
	$scope.saveOperator = function(username, category, sLine){

		var data = {
			username: username,
			category: category,
			sLine: sLine
		}
		var saveOperator = ajaxLoader.makeRequest('POST','/app_dev.php/ajaxSaveOperator', data);
		saveOperator.then(function (response) {
			if(response.data.data !== false){
				if(response.data.data.code === 1){
					$location.path('/admin-operators');
					var message = 'Operator Added';
					$scope.$parent.successAlert(message, 'success');
				}
				else{
					var message = 'Operator Exists';
					$scope.$parent.successAlert(message, 'danger');
				}
			}
			else{
				$scope.usersForOperators = false;
				var message = 'Server connection problem';
				$scope.$parent.successAlert(message, 'danger');
			}
		})
	}

	/**
	* Function for assigning suport line required for ascribing the new operator
	*/
	$scope.saveValueFromSelect = function(value){
		$scope.operatorSupportLine = value;
	}

	/**
	* Function for getting all operators
	*/
	$scope.createOperatorsTable = function(){
		var operatorsList = ajaxLoader.makeRequest('GET','/app_dev.php/ajaxGetOperators');
		operatorsList.then(function (response) {
			if(response.data !== false){
				$scope.operatorsList = response.data.data;
				$scope.filterData()
			}
			else{
				$scope.operatorsList = false;
			}
		})

	}
	$scope.createOperatorsTable();

	/**
	* Function for filtering by category operators list
	*/
	$scope.filterByCategorySelect = function(categoryName){
		$scope.filterBy.name = categoryName;
	}

	$scope.orderByColumn = 'firstname';
	$scope.orderByDirection = true;

	/**
	* Function for sorting by column and direction the operators list
	*/
	$scope.sortBy = function(columnName){
		if($scope.orderByColumn == columnName){
			$scope.orderByDirection = !$scope.orderByDirection
		}else{
			$scope.orderByColumn = columnName;
			$scope.orderByDirection = true;
		}
	}

	/**
	* Function for checking of the operators table is ordered by
	*/
	$scope.isOrderedBy = function(columnName){
		return($scope.orderByColumn === columnName);
	}

	/**
	* Function for displaying order by arrows in operators table
	*/
	$scope.showOrderArrow = function(){
		return !$scope.orderByDirection;
	}

	/**
	* Function for deleting one operator in confirm box(callback)
	*/
	$scope.deleteOperator = function(operatorUsername, categoryId, supportLineId){

		var options = {};
		confirmModal.open(options, 'Are you sure you want to delete this operator?', function(){
			data = {
				operatorUsername: operatorUsername,
				categoryId: categoryId,
				supportLineId: supportLineId
			}
			var operatorsList = ajaxLoader.makeRequest('POST','/app_dev.php/ajaxDeleteOperator', data);
			operatorsList.then(function (response) {
				$scope.createOperatorsTable();
				var message = 'Operator Removed';
				$scope.$parent.successAlert(message, 'success');
			},function(response){
				var message = 'Connection error operator not deleted';
				$scope.$parent.successAlert(message, 'danger');
				$log.error(response)
			})
		});
	}

	/**
	* Function for counting records in operators table
	*/
	$scope.countRecords = function(total, currentPage, limit){
		$scope.begin = currentPage * limit - limit;
		$scope.end = currentPage * limit ;
		if($scope.begin === 0 && $scope.totalRecords !== 0) $scope.begin = 1;
		if ($scope.end > total){
			$scope.end = total;
		}
	}

	/**
	* Function for setting first page in operators list
	*/
	$scope.setFirstPage = function(){
		$scope.currentPage = 1;
	}

}])
;angular.module('helpdeskModule').controller('UsersController', ['$scope', '$http', '$log', '$timeout', '$location','$routeParams', 'ajaxLoader','DTOptionsBuilder', 'DTColumnBuilder', 'Flash', '$compile', 'confirmModal',  function ($scope, $http, $log, $timeout, $location, $routeParams, ajaxLoader, DTOptionsBuilder, DTColumnBuilder, Flash, $compile, confirmModal) {

	//        authentication.auth()

	/**
	* Unit name filter
	*/

	$scope.saveCompanyName = function(name){
		$scope.companyName = name;
		$scope.propagateTable($scope.userInUnit, $scope.userIsActive);
	}

	/**
	* Is Locked filter
	*/

	$scope.saveCompanyisActive = function(isActive){
		$scope.companyIsActive = isActive;
		$scope.propagateTable($scope.userInUnit, $scope.userIsActive);
	}

	/**
	* Ajax data dipslaying in datatable
	*/

	$scope.propagateTable = function(name, active){

		var startData = {
			'userInUnit': name,
			'isActive': active
		}
		$scope.dtOptions = DTOptionsBuilder.newOptions()
		.withOption('ajax', {
			url: '/app_dev.php/ajaxGetUsers',
			type: 'GET',
			data: startData
		})
		.withDataProp('data')
		.withPaginationType('full_numbers')
		.withBootstrap()
		.withOption('createdRow', function(row) {
			// Recompiling so we can bind Angular directive to the DT
			$compile(angular.element(row).contents())($scope);
		});
		$scope.dtColumns = [
			DTColumnBuilder.newColumn('id').withTitle('ID').withOption('width', '5%'),
			DTColumnBuilder.newColumn('username').withTitle('login'),
			DTColumnBuilder.newColumn('email').withTitle('email'),
			DTColumnBuilder.newColumn('firstname').withTitle('first name'),
			DTColumnBuilder.newColumn('surname').withTitle('surname'),
			DTColumnBuilder.newColumn('unit_id').withTitle('unit'),
			DTColumnBuilder.newColumn('locked').withTitle('is locked').renderWith(function(data, type, full) {
				if(data == 1){
					return '<span class="text-danger">YES</span>';
				}
				else{
					return '<span class="text-success">NO</span>'
				}
			}),
			DTColumnBuilder.newColumn('operations').withTitle('Operations').notSortable()
			.renderWith(function(data, type, full) {
				return '<a href="#/admin-edit_user:'+full.id+'"><i class="fa fa-pencil-square" aria-hidden="true"></i></a><a ng-click="deleteUser('+full.id+')"><i class="fa fa-trash" aria-hidden="true"></i></a>';
			})
		]
		$scope.dtInstance = {};

	}
	$scope.propagateTable($scope.userInUnit, $scope.userIsActive);

	/**
	* New user adding
	*/
	$scope.saveUser = function () {

		var data = {
			'login': $scope.addUserLogin,
			'email': $scope.addUserEmail,
			'firstName': $scope.addUserFirstName,
			'surName': $scope.addUserSureName,
			'city':$scope.addUserCity,
			'street':$scope.addUserStreet,
			'postCode':$scope.addUserPostCode,
			'unit':$scope.addUserUnit,
			'isActive':$scope.addUserIsActive
		}
		console.log($scope.addUserIsActive);
		var serviceResponse = ajaxLoader.makeRequest('POST','/app_dev.php/ajaxAddUser', data);
		serviceResponse.then(function (response) {

			$scope.data = response.data.code;
			(response.data.code == 1)? $scope.dtInstance.rerender():''
			$scope.addCategoryName = '';
			$scope.addCategoryIsActive = '';

			if(response.data.code == 1){
				$location.path('/admin-users');
				var message = 'User Added';
				$scope.$parent.successAlert(message, 'success');
			}
			else{
				$location.path('/admin-users');
				var message = 'User login already exists';
				$scope.$parent.successAlert(message, 'danger');
			}
		},function(response){
			$location.path('/admin-users');
			var message = 'Connection error user not changed';
			$scope.$parent.successAlert(message, 'danger');

			$log.error(response)
		})
	}

	/**
	* Deleting one user after accepting the confirm dialog
	*/
	$scope.deleteUser = function(id){
		var options = {};
		confirmModal.open(options, 'Are you sure you want to delete this user?', function(){
			var data = {
				id: id
			}
			var serviceResponse = ajaxLoader.makeRequest('POST','/app_dev.php/ajaxDeleteUser', data);
			serviceResponse.then(function (response) {
				$scope.data = response.data.code;
				(response.data.code == 1)? $scope.dtInstance.rerender():''
				$scope.addCategoryName = '';
				$scope.addCategoryIsActive = '';
				if(response.data.code == 1){
					var message = 'User Deleted';
					$scope.$parent.successAlert(message, 'success');
				}
				else{
					var message = 'User login not exists';
					$scope.$parent.successAlert(message, 'danger');
				}
			},function(response){
				var message = 'Connection error user not deleted';
				$scope.$parent.successAlert(message, 'danger');

				$log.error(response)
			})

		});

	}
	/**
	* User Editing
	*/

	$scope.updateUser = function(){
		var data = {
			'id':$scope.editUser.id,
			'username': $scope.editUser.login,
			'firstname': $scope.editUser.firstname,
			'surname': $scope.editUser.surname,
			'email': $scope.editUser.email,
			'city': $scope.editUser.city,
			'street': $scope.editUser.street,
			'postcode': $scope.editUser.postcode,
			'unit': $scope.editUser.unit,
			'islocked': $scope.editUser.islocked
		}
		var serviceResponse = ajaxLoader.makeRequest('POST','/app_dev.php/ajaxUpdateUser', data);
		serviceResponse.then(function (response) {

			$scope.data = response.data.code;
			$scope.message = (response.data.code == 1) ? 'User Edited' : response.data.message;
			$scope.myStyle = {
				visibility: 'visible',
				opacity: '1'
			}
			$scope.addCategoryName = '';
			$scope.addCategoryIsActive = '';
			if(response.data.code == 1){
				$location.path('/admin-users');
				var message = 'User Edited';
				$scope.$parent.successAlert(message, 'success');
			}
			else if(response.data.code == 3){
				var message = 'User email already exists';
				$scope.$parent.successAlert(message, 'danger');
			}
			else{
				var message = 'User not exists';
				$scope.$parent.successAlert(message, 'danger');
			}
		},function(response){
			var message = 'Connection error user not changed';
			$scope.$parent.successAlert(message, 'danger');

			$log.error(response)
		})
	}

	/**
	* Getting one user for update
	*/
	$scope.getOneUser = function(id){
		$scope.editUser = {};
		var id = id.replace(':','');
		var data = {
			'id': id
		}
		var serviceResponse3 = ajaxLoader.makeRequest('GET','/app_dev.php/ajaxGetOneUser/'+id, data);
		serviceResponse3.then(function (response) {
			if(response.data != false){
				$scope.editUser.id = response.data.id;
				$scope.editUser.login = response.data.login;
				$scope.editUser.email = response.data.email;
				$scope.editUser.basicEmail = response.data.email;
				$scope.editUser.firstname = response.data.firstname;
				$scope.editUser.surname = response.data.surname;
				$scope.editUser.city = response.data.city;
				$scope.editUser.street = response.data.street;
				$scope.editUser.postcode = response.data.postcode;
				$scope.editUser.unit = response.data.unit;
				$scope.editUser.islocked = response.data.locked;

				$scope.editUser.loginNoChange = response.data.login;
				$scope.editUser.emailNoChange = response.data.email;
				$scope.editUser.firstnameNoChange = response.data.firstname;
				$scope.editUser.surnameNoChange = response.data.surname;
				$scope.editUser.cityNoChange = response.data.city;
				$scope.editUser.streetNoChange = response.data.street;
				$scope.editUser.postcodeNoChange = response.data.postcode;
				$scope.editUser.unitNoChange = response.data.unit;
				$scope.editUser.islockedNoChange = response.data.locked;

			}
			else{
				$location.path('/admin-users');
				var message = 'User not exists';
				$scope.$parent.successAlert(message, 'danger');
			}
		})
	}

	if($routeParams.user_id){
		$scope.getOneUser($routeParams.user_id)
	}

	/**
	* Checking if the user is active
	*/
	$scope.checkIsActive = function(is_active){
		if(is_active === 1){ return true } else{ return false};
	}

}]);
;/**
* Directive for validating email change for user. User can not change email to one existing in database
*/

angular.module('helpdeskModule').directive('emailAvailable',['$http','$q', function($http, $q) {

	return {
		restrict: 'A',
		require: 'ngModel',

		link: function(scope, element, attrs, ngModel) {
			if(element[0].name === 'editUserEmail'){
				var oldEmail = scope.editUser.emailNoChange;
			}
			else{
				var oldEmail = null;
			}
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
;/**
* Service created for ajax calls
*/

angular.module('helpdeskModule').factory('ajaxLoader', ['$http', function ($http) {

	var _makeRequest = function(method,url,data){
		var headers = {
			"X-Requested-With": "XMLHttpRequest"
		};
		if(method === 'POST'){
			return $http({method:method,url:url, headers:headers, data:data})
		}else if (method === 'GET'){
			return $http({method:method,url:url, headers:headers, params:data})
		}
	}
	return {
		makeRequest : _makeRequest
	}
}])

/**
* Service used to autheticate user..
*/

angular.module('helpdeskModule').factory('authentication', ['$location', 'ajaxLoader', function ($location, ajaxLoader) {

	var _auth = function(user){
		var authenticated = false;
		if(user.roles){
			for(var i = 0; i < user.roles.length ; i++){
				if (user.roles[i] === 'ROLE_ADMIN'){
					var authenticated = true;
				}
			}
			if(!authenticated){
				$location.path('/login');
			}
		}
	};

	var _getUserData = function(){
		var data = {}
		return ajaxLoader.makeRequest('GET','/app_dev.php/getAjaxUserData', data);
	}
	return {
		auth : _auth,
		getUserData: _getUserData
	};
}])

/**
* Service used to create confirm modals..
*/

angular.module('helpdeskModule').factory('confirmModal', ['$uibModal', function ($uibModal) {

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
			size:'md'
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
;
(function () {

	/**
	* Filter for pagination in table
	*/

	angular.module('helpdeskModule').filter('pagination', function(){
		return function(value, currentPage, limit){
			var begin = currentPage * limit - limit;
			var end = currentPage * limit ;
			filteredValue = value.slice(begin,end);
			return filteredValue;
		}
	})

	/**
	* Filter for counting records in table
	*/

	angular.module('helpdeskModule').filter('countRecords', function(){
		return function(value){
			filteredRecords = value.length;
			return filteredRecords;
		}
	})
})();
