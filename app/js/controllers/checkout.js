

function CheckoutCtrl($http, $rootScope, $scope, $log, $cookies, $state, $stateParams) {
  'ngInject';

  // ViewModel
  const vm = this;

  console.warn("$cookies", $cookies.getAll());

  /* Common */
  vm.patterns = {
    name: /^[a-zA-Z\s\-\.]+$/,
    email: /^\.{2,}@\..{2,}\.{1,}$/,
    number: /^[\d\(\)\-\+\s]{6,}$/
  };

  vm.details = {};
  vm.payment = {};


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
      name: null,
      email: null,
      number: null
    };
  }

  // Watch user data and update first student info in array of students
  $rootScope.$watch('userData', function(next, prev) {
    if (!next) { /*$state.go('Home');*/ return false; }

    vm.user = next;
    vm.students[0].id     = next.id || null;
    vm.students[0].name   = (next.profile.firstName || null) + ' ' + (next.profile.lastName || null);
    vm.students[0].email  = next.email || null;
    vm.students[0].number = next.profile.number || null;
  });
}

export default {
  name: 'CheckoutCtrl',
  fn: CheckoutCtrl
};
