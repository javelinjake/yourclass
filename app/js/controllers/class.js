

function ClassCtrl($http, $rootScope, $scope, $log, getClassAlias) {
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
	$http
    .get($rootScope.apiUrl + 'classes/one', {params: {_alias: getClassAlias}})
    .success((response) => {
  		vm.class = response.data;

      // Update booking price and create list of dates
      vm.booking.price = vm.class.price;
      vm.booking.list = createBookingList(response.data.dates);
  	})
    .error((err, status) => {});


  /**
   * BOOKING
   * -------
   * One item has: date, time, size and number of bookings
   *
   */
  var bookingList = [
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
  ];

  vm.booking = {
    spots: 0,

    friends: {
      count: 21,
      less: function() {
        var count = vm.booking.friends.count;
        vm.booking.friends.count = count > 0 ? --count : 0;
      },
      more: function() {
        var count = vm.booking.friends.count,
            limit = vm.booking.friends.limit;
        vm.booking.friends.count = count < limit ? ++count : limit;
      },
      limit: 0
    },

    list: [],

    price: 0,

    selected: null, // an obj with properties

    view: {
      expanded: false,
      toggle: function() {
        vm.booking.view.expanded = !vm.booking.view.expanded;
      },
      limit: 5 // default value
    },

    submit: function() {
      console.log('submit');

      vm.booking.error = vm.booking.selected === null;
    },

    error: false
  };

  /* Watch Selected date and update Booking data */
  $scope.$watch('class.booking.selected', function(next, prev) {
    vm.booking.spots = next && next.left || 0;
    vm.booking.friends.limit = next && next.left > 0 ? next.left - 1 : 0;
    vm.booking.friends.count = vm.booking.friends.count > vm.booking.friends.limit ? vm.booking.friends.limit : vm.booking.friends.count;
    vm.booking.error = false;
  });

}

export default {
	name: 'ClassCtrl',
	fn: ClassCtrl
};
