

function CheckoutCtrl($http, $rootScope, $scope, $log, $cookies) {
  'ngInject';

  // ViewModel
  const vm = this;

  vm.patterns = {
    name: /[a-zA-Z]{4,}/,
    email: /\.{2,}@\..{2,}\.{1,}/,
    number: /[\d\(\)\-\+\s]{8,}/
  };

  vm.details = {};
  vm.payment = {};


  /* Details */
  vm.booking = $cookies.getObject('booking');

  console.warn("$cookies", $cookies.getAll());
}

export default {
  name: 'CheckoutCtrl',
  fn: CheckoutCtrl
};
