function SearchCtrl($http, $rootScope, $scope, $log, $timeout) {
  'ngInject';

  // ViewModel
  const vm = this;

  /* Helper functions */
  var SearchItem = function(element) {
    this.price = element.price || 'free';
    this.title = element.title || 'No set title yet';
    this.location = element.venue || 'No set location yet';
    this.rating = parseFloat(element.rating) * 2;
    this.teacher = element.teacher.profile.firstName + element.teacher.profile.lastName;

    this.spotsBooked = element.bookings.length || 0;
    // this.spotsLeft = (time && parseInt(time.spots)) || 0;

    // var dateString = (element.dates[0] && element.dates[0].classDate) || false;
    // var timeStart  = (element.dates[0] && element.dates[0].times[0] && element.dates[0].times[0].startTime) || '00:00:00';
    // var timeEnd    = (element.dates[0] && element.dates[0].times[0] && element.dates[0].times[0].endTime) || '00:00:00';

    // this.dateStart = dateString ? new Date(dateString + ' ' + timeStart) : undefined;
    // this.dateEnd = dateString ? new Date(dateString + ' ' + timeEnd) : undefined;
  };
  var sliceSearchResults = function(classesList, startIndex, endIndex) {
    if (!classesList || classesList.length == 0) return [];

    var slicedList = classesList.slice(startIndex, endIndex);
    return slicedList;
  };

  // Get classes list: not filtered yet
  $http.get($rootScope.apiUrl + 'classes/list')
    .then(function successCallback(response) {
      var data = response.data.data;
      var classesArray = [];

      // vm.classesList = new CollectionList(data).toJSON();

      data.forEach(function(element, i, arr) {
        var item = new SearchItem(element);
        classesArray.push(item);
      });

      vm.classesList = classesArray;
      vm.classesListSliced = sliceSearchResults(vm.classesList, 0, vm.pagination.limit);
      vm.responseData = data;

      // AJAX responce data in JSON format

      // Refresh filter slider:
      vm.slider.refresh();

      // Update length of pagination amount:
      vm.pagination.total = classesArray.length;

      // Console success message:
      // $log.info('success' + response);
    }, function errorCallback(response) {
      // Console error message:
      // $log.error('error' + response);
    });

  /* Filter: */
  // Filter: Price Slider variables
  var sliderMin = 5,
      sliderMax = 45,
      sliderFloor = 0,
      sliderCeil = 60;
  // Filter: Price Slider
  vm.slider = {
    min: sliderMin,
    max: sliderMax,
    options: {
      floor: sliderFloor,
      floorLabel: 'free',
      ceil: sliderCeil,
      ceilLabel: '$' + sliderCeil,
      step: 1,
      hidePointerLabels: true,
      translate: function(value, sliderId, label) {
        switch (label) {
          case 'floor':
            return 'Free';
          case 'ceil':
            return '$' + value;
          default:
            return value;
        }
      },
      onEnd: function(sliderId, modelValue, highValue, pointerType) {
        vm.filters.price.start = modelValue;
        vm.filters.price.end = highValue;
      }
    },
    refresh: function() {
      $timeout(function() {
        $scope.$broadcast('rzSliderForceRender');
      });
    }
  };
  // Filter: Rating
  vm.rating = {
    titles: ['0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5']
  };
  // Filter: Datepicker Popup
  vm.datepicker = {
    state: false,
    format: "dd/MM",
    show: function() {
      this.state = true;
    },
    hide: function() {
      this.state = false;
    }
  };
  // Filter: Distance select
  vm.distances = [
    { id: '0',  title: 'Any'  },
    { id: '2',  title: '2km'  },
    { id: '5',  title: '5km'  },
    { id: '10', title: '10km' },
    { id: '20', title: '20km' },
    { id: '30', title: '30km' }
  ];
  // Filter: Size select
  vm.sizes = [
    { id: '0',  title: 'Any'  },
    { id: '1',  title: '1'    },
    { id: '2',  title: '2+'   },
    { id: '5',  title: '5+'   },
    { id: '10', title: '10+'  }
  ];
  // Filter: Container
  vm.filters = {
    price: {
      start: sliderMin,
      end: sliderMax
    },
    rating: 0,
    date: false,
    distance: vm.distances[2].id,
    size: vm.sizes[2].id
  };


  /* Results */
  // Results: Pagination
  vm.pagination = {
    current: 1,
    last: 1,
    total: 0,
    limit: 8, // 20
    size: 4
  };
  // Results: List
  vm.results = {
    more: true,
    getIndexStart: function() {
      return ((vm.pagination.current - 1) * vm.pagination.limit);
    },
    getIndexEnd:   function() {
      return (this.getIndexStart() + vm.pagination.limit);
    }
  };


  /* Watch events */
  // Pagination:
  // Slice results according to the current page
  $scope.$watch('search.pagination.current', function() {
    var start = vm.results.getIndexStart(),
        end   = vm.results.getIndexEnd();

    vm.classesListSliced = sliceSearchResults(vm.classesList, start, end);
  });


  /* Functions */

  // Show more button:
  // Adds more results equal to "limit" step to the shown list
  $scope.showMoreResults = function() {
    var start = vm.results.getIndexStart(),
        end   = vm.results.getIndexEnd() + vm.classesListSliced.length;

    vm.classesListSliced = sliceSearchResults(vm.classesList, start, end);

    vm.pagination.last++;
    vm.results.more = (end >= vm.pagination.total) ? false : true;
  };

  // Pagination:
  // Triggers when pagination item is clicked
  $scope.paginationChangeEvent = function() {

    // Hide or Show "Show more" search results button
    vm.results.more = (vm.pagination.current * vm.pagination.limit >= vm.pagination.total) ? false : true;

    vm.pagination.last = vm.pagination.current;

    // Scroll to the top of the block
    var searchList = document.querySelector('#searchList'),
        coordinates = searchList.getBoundingClientRect();

    if (coordinates.top >= 0) return false;

    var scrolled  = document.body.scrollTop || document.documentElement.scrollTop;
    var isbody    = document.body.scrollTop ? true : false;
    var container = isbody ? document.body : document.documentElement;

    container.scrollTop = scrolled + coordinates.top - 40;
  };

  // Pagination:
  // Check if results of clicked button are already shown
  $scope.paginationCheckPage = function(page) {
    var result = (page > vm.pagination.current && page <= vm.pagination.last) ? false : true;
    return result;
  };
}

export default {
  name: 'SearchCtrl',
  fn: SearchCtrl
};
