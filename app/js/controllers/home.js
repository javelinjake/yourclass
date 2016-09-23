function HomeCtrl($http, $rootScope, $log, $uibModal) {

  'ngInject';

  // ViewModel
  const vm = this;

  vm.aboutModal = function(size) {
    var modalInstance = $uibModal.open({
      templateUrl: 'modals/about.html',
      size: size
    });
  };

  $http.get($rootScope.apiUrl + 'classes/list')
    .then(function successCallback(response) {
      vm.classesList = response.data.data;
      $log.info('success' + response);

      // Set page rendered to true after content loaded
      $rootScope.pageRendered = true;
    }, function errorCallback(response) {
      $log.error('error' + response);
    });
}

export default {
  name: 'HomeCtrl',
  fn: HomeCtrl
};
