function SearchCtrl($http, $rootScope, $log) {
  'ngInject';

  // ViewModel
  const vm = this;


  // At the moment I am just calling all of the classes, we will need to have pagination (20 per page)
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
