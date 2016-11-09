

function ClassCtrl($http, $rootScope, $scope, $log, getClassAlias) {
	'ngInject';

	// ViewModel
	const vm = this;

	// Get Classes
	$http.get($rootScope.apiUrl + 'classes/one', {params: {_alias: getClassAlias}}).success((data) => {
		vm.class = data.data;

    // Update booking price
    vm.booking.price = vm.class.price;
	}).error((err, status) => {});


  /**
   * BOOKING
   * -------
   * One item has: date, time, size and number of bookings
   *
   */
  var bookingData = [
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
  $log.info(bookingData);

  vm.booking = {
    spots: 6,

    friends: {
      count: 0,
      less: function() {
        var count = vm.booking.friends.count;
        vm.booking.friends.count = count > 0 ? --count : 0;
      },
      more: function() {
        var count = vm.booking.friends.count,
            limit = vm.booking.friends.limit;
        vm.booking.friends.count = count < limit ? ++count : limit;
      },
      limit: 5
    },

    list: bookingData, // TEMP

    price: 0,

    select: function(e) {
      console.log(arguments);
    },
    selected: null, // an obj with properties

    view: {
      expanded: false,
      toggle: function() {
        vm.booking.view.expanded = !vm.booking.view.expanded;
      },
      limit: 5
    },

    submit: function() {
      console.log('submit');

      if (vm.booking.selected.length === 0) {
        vm.booking.error = true;
      } else {
        vm.booking.error = false;
      }
    },

    error: false
  };

  /* Watch Selected date and update Booking data */
  $scope.$watch('class.booking.selected', function(next, prev) {
    vm.booking.spots = next.left || 0;
    vm.booking.friends.limit = next.left - 1 || 0;
  });

}

export default {
	name: 'ClassCtrl',
	fn: ClassCtrl
};
