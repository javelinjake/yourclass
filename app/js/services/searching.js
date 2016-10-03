function searching($rootScope, $http, $log, $q, $filter) {
  'ngInject';

  // Flag to detect the first upload (for search controller)
  this.isFirstLoad = true;


  /* SearchForm Data and Methods */
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


  // Filters: not used
  this.filterParams = {
    price: {
      floor: 0,
      min:   0,
      max:   0,
      ceil:  0
    },
    rating: 0,
    date: null,
    distance: null, // gets an { value: '', text: '' }
    size: null // gets an { value: '', text: '' }
  };

  this.sortParams = {
    sortby: '-price',
    selected: { value: 'rating',  text: 'Rating' }
  };

}

export default {
  name: 'searching',
  fn: searching
};
