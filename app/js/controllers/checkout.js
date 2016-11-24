

function CheckoutCtrl($http, $rootScope, $scope, $log, $cookies, $location, $filter, $state, $stateParams) {
  'ngInject';

  // ViewModel
  const vm = this;


  /* Check if user is known and redirect to the home page if not */
  // if (!$rootScope.userLoggedIn) { $state.go('Home'); return false; }


  /* Get booking saved data from cookies */
  var savedBookingData = $cookies.getObject('booking');
  $log.warn('savedBookingData', savedBookingData);

      // If booking data is empty redirect to the Index page
      if (!savedBookingData) { $state.go('Home'); return false; }


  /* Check saved data and update location search parameters */
  $location.search({
    'price': $filter('currency')(savedBookingData.class.price, '$'),
    'students': savedBookingData.booking.friends + 1,
    'date': $filter('date')(savedBookingData.booking.date.start, 'MM/dd/yyyy')
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
  vm.step = 0;


  /* Main Objects */
  vm.details = {
    class: savedBookingData.class,
    booking: savedBookingData.booking,
    user: savedBookingData.user,
    backlink: 'Class({classAlias: vm.booking.alias})',
    students: new Array(savedBookingData.booking.friends + 1),
    submit: function() {
      vm.step = 1;
      $log.info('Confirm details.');
    }
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


  // Fill an array of students
  for (var i = 0; i < vm.details.students.length; i++) {
    if (i === 0) {
      vm.details.students[i] = {
        name: vm.details.user.name,
        email: vm.details.user.email,
        number: vm.details.user.number
      };
    }
    else {
      vm.details.students[i] = {
        name: '',
        email: '',
        number: ''
      };
    }
  }
}

export default {
  name: 'CheckoutCtrl',
  fn: CheckoutCtrl
};
