function UserDashboardCtrl($http, $rootScope, $log, $filter, Upload, $timeout, $state) {
  'ngInject';

  // ViewModel
  const vm = this;

  // Get list of listings from user
  $http.get($rootScope.apiUrl + 'classes/list',  {params: {'_teacherId': $rootScope.userData.id}})
    .then(function successCallback(response) {
      vm.userListings = response.data.data;
    }, function errorCallback(response) {
    });

}

export default {
  name: 'UserDashboardCtrl',
  fn: UserDashboardCtrl
};
