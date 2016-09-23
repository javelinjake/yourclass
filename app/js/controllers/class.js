

function ClassCtrl($http, $rootScope, $scope, getClassAlias) {
	'ngInject';

	// ViewModel
	const vm = this;

	// Get Classes
	$http.get($rootScope.apiUrl + 'classes/one', {params: {_alias: getClassAlias}}).success((data) => {
		vm.class = data.data;
	}).error((err, status) => {});

}

export default {
	name: 'ClassCtrl',
	fn: ClassCtrl
};
