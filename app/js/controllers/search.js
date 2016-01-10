'use strict';

function SearchCtrl($http, $rootScope) {
	'ngInject';
	
	// ViewModel
	const vm = this;
	
	// Get Classes
	$http.get($rootScope.apiUrl + 'classes/list').success((data) => {
		vm.classesList = data.data;
	}).error((err, status) => {});
	
}

export default {
	name: 'SearchCtrl',
	fn: SearchCtrl
};