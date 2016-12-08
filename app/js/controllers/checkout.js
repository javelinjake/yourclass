

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


  /* Result */
  var result = {
    studentId: savedBookingData.user.id,
    classId: savedBookingData.class.id,
    dateId: savedBookingData.booking.dateId,
    timeId: savedBookingData.booking.timeId,
    students: null,
    billing: null,
    card: null
  };


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
    click: function() {
      this.submitted = true;
    },
    submit: function() {
      $log.info('Confirm "Details" step.');

      // Increase step
      vm.step = 1;

      // Mark stage as completed and unlock next step (payment)
      this.status = true;
      vm.payment.disabled = false;

      // (Save list of students data into cookies)

      // Add students list into result Object
      result.students = this.students;
      $log.warn(result);
    },
    submitted: false,
    disabled: false, // According to the task "details" are always enabled
    status: false
  };
  // (Check cookies for the saved payment details before)
  vm.payment = {
    billing: {
      firstName: null,
      lastName: null,
      address_1: null,
      address_2: null,
      suburb: null,
      state: null,
      postcode: null
    },
    card: {
      number: null,
      start: null,
      expiry: null,
      cvc: null,
      save: false,
      agreement: false
    },
    click: function() {
      this.submitted = true;
    },
    submit: function(flag_valid) {
      // On submission required checbox is ignored
      // Chek is Form valid
      console.log(flag_valid);
      if (!flag_valid) { return false; }

      $log.info('Confirm "Payment" step.');

      // Increase step
      vm.step = 2;

      // Mark stage as completed and unlock next step (confirmation)
      // this.disabled = true;
      this.status = true;
      vm.confirmation.disabled = false;

      // (Save payment data into cookies)

      // Add billing and card details into result Object
      result.billing = this.billing;
      result.card = this.card;
      $log.warn(result);
    },
    submitted: false,
    disabled: true,
    status: false
  };
  vm.confirmation = {
    click: function() {
      this.submitted = true;
    },
    submit: function() {
      $log.info('Confirm "Confirmation" step.');

      // Increase step
      vm.step = 3;

      // Mark stage as completed and unlock next step (confirmation)
      // this.disabled = true;
      this.status = true;
    },
    submitted: false,
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
