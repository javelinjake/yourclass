

function ClassCtrl($http, $rootScope, $scope, $log, $cookies, getClassAlias) {
	'ngInject';

	// ViewModel
	const vm = this;

  var createBookingList = function(dates) {
    var list = [];

    // Return empty array if dates are empty
    if (!dates || dates.length === 0) return list;

    dates.forEach(function(date, i, a){
      if (date.times && date.times.length > 0) {
        date.times.forEach(function(time, i, a) {

          // Continue if time has available spots
          if (time.spotsLeft === 0) return false;

          list.push({
            dateId: date.id,
            timeId: time.id,
            date: {
              start: new Date(date.classDate + ' ' + time.startTime),
              end: new Date(date.classDate + ' ' + time.endTime)
            },
            size: time.spots,
            left: time.spotsLeft
          });

        });
      }
    });

    return list;
  };

	// Get Classes
  // OR use wuthout ?_auth_key=
	$http
    .get($rootScope.apiUrl + 'classes/one?_auth_key=' + $cookies.get('auth_key'), {params: {_alias: getClassAlias}})
    .success((response) => {
      // Create class data
  		vm.class = response.data;

      // Create list of dates for booking block
      vm.booking.list  = createBookingList(response.data.dates);

      // Check user data. update booking price
      vm.booking.price = $rootScope.userData && $rootScope.userData.roles[0].role === 'teacher' ? vm.class.price : vm.class.studentPrice;
  	})
    .error((err, status) => {});


  /**
   * BOOKING
   * -------
   * One item has: date, time, size and number of bookings
   *
   */
  /*  var bookingList = [
    {
      id: 1,
      date: {
        start: new Date('2016-08-15' + ' ' + '02:00:00'),
        end: new Date('2016-08-15' + ' ' + '03:00:00')
      },
      size: 10,
      left: 8
    },
    {
      id: 2,
      date: {
        start: new Date('2016-08-15' + ' ' + '02:00:00'),
        end: new Date('2016-08-15' + ' ' + '03:00:00')
      },
      size: 10,
      left: 8
    },
    {
      id: 3,
      date: {
        start: new Date('2016-08-15' + ' ' + '02:00:00'),
        end: new Date('2016-08-15' + ' ' + '03:00:00')
      },
      size: 10,
      left: 8
    },
    {
      id: 4,
      date: {
        start: new Date('2016-08-15' + ' ' + '02:00:00'),
        end: new Date('2016-08-15' + ' ' + '03:00:00')
      },
      size: 10,
      left: 8
    },
    {
      id: 5,
      date: {
        start: new Date('2016-08-15' + ' ' + '02:00:00'),
        end: new Date('2016-08-15' + ' ' + '03:00:00')
      },
      size: 10,
      left: 8
    },
    {
      id: 6,
      date: {
        start: new Date('2016-08-15' + ' ' + '02:00:00'),
        end: new Date('2016-08-15' + ' ' + '03:00:00')
      },
      size: 10,
      left: 8
    }
    ];*/

  vm.booking = {
    size: 0,
    spots: 0,
    price: 0,

    friends: {
      count: 21,
      less: function() {
        var count = this.count;
        this.count = count > 0 ? --count : 0;
      },
      more: function() {
        var count = this.count,
            limit = this.limit;
        this.count = count < limit ? ++count : limit;
      },
      limit: 0
    },

    list: [],
    selected: null, // an obj with properties

    view: {
      expanded: false,
      toggle: function() {
        this.expanded = !this.expanded;
      },
      limit: 5 // default value
    },

    submit: function() {
      this.error = this.selected === null;

      if (this.selected === null) {
        $log.error('Time slot is not selected.');
        return false;
      }

      $log.info('Submit booking...');
    },

    error: false
  };

  /* Watch Selected date and update Booking data */
  $scope.$watch('class.booking.selected', function(next, prev) {
    vm.booking.size  = next && next.size || 0;
    vm.booking.spots = next && next.left || 0;
    vm.booking.friends.limit = next && next.left > 0 ? next.left - 1 : 0;
    vm.booking.friends.count = vm.booking.friends.count > vm.booking.friends.limit ? vm.booking.friends.limit : vm.booking.friends.count;
    vm.booking.error = false;
  });

  /* Watch and check user data: teacher, student or user taht is not logged in */
  $rootScope.$watch('userData', function(next, prev) {
    // Update booking price. Price for student or user that is not logged in is 14% more than actual
    // Checks the response with class data from the promise
    if (!vm.class) return false;
    vm.booking.price = next.roles[0].role === 'teacher' ? vm.class.price : vm.class.studentPrice;
  });

}

export default {
	name: 'ClassCtrl',
	fn: ClassCtrl
};
