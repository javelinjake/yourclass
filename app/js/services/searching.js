function searching($rootScope, $http, $log, $q, $filter) {
  'ngInject';

  // Flag to detect the first upload (for search controller)
  this.isFirstLoad = true;


  /* SearchForm Data and Methods */

  // Category and Location: used
  var searchParams = {
    category: null,
    location: null
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


  // Filters: not used
  var filterParams = {
    price: {
      floor: null,
      min:   null,
      max:   null,
      ceil:  null
    },
    rating: null,
    date: null,
    distance: null, // gets an { value: '', text: '' }
    size: null // gets an { value: '', text: '' }
  };

  // Sorting: used
  var sortParams = {
    sortby: null,
    selected: null
  };

  this.setSortType = function(type) {
    sortParams.sortby = type ? type : null;
  };
  this.setSortSelected = function(selected) {
    sortParams.selected = selected ? selected : null;
  };

  this.getSortType = function() {
    return sortParams.sortby;
  };
  this.getSortSelected = function() {
    return sortParams.selected;
  };


  $log.warn('Searching is loaded');


  /* Helper functions */
  var SearchItem = function(element) {
    this.alias = element.alias;
    this.price = parseFloat(element.price);

    this.title = element.title || 'No set title yet';
    this.venue = element.venue || 'No set location yet';
    this.distance = Math.floor(Math.random() * 10);

    this.rating = parseFloat(element.rating) * 2;
    this.reviews = element.reviews.length;

    this.size   = +element.size || 0;
    this.booked = element.bookings.length || 0;
    this.vacant = element.size - this.booked;

    this.category = element.category;
    this.image = (element.category && element.category.image && element.category.image.length > 0) ? 'background-image: url(' +  $rootScope.imageUrl + element.category.image + ')' : 'background-image: url(/images/outside-yoga.jpg)';

    this.teacher = $filter('capitalize')(element.teacher.profile.firstName) + ' ' + $filter('capitalize')(element.teacher.profile.lastName);

    // Need to add date and time: temporary solution is below
    this.dateStart = new Date();
    this.dateEnd = new Date();
    // When more time slots are available text next to time appears 'more available'
    this.times = new Array(Math.floor(Math.random() * 4));
  };


  var requestURLBase = $rootScope.apiUrl + 'classes/list';

  // Get classes list: not filtered
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

  var createRequestURL = function() {
    var resultURL = requestURLBase;
    var resultParams = [];

    /* Check Category and Location */
    if (searchParams.category) {
      var parameter = '_categoryId=' + searchParams.category.id;
      resultParams.push(parameter);
    }
    if (searchParams.location) {
      // var parameter = '_locationId=' + searchParams.location.id;
      // resultParams.push(parameter);
    }

    /* Check Filter Parameters */
    if (typeof filterParams.price.min !== null) { // Equal or more
      var parameter = '%7B%3E%3D%7Dprice=' + filterParams.price.min;
      resultParams.push(parameter);
    }
    if (typeof filterParams.price.max !== null) { // Equal or less
      var parameter = '%7B%3C%3D%7Dprice=' + filterParams.price.max;
      resultParams.push(parameter);
    }
    if (typeof filterParams.rating !== null) { // Equal or more
      // var parameter = 'rating=' + filterParams.rating;
      // resultParams.push(parameter);
    }
    if (typeof filterParams.date !== null) { // Equal or more
      // Format: 2016-03-25
      // var date  = filterParams.date,
      //     year  = date.getFullYear(),
      //     month = date.getMonth(),
      //     day   = date.getDate();
      // var parameter = '%7B%3E%3D%7DstartDate=' + year + '-' + month + '-' + day;
      // resultParams.push(parameter);
    }
    if (typeof filterParams.distance !== null) { // Equal or more
      // var parameter = ...;
      // resultParams.push(parameter);
    }
    if (typeof filterParams.size !== null && filterParams.size.value != 0) { // Equal or more
      var parameter = filterParams.size.value == 1 ? '_size=1' : '%7B%3E%3D%7Dsize=' + filterParams.size.value;
      resultParams.push(parameter);
    }

    /* Create URL */
    if (resultParams.length > 0) {
      resultURL += '?' + resultParams.join('&');;
    }

    return resultURL;
  };

  var updateFilterParams = function(parameters) {
    filterParams['price']['min'] = parameters['price']['min'];
    filterParams['price']['max'] = parameters['price']['max'];
    filterParams['rating']       = parameters['rating'];
    filterParams['date']         = parameters['date'];
    filterParams['distance']     = parameters['distance'];
    filterParams['size']         = parameters['size'];
  };


  this.getResults = function(parameters) {
    if (parameters) {
      updateFilterParams(parameters);
    }
    $log.warn(requestURL);
    var requestURL = createRequestURL();

    return requestData(requestURL).then(function(data) {
      var dataArray = [];

      data.forEach(function(element, i, arr) {
        var item = new SearchItem(element);
        dataArray.push(item);
      });

      return dataArray;
    });
  };
}

export default {
  name: 'searching',
  fn: searching
};
