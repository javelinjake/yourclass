function UserCtrl($http, $rootScope, $log, $filter, Upload, $timeout, $state) {
  'ngInject';

  // ViewModel
  const vm = this;

  vm.isCollapsed = true;

  // Get current logged in user
  $http.get($rootScope.apiUrl + 'users/one?_auth_key=' + $rootScope.authToken)
    .then(function successCallback(response) {

      // The scope output
      vm.userData = response.data.data;

      // Need to output birthday as accepted date
      //vm.newBirthday = new Date(vm.teachersTwo.profile.birthday)

      // Log the response
      $log.info('success', response);

    }, function errorCallback(response) {

      // Log the response
      $log.error('error', response);

    });

  // Edit user form
  vm.editDetails = function() {

    //vm.newBirthday = $filter('date')(vm.newBirthday, "yyyy-MM-dd");

    //$log.info(vm.newBirthday);

    var userDataEdit = {
      '_auth_key': $rootScope.authToken, // Authentication token of current user
      'firstName': vm.teachersTwo.profile.firstName,
      'lastName': vm.teachersTwo.profile.lastName,
      //'birthday': vm.newBirthday,
      'phone': vm.teachersTwo.profile.phone,
      'brief': vm.teachersTwo.profile.brief,
      'about': vm.teachersTwo.profile.about
    };

    $http.post($rootScope.apiUrl + 'users/update', userDataEdit)
      .then(function successCallback(response) {

        // Log the response
        $log.info('success', response);

      }, function errorCallback(response) {

        // Log the response
        $log.error('error', response);

      });

  }

  vm.uploadFiles = function(files, errFiles) {
    vm.files = files;
    vm.errFiles = errFiles;
    angular.forEach(files, function(file) {
      file.upload = Upload.upload({
        url: $rootScope.apiUrl + 'users/upload',
        data: {
          '_auth_key': $rootScope.authToken, // Authentication token of current user
          'file': file
        }
      });

      file.upload.then(function(response) {
        $timeout(function() {
          file.result = response.data;
          $state.reload();
        });
      }, function(response) {
        if (response.status > 0)
          vm.errorMsg = response.status + ': ' + response.data;
      }, function(evt) {
        file.progress = Math.min(100, parseInt(100.0 *
          evt.loaded / evt.total));
      });
    });
  }

}

export default {
  name: 'UserCtrl',
  fn: UserCtrl
};
