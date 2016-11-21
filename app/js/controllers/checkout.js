

function CheckoutCtrl($http, $rootScope, $scope, $log, $cookies, $state, $stateParams) {
  'ngInject';

  // ViewModel
  const vm = this;


  /* Common */
  vm.patterns = {
    name: /^[a-zA-Z\s\-\.]+$/,
    email: /^\.{2,}@\..{2,}\.{1,}$/,
    number: /^[\d\(\)\-\+\s]{6,}$/,
    creditcard: /^([\d]{4}\s?){4}$/,
    postcode: /^[\d]{4}$/,
    cvccode: /^[\d]{3}$/
  };

  // vm.details = {};
  vm.payment = {
    billing: {
      firstName: '',
      lastName: '',
      address_1: '',
      address_2: '',
      suburb: '',
      state: '',
      postcode: ''
    },
    card: {
      number: '',
      start: '',
      expiry: '',
      cvc: '',
      save: false,
      agreement: false
    }
  };
  // vm.confirmation = {};


  /* Details */
  vm.booking = $cookies.getObject('booking');
  vm.user = $rootScope.userData;
  vm.backlink = 'Class({classAlias: vm.booking.alias})';

  // If booking data is empty redirect to the Index page
  if (!vm.booking) { $state.go('Home'); return false; }

  // Amount of students
  vm.students = new Array(vm.booking.friends + 1);

  // Create an array of students
  for (var i = 0; i < vm.students.length; i++) {
    vm.students[i] = {
      name: '',
      email: '',
      number: ''
    };
  }

  // Watch user data and update first student info in array of students
  $rootScope.$watch('userData', function(next, prev) {
    if (!next) { /*$state.go('Home');*/ return false; }

    vm.user = next;
    vm.students[0].id     = next.id || '';
    vm.students[0].name   = (next.profile.firstName || '') + ' ' + (next.profile.lastName || '');
    vm.students[0].email  = next.email || '';
    vm.students[0].number = next.profile.number || '';
  });
}

export default {
  name: 'CheckoutCtrl',
  fn: CheckoutCtrl
};
