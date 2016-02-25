function MainCtrl($http, $rootScope, $uibModal, $log) {
	'use strict';
  'ngInject';

  // ViewModel
  const vm = this;

  // Get Users
  $http.get($rootScope.apiUrl + 'users/list').success((data) => {
    vm.userList = data.data;
  }).error((err, status) => {});

}

export default {
  name: 'MainCtrl',
  fn: MainCtrl
};
