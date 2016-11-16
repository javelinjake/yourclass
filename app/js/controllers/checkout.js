

function CheckoutCtrl($http, $rootScope, $scope, $log, $cookies) {
  'ngInject';

  // ViewModel
  const vm = this;

  vm.pattern = {
    name: /[a-zA-Z]{4,}/,
    email: /\.{2,}@\..{2,}\.{1,}/,
    number: /[\d\(\)\-\+\s]{8,}/
  };

  console.warn("$cookies", $cookies.getAll());
}

export default {
  name: 'CheckoutCtrl',
  fn: CheckoutCtrl
};
