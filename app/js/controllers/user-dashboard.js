function UserDashboardCtrl($http, $rootScope, $log) {
  'ngInject';

  // ViewModel
  const vm = this;

  // Lets wrap everything in here and wait for the users data to be loaded
  $rootScope.waitForData.promise.then(function() {

    // Get list of listings from user
    $http.get($rootScope.apiUrl + 'classes/list',  {params: {'_teacherId': $rootScope.userData.id}})
      .then(function successCallback(response) {
        vm.userListings = response.data.data;
      });

  });

}

export default {
  name: 'UserDashboardCtrl',
  fn: UserDashboardCtrl
};
