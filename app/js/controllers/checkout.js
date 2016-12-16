

function CheckoutCtrl($http, $rootScope, $scope, $log, $cookies, $location, $filter, $state, $stateParams) {
  'ngInject';

  // ViewModel
  const vm = this;


  /* Check if user is known and redirect to the home page if not */
  // if (!$rootScope.userLoggedIn) { $state.go('Home'); return false; }


  /* Get booking saved data from cookies */
  var savedBookingData = $cookies.getObject('booking');
  // $log.warn('savedBookingData: ', savedBookingData);

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
  vm.errors = [];


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

  var sendResult = function(result, onSuccessCallback, onErrorCallback) {
    $log.info(result);

    $http
      .post($rootScope.apiUrl + 'students/book?_auth_key=' + $cookies.get('auth_key'), result)
      .then(function(response) {
        $log.info('Payment success');
        $log.warn('Response: ', response);

        if (response.data.result) {
          vm.errors.length = 0;
          onSuccessCallback && onSuccessCallback();
          $cookies.remove('booking');
        }
        else {
          vm.errors = response.data.errors;
          onErrorCallback && onErrorCallback();
        }
      }, function() {
        $log.info('Payment error');
        vm.errors = ['An error occurred. Please reload the page or try to book another class.'];
        onErrorCallback && onErrorCallback();
      });
  };


  /* Main Objects */
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
      result.students = this.students;

      $log.info('Price: ', this.class.price, !!this.class.price);

      if (!this.class.price) {
        /* Send data */
        vm.details.loader = true;
        sendResult(result,
          function() {
            vm.step = 2;

            // Mark stage as completed and unlock next step (confirmation)
            vm.details.disabled = true;
            vm.details.status = true;
            vm.details.loader = false;
            vm.confirmation.disabled = false;
          },
          function() {
            vm.details.loader = false;
          });
        /* Send data End */
      } else {
        vm.step = 1;

        // Mark stage as completed and unlock next step (payment)
        this.status = true;
        vm.payment.disabled = false;
      }
    },
    submitted: false,
    disabled: false, // According to the task "details" are always enabled
    loader: false,
    status: false
  };
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
      // On submission required checkbox is ignored
      // Check is Form valid
      if (!flag_valid) { return false; }

      $log.info('Confirm "Payment" step.');
      result.billing = this.billing;
      result.card = this.card;

      /* Send data */
      vm.payment.loader = true;
      sendResult(result,
        function() {
          vm.step = 2;

          // Mark stage as completed and unlock next step (confirmation)
          vm.payment.disabled = true;
          vm.payment.status = true;
          vm.payment.loader = false;
          vm.details.disabled = true;
          vm.confirmation.disabled = false;
        },
        function() {
          vm.payment.loader = false;
        });
      /* Send data End */
    },
    submitted: false,
    disabled: true,
    loader: false,
    status: false
  };
  vm.confirmation = {
    disabled: true
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
