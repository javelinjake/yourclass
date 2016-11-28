

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
  // (Check cookies for the saved student details before)
  vm.details = {
    class: savedBookingData.class,
    booking: savedBookingData.booking,
    user: savedBookingData.user,
    backlink: 'Class({classAlias: vm.booking.alias})',
    students: new Array(savedBookingData.booking.friends + 1),
    submit: function() {
      $log.info('Confirm "Details" step.');

      // Increase step
      vm.step = 1;

      // Mark stage as completed and unlock next step (payment)
      this.status = true;
      vm.payment.disabled = false;

      // (Save list of students data into cookies)
    },
    disabled: false, // According to the task "details" are always enabled
    status: false
  };
  // (Check cookies for the saved payment details before)
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
    },
    submit: function() {
      $log.info('Confirm "Payment" step.');

      // Increase step
      vm.step = 2;

      // Mark stage as completed and unlock next step (confirmation)
      this.status = true;
      // this.disabled = true;
      vm.confirmation.disabled = false;

      // (Save payment data into cookies)
    },
    disabled: true,
    status: false
  };
  vm.confirmation = {
    submit: function() {
      $log.info('Confirm "Confirmation" step.');

      // Increase step
      vm.step = 3;

      // Mark stage as completed and unlock next step (confirmation)
      this.status = true;
      // this.disabled = true;
    },
    disabled: true,
    status: false
  };


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
