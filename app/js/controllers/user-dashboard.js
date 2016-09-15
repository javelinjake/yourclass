function UserDashboardCtrl($http, $rootScope, $log, $filter, Upload, $timeout, $state) {
  'ngInject';

  // ViewModel
  const vm = this;

  // Get list of listings from user
  $http.get($rootScope.apiUrl + 'classes/list',  {params: {'_teacherId': 200}})
    .then(function successCallback(response) {
      vm.userListings = response.data.data;

      // Set page rendered to true after content loaded
      //$rootScope.pageRendered = true;
    }, function errorCallback(response) {
    });

}

export default {
  name: 'UserDashboardCtrl',
  fn: UserDashboardCtrl
};
