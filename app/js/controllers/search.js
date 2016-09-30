function SearchCtrl($rootScope, $scope, $http, $log, $timeout, $filter, searching) {
  'ngInject';

  // ViewModel
  const vm = this;


  /* Helper Functions */
  var sliceSearchResults = function(classesList, startIndex, endIndex) {
    if (!classesList || classesList.length == 0) return [];

    var slicedList = classesList.slice(startIndex, endIndex);
    return slicedList;
  };


  /* Get Search results: simple request */
  searching.getResults().then(function(response) {
    $log.info('Got array of classes from searching');

    var classesArray = response;

    vm.classesList = $filter('orderBy')(classesArray, ['-rating', 'title']);
    vm.classesListSliced = sliceSearchResults(vm.classesList, 0, vm.pagination.limit);

    // Refresh filter slider:
    vm.slider.refresh();

    // Update length of pagination amount:
    vm.pagination.total = classesArray.length;
  });






  /* Heading */
  vm.heading = {
    category: null,
    location: null,
    image: 'background-image: url(/images/outside-yoga.jpg)'
  };


  /* Filter model */

  // Filter: Price Slider
  vm.slider = {
    min: searching.filter.price.start,
    max: searching.filter.price.end,
    options: {
      floor: searching.filter.price.floor,
      floorLabel: 'free',
      ceil: searching.filter.price.ceil,
      ceilLabel: '$' + searching.filter.price.ceil,
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
    options: {
      showWeeks: false,
      showButtonBar: false
    },
    show: function() {
      this.state = true;
    },
    hide: function() {
      this.state = false;
    }
  };
  // Filter: Distance select
  vm.distances = {
    options: [
      { value: '0',  text: 'Any'  },
      { value: '2',  text: '2km'  },
      { value: '5',  text: '5km'  },
      { value: '10', text: '10km' },
      { value: '20', text: '20km' },
      { value: '30', text: '30km' }
    ],
    change: function() {
      $log.info('Distance is changed...');
    }
  };
  // Filter: Size select
  vm.sizes = {
    options: [
      { value: '0',  text: 'Any'  },
      { value: '1',  text: '1'    },
      { value: '2',  text: '2+'   },
      { value: '5',  text: '5+'   },
      { value: '10', text: '10+'  }
    ],
    change: function() {
      $log.info('Size is changed...');
    }
  };
  // Filter: Container
  vm.filters = {
    price: {
      start: searching.filter.price.start,
      end: searching.filter.price.end
    },
    rating: searching.filter.rating,
    date: searching.filter.date,
    distance: searching.filter.distance, // gets an { value: '', text: '' }
    size: searching.filter.size // gets an { value: '', text: '' }
  };


  /* Results model */

  // Results: Pagination
  vm.pagination = {
    current: 1,
    last: 1,
    total: 0,
    limit: 20, // 20
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
  // Filter updates in searching service
  $scope.$watch('search.filters', function(current, original) {
    // Send new request
    $log.info(current);
  }, true);


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
