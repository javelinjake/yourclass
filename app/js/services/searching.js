function searching($rootScope, $http, $log, $q, $filter) {
  'ngInject';

  // Flag to detect the first uploading (for search controller)
  this.isAvailable = false;


  /* SearchForm Data and Methods */

  // Category and Location:
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


  // Filters:
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

  this.getFilterPriceFloor = function() {
    return filterParams.price.floor;
  };
  this.getFilterPriceMin = function() {
    return filterParams.price.min;
  };
  this.getFilterPriceMax = function() {
    return filterParams.price.max;
  };
  this.getFilterPriceCeil = function() {
    return filterParams.price.ceil;
  };
  this.getFilterRating = function() {
    return filterParams.rating;
  };
  this.getFilterDate = function() {
    return filterParams.date;
  };
  this.getFilterDistance = function() {
    return filterParams.distance;
  };
  this.getFilterSize = function() {
    return filterParams.size;
  };


  // Sorting:
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

    /* Date and Time */
    if (element.dates[0]) {
      var nearestDate = element.dates[0].classDate || null;
      this.alldates = element.dates.length || 0;

      if (element.dates[0].times[0]) {
        var nearestTime = element.dates[0].times[0] || null;

        this.dateStart = new Date(nearestDate + ' ' + nearestTime.startTime);
        this.dateEnd   = new Date(nearestDate + ' ' + nearestTime.endTime);

        this.alltimes = element.dates.reduce(function(all, element, index, array) {
          all += element.times.length;
          return all;
        }, 0);
      } else {
        this.dateStart = new Date(nearestDate);
        this.dateEnd   = new Date(nearestDate);
        this.alltimes  = null;
      }
    } else {
      this.dateStart = null;
      this.dateEnd   = null;
      this.alldates  = null;
      this.alltimes  = null;
    }
  };

  var requestURLBase = $rootScope.apiUrl + 'classes/list';

  // Get classes list: not filtered
  var requestData = function(url) {
    var deferred = $q.defer();

    $http
      .get(url)
      .then(function successCallback(response) {
        var data = angular.fromJson(response.data).data;
            deferred.resolve(data);

        // $log.info('success' + response);
      }, function errorCallback(response) {
            deferred.resolve(undefined);

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
      var parameter = filterParams.rating == 1 ? '%7B%3E%3D%7Drating=0' : '%7B%3E%3D%7Drating=' + filterParams.rating/2;
      resultParams.push(parameter);
    }
    if (typeof filterParams.date !== null) { // Equal or more
      // Format: 2016-03-25
      // var date  = filterParams.date,
      //     year  = date.getFullYear(),
      //     month = ('0' + (date.getMonth() + 1)).slice(-2),
      //     day   = ('0' + date.getDate()).slice(-2);
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

    var requestURL = createRequestURL();

    return requestData(requestURL).then(function(data) {
      if (data === undefined) {
        return undefined;
      }

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
