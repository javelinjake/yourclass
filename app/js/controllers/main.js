'use strict';

function MainCtrl($http, $rootScope) {
	'ngInject';

	// ViewModel
	const vm = this;
  
	// Create user
	vm.sendUser = function() {
	  
		var userData = {
			'username': vm.username,
			'firstName': vm.firstname,
			'lastName': vm.lastname,
			'email': vm.email,
			'password': vm.password,
			'role': vm.role
		};
		  
		$http.post($rootScope.apiUrl + 'users/create', userData).success((data) => {
			if (data.result === 0) {
				vm.formDone = false;
			} else {
				vm.formDone = true;
			}
		  
			vm.formSent = true;
		}).error((err, status) => {
			vm.formSent = true;
		});
	}
	
	// Get Users
	$http.get($rootScope.apiUrl + 'users/list').success((data) => {
		vm.userList = data.data;
	}).error((err, status) => {});

}

export default {
	name: 'MainCtrl',
	fn: MainCtrl
};