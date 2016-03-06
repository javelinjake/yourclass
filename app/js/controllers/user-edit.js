function userEditCtrl($http, $rootScope, $log) {
	'ngInject';

	// ViewModel
	const vm = this;

vm.editDetailsSubmit = function() {

	var userData = {
		'_email': vm.Model.teachersTwo.email,
		'firstName': vm.firstname
	};

	$http.post($rootScope.apiUrl + 'users/update', userData)
	.then(function successCallback(response) {
		$log.info('success' + response);
	}, function errorCallback(response) {
		$log.error('error' + response);
	});

}

}

export default {
	name: 'userEditCtrl',
	fn: userEditCtrl
};
