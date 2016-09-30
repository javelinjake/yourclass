function searching($rootScope, $http, $log, $q, $filter) {
  'ngInject';

  // Flag to detect the first upload (for search controller)
  this.isFirstLoad = true;


  /* Category */
  var searchParams = {
    category: null,
    location: null
  };


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


  var requestURLBase = $rootScope.apiUrl + 'classes/list';

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

  var requestURLForm = function() {
    var resultURL = requestURLBase;
    var resultParams = [];

    if (searchParams.category) {
      var parameter = '_categoryId=' + searchParams.category.id;
      resultParams.push(parameter);
    }
    if (searchParams.location) {
      // var parameter = '_locationId=' + searchParams.location.id;
      // resultParams.push(parameter);
    }

    if (searchParams.location) {}



    if (resultParams.length > 0) {
      resultURL += '?' + resultParams.join('&');;
    }

    return resultURL;
  };

  this.getResults = function() {
    var requestURL = requestURLForm();
    // $log.info('getResults');
    // $log.info(requestURL);
    // $log.info(searchParams);

    return requestData(requestURL).then(function(data) {
      var dataArray = [];

      data.forEach(function(element, i, arr) {
        var item = new SearchItem(element);
        dataArray.push(item);
      });

      return dataArray;
    });
  };




  this.setCategory = function(category) {
    searchParams.category = category ? category : null;
  };
  this.setLocation = function(location) {
    searchParams.location = location ? location : null;
  };

  this.getCategory = function() {
    return searchParams.category;
  };
  this.getLocation = function() {
    return searchParams.location;
  };




  // Filters
  this.filterParams = {
    price: {
      floor: 0,
      start: 0,
      end:   0,
      ceil:  0
    },
    rating: 0,
    date: null,
    distance: null, // gets an { value: '', text: '' }
    size: null // gets an { value: '', text: '' }
  };

}

export default {
  name: 'searching',
  fn: searching
};
