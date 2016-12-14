

function ClassCtrl($http, $rootScope, $scope, $log, $cookies, $location, $filter, getClassAlias, NgMap) {
	'ngInject';

	// ViewModel
	const vm = this;

	// TODO - API key from backend
	vm.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyAB8wR3v88fFkRABoERfV3bi3v3wPfvlYg";

	vm.rating = 4;

	// TODO - Images from API
	vm.images = [
	    {
	        title : 'This is amazing photo of nature',
	        alt : 'amazing nature photo',
	        url : '/images/eggs.jpg',
	    },
			{
	        title : 'This is amazing photo of nature',
	        alt : 'amazing nature photo',
	        url : '/images/eggs-2.jpg',
	    },
			{
	        title : 'This is amazing photo of nature',
	        alt : 'amazing nature photo',
	        url : '/images/eggs-3.jpg',
	    },
			{
	        title : 'This is amazing photo of nature',
	        alt : 'amazing nature photo',
	        url : '/images/eggs-3.jpg',
	    },
			{
	        title : 'This is amazing photo of nature',
	        alt : 'amazing nature photo',
	        url : '/images/eggs-2.jpg',
	    }
	];

  /* Get booking saved data from cookies */
  var savedBookingData = $cookies.getObject('booking');
  $log.warn('savedBookingData: ', savedBookingData);


  /* Additional functions */
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
  var createBookingObject = function(bookingData, userData) {
    var result = {
      class: {},
      booking: {},
      user: {}
    };

    // Class:
    result.class.id      = bookingData.class.id;
    result.class.title   = bookingData.class.title; // added that not to request class data again
    result.class.alias   = bookingData.class.alias; // added that not to request class data again
    result.class.teacher = bookingData.class.teacher; // added that not to request class data again
    result.class.venue   = bookingData.class.venue; // added that not to request class data again
    result.class.price   = bookingData.class.price; // added that not to request class data again
    result.class.image   = bookingData.class.image.length > 0 ? $rootScope.imageUrl + bookingData.class.image : ''; // added that not to request class data again

    // Booking
    result.booking.dateId  = bookingData.selected.dateId;
    result.booking.timeId  = bookingData.selected.timeId;
    result.booking.date    = bookingData.selected.date;
    result.booking.friends = bookingData.friends.count;

    // User
    result.user.id     = userData.id;
    result.user.name   = [userData.profile.firstName, userData.profile.lastName].join(' ');
    result.user.email  = userData.email;
    result.user.number = userData.profile.phone;

    return result;
  };


	/* Get Classes
   * OR use wuthout ?_auth_key= */
	$http
    .get($rootScope.apiUrl + 'classes/one?_auth_key=' + $cookies.get('auth_key'), {params: {_alias: getClassAlias}})
    .success((response) => {
      // Create class data
  		vm.class = response.data;

      // Update booking block with class ID, title and venue
      vm.booking.class.id      = vm.class.id || null;
      vm.booking.class.title   = vm.class.title || null;
      vm.booking.class.alias   = vm.class.alias || null;
      vm.booking.class.venue   = vm.class.venue || null;
      vm.booking.class.teacher = vm.class.teacher && vm.class.teacher.profile && (`${vm.class.teacher.profile.firstName} ${vm.class.teacher.profile.lastName}`) || null;
      vm.booking.class.image   = vm.class.photos && vm.class.photos[0] && vm.class.photos[0].src || vm.class.category && vm.class.category.image || '';

      // Create list of dates for booking block
      vm.booking.list = createBookingList(response.data.dates);

      // Check if there is booking data in the cookies and use it
      vm.booking.selected = (savedBookingData && vm.booking.list.filter(function(item) {
        return item.timeId === savedBookingData.booking.timeId;
      })[0]) || null;
      vm.booking.friends.count = vm.booking.selected !== null ? (savedBookingData && savedBookingData.booking.friends) : 0;

      // Check user data. update booking price
      vm.booking.class.price = $rootScope.userData && $rootScope.userData.roles[0].role === 'teacher' && vm.class.teacher.id === $rootScope.userData.id ? vm.class.price : vm.class.studentPrice;
  	})
    .error((err, status) => {});


  /**
   * BOOKING
   * -------
   * One item has: date, time, size and number of bookings
   */
  vm.booking = {
    class: {
      id: null,
      title: null,
      alias: null,
      venue: null,
      teacher: null,
      image: null,
      size: 0,
      spots: 0,
      price: 0
    },

    friends: {
      count: 0,
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
      // Show error message if time slot is not selected
      this.error = this.selected === null;

      // Prevent submission if time slot is not selected
      if (this.error) {
        $log.error('Time slot is not selected.');
        return false;
      }

      // Check user data. If user is not logged in, ask to sign in, otherwise go to the checkout page
      if (!$rootScope.userLoggedIn) {
        $log.error('User hasn\'t logged in.');
        $rootScope.LogInModal('sm');
      }
      else {
        // Save booked data into cookies
        $log.warn($rootScope.userData);
        $cookies.putObject('booking', createBookingObject(this, $rootScope.userData));

        // Change the location, show some booked data in the search string
        $location.search({
          'price': $filter('currency')(this.class.price, '$'),
          'students': this.friends.count + 1,
          'date': $filter('date')(this.selected.date.start, 'MM/dd/yyyy')
        });
        $location.path($location.path() + '/booking');
      }
    },

    error: false
  };




  /* Watch Selected date and update Booking data */
  $scope.$watch('class.booking.selected', function(next, prev) {
    vm.booking.class.size  = next && next.size || 0;
    vm.booking.class.spots = next && next.left || 0;
    vm.booking.friends.limit = next && next.left > 0 ? next.left - 1 : 0;
    vm.booking.friends.count = vm.booking.friends.count > vm.booking.friends.limit ? vm.booking.friends.limit : vm.booking.friends.count;
    vm.booking.error = false;
  });

  /* Watch and check user data: teacher, student or user taht is not logged in */
  $rootScope.$watch('userData', function(next, prev) {
    // Update booking price. Price for student or user that is not logged in is 14% more than actual
    // Checks the response with class data from the promise
    if (!vm.class) return false;
    vm.booking.class.price = next.roles[0].role === 'teacher' && vm.class.teacher.id === $rootScope.userData.id ? vm.class.price : vm.class.studentPrice;
  });
}

export default {
	name: 'ClassCtrl',
	fn: ClassCtrl
};
