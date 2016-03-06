

function userDashboardCtrl($http, $rootScope, $log) {
	'ngInject';

	// ViewModel
	const vm = this;

	$log.info(vm.profileName);

}

export default {
	name: 'userDashboardCtrl',
	fn: userDashboardCtrl
};
