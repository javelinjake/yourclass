'use strict';

function UserCtrl($http, $rootScope) {
	'ngInject';

	// ViewModel
	const vm = this;

	vm.name = "Jake";
	vm.teacherEmail = "";

	// Get Users
	$http.get($rootScope.apiUrl + 'users/list').success((data) => {
		vm.teachers = data;
	}).error((err, status) => {});

vm.teacherEmailClick = function() {
	$http.get($rootScope.apiUrl + 'users/one?_email=' + vm.teacherEmail).success((data) => {
		vm.teachersTwo = data.data;
	}).error((err, status) => {});
}


}

export default {
	name: 'UserCtrl',
	fn: UserCtrl
};
