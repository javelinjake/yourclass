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
    }, function errorCallback(response) {
    });

}

export default {
  name: 'HomeCtrl',
  fn: HomeCtrl
};
