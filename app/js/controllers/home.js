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

  vm.simpleLogin = function() {

    var LogInData = {
      'email': 'jakepeterlewis@gmail.com',
      'password': 'saints'
    };

    var config = {
        headers : {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    var transform = {
      transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
      }
    }

    $http.post('http://dev.yourclass.co/web/rest/users/login', LogInData)
        .then(function successCallback(response) {
          // Log the response
          $log.info('Success: ', response);
        }, function errorCallback(response) {
          // Log the response
          $log.error('Error: ', response);
        });

  }

}

export default {
  name: 'HomeCtrl',
  fn: HomeCtrl
};
