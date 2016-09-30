function searching($rootScope, $http, $log, $q, $filter) {
  'ngInject';


  /* Helper functions */
  var SearchItem = function(element) {
    this.price = parseFloat(element.price) ? parseFloat(element.price).toFixed(2) : 'free';
    this.title = element.title || 'No set title yet';
    this.venue = element.venue || 'No set location yet';
    this.rating = parseFloat(element.rating) * 2;
    this.teacher = $filter('capitalize')(element.teacher.profile.firstName) + ' ' + $filter('capitalize')(element.teacher.profile.lastName);
    this.spotsBooked = element.bookings.length || 0;
    // this.spotsLeft = (time && parseInt(time.spots)) || 0;

    // var dateString = (element.dates[0] && element.dates[0].classDate) || false;
    // var timeStart  = (element.dates[0] && element.dates[0].times[0] && element.dates[0].times[0].startTime) || '00:00:00';
    // var timeEnd    = (element.dates[0] && element.dates[0].times[0] && element.dates[0].times[0].endTime) || '00:00:00';

    // this.dateStart = dateString ? new Date(dateString + ' ' + timeStart) : undefined;
    // this.dateEnd = dateString ? new Date(dateString + ' ' + timeEnd) : undefined;
  };


  // var requestedCat = $stateParams.searchCategory,
  //     requestedLoc = $location.search().location;

  // var requestedCatID = undefined,
  //     requestedLocID = undefined;

  // var defaultCatImage = 'background-image: url(/images/outside-yoga.jpg)';
  // var requestedCatImage = undefined; // Default value


  //   if (requestedCat) {
  //   categories.getCategoryID(requestedCat).then(function(response) {
  //     requestedCatID = response;
  //     console.log(requestedCatID);
  //   });

  //   /* Heading Category image */
  //   categories.getCategoryImage(requestedCat).then(function(response) {
  //     // Update background to a new value:
  //     if (response.length > 0) {
  //       requestedCatImage = $rootScope.imageUrl + response;
  //       vm.heading.image = 'background-image: url(' + requestedCatImage + ')';
  //     }
  //   }, function() {
  //     // Update background to a default value:
  //     if (response.length > 0) {
  //       requestedCatImage = undefined;
  //       vm.heading.image = defaultCatImage;
  //     }
  //   });
  // }
  // if (requestedLoc) {
  //   requestedLocID = locations.getLocationID(requestedLoc);
  // }

  var requestURL = $rootScope.apiUrl + 'classes/list';

  // Get classes list: not filtered yet
  var requestData = function(url) {
    var deferred = $q.defer();

    $http.get(url).then(function successCallback(response) {
        var data = angular.fromJson(response.data).data;
            deferred.resolve(data);

        // Console success message:
        // $log.info('success' + response);
      }, function errorCallback(response) {
        // Console error message:
        // $log.error('error' + response);
      });

    return deferred.promise;
  };


  this.getResults = function() {
    return requestData(requestURL).then(function(data) {
      var dataArray = [];
      
      data.forEach(function(element, i, arr) {
        var item = new SearchItem(element);
        dataArray.push(item);
      });

      return dataArray;
    });
  };




  // Category & Location
  this.search = {
    category: null,
    location: null
  };

  this.setCategory = function(category) {
    this.search.category = category ? category : null;
  };
  this.setLocation = function(location) {
    this.search.location = location ? location : null;
  };

  this.getCategory = function() {
    return this.search.category;
  };
  this.getLocation = function() {
    return this.search.location;
  };




  // Filters
  // Filter: Price variables
  var priceMin   = 0,
      priceMax   = 850,
      priceFloor = 0,
      priceCeil  = 1000;

  this.filter = {
    price: {
      floor: priceFloor,
      start: priceMin,
      end:   priceMax,
      ceil:  priceCeil
    },
    rating: 3,
    date: false,
    distance: null, // gets an { value: '', text: '' }
    size: null // gets an { value: '', text: '' }
  };

}

export default {
  name: 'searching',
  fn: searching
};
