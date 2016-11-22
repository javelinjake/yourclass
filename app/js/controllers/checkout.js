

function CheckoutCtrl($http, $rootScope, $scope, $log, $cookies, $location, $filter, $state, $stateParams) {
  'ngInject';

  // ViewModel
  const vm = this;


  /* Get booking saved data from cookies */
  var savedBookingData = $cookies.getObject('booking');

      // If booking data is empty redirect to the Index page
      if (!savedBookingData) { $state.go('Home'); return false; }


  /* Check saved data and update location search parameters */
  $location.search({
    'price': $filter('currency')(savedBookingData.price, '$'),
    'students': savedBookingData.friends + 1,
    'date': $filter('date')(savedBookingData.date.start, 'MM/dd/yyyy')
  });


  /* Common */
  vm.patterns = {
    name: /^[a-zA-Z\s\-\.]+$/,
    email: /^\.{2,}@\..{2,}\.{1,}$/,
    number: /^[\d\(\)\-\+\s]{6,}$/,
    creditcard: /^([\d]{4}\s?){4}$/,
    postcode: /^[\d]{4}$/,
    cvccode: /^[\d]{3}$/
  };


  /* Main Objects */
  vm.details = {
    booking: savedBookingData,
    user: $rootScope.userData,
    backlink: 'Class({classAlias: vm.booking.alias})',
    students: new Array(savedBookingData.friends + 1)
  };
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
  /*vm.booking = savedBookingData;
  vm.user = $rootScope.userData;
  vm.backlink = 'Class({classAlias: vm.booking.alias})';*/

  // Amount of students
  // vm.students = new Array(vm.booking.friends + 1);


  // Fill an array of students
  for (var i = 0; i < vm.details.students.length; i++) {
    vm.details.students[i] = {
      name: '',
      email: '',
      number: ''
    };
  }

  // Watch user data and update first student info in array of students
  $rootScope.$watch('userData', function(next, prev) {
    if (!next) { /*$state.go('Home');*/ return false; }

    vm.user = next;
    vm.details.students[0].id     = next.id || '';
    vm.details.students[0].name   = (next.profile.firstName || '') + ' ' + (next.profile.lastName || '');
    vm.details.students[0].email  = next.email || '';
    vm.details.students[0].number = next.profile.number || '';
  });
}

export default {
  name: 'CheckoutCtrl',
  fn: CheckoutCtrl
};
