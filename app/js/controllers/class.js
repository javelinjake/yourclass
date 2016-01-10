'use strict';

function ClassCtrl($http, $rootScope, $scope, getClassId) {
	'ngInject';
	
	// ViewModel
	const vm = this;
	
	// Get Classes
	$http.get($rootScope.apiUrl + 'classes/one', {params: {_id: getClassId}}).success((data) => {
		vm.class = data.data;
	}).error((err, status) => {});

}

export default {
	name: 'ClassCtrl',
	fn: ClassCtrl
};