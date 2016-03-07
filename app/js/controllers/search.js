function SearchCtrl($http, $rootScope, $log) {
  'ngInject';

  // ViewModel
  const vm = this;

  $http.get($rootScope.apiUrl + 'classes/list')
    .then(function successCallback(response) {
      vm.classesList = response.data.data;
      $log.info('success' + response);
    }, function errorCallback(response) {
      $log.error('error' + response);
    });

}

export default {
  name: 'SearchCtrl',
  fn: SearchCtrl
};
