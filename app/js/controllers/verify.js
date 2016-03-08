function VerifyCtrl($http, $rootScope, $location) {
  
  'ngInject';

  // ViewModel
  const vm = this;

  var verificationData = $location.search().key;

	vm.verifySent = false;

  $http.get($rootScope.apiUrl + 'users/verificate?key=' + verificationData).success((data) => {
		vm.verifySent = true;

    if (data.result === 0) {
      vm.verified = false;
    } else {
      vm.verified = true;
    }
  }).error((err, status) => {
    vm.verifySent = true;
		vm.verified = false;
  });

}



export default {
  name: 'VerifyCtrl',
  fn: VerifyCtrl
};
