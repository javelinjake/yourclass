function SearchCtrl($rootScope, $scope, $http, $log, $timeout, $filter, searching, categories) {
  'ngInject';

  // ViewModel
  const vm = this;

  /* Heading */
  vm.heading = {
    category: null,
    location: null,
    image: 'background-image: url(/images/outside-yoga.jpg)'
  };

  vm.isLoading = false;


  /* Helper Functions */
  var sliceSearchResults = function(classesList, startIndex, endIndex) {
    if (!classesList || classesList.length == 0) return [];

    var slicedList = classesList.slice(startIndex, endIndex);
    return slicedList;
  };

  var loadSearchResults = function() {
    /* Get Search results: simple request */
    vm.isLoading = true;
    searching.getResults().then(function(response) {
      $log.info('Loaded search results.');

      var classesArray = response;

      vm.classesList = $filter('orderBy')(classesArray, ['-rating', 'title']);
      vm.classesListSliced = sliceSearchResults(vm.classesList, 0, vm.pagination.limit);
      vm.isLoading = false;

      // Refresh filter slider:
      vm.slider.refresh();

      // Update pagination settings:
      vm.pagination.current = 1;
      vm.pagination.last = 1;
      vm.pagination.total = classesArray.length;
    });
  };

  var updateSearchHeading = function() {
    var category = searching.getCategory();
    var location = searching.getLocation();

      vm.heading.category = category ? category.title : null;
      vm.heading.location = location ? location.title : null;

    var categoryImage = 'background-image: url(' +  $rootScope.imageUrl + category.image + ')';
    var defaultImage  = 'background-image: url(/images/outside-yoga.jpg)';

      vm.heading.image = (category && category.image.length > 0) ? categoryImage : defaultImage;
  };


  /* Load results on controller is load */
  // Checks the status flag. False means first app upload.
  if (!searching.isFirstLoad) {
    $log.warn('not first load');
    $log.warn(searching.getCategory());
    $log.warn(searching.getLocation());
    updateSearchHeading();
    loadSearchResults();
  }
  /* Load results after categories list and searching parameters is updated */
  $scope.$on('updatedSearching', function(event, response) {
    $log.warn('first load');
    $log.warn(searching.getCategory());
    $log.warn(searching.getLocation());
    updateSearchHeading();
    loadSearchResults();
    searching.isFirstLoad = false;
  });


  /* Filter model */
  // Filter: Price variables
  var priceMin   = 0,
      priceMax   = 1000,
      priceFloor = 0,
      priceCeil  = 1000;
  // Filter: Price Slider
  vm.slider = {
    min: priceMin,
    max: priceMax,
    options: {
      floor: priceFloor,
      floorLabel: 'free',
      ceil: priceCeil,
      ceilLabel: '$' + priceCeil,
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
    value: 8,
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
    },
    click: function() {
      // $log.info('Distance is clicked...');
      vm.datepicker.hide();
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
    },
    click: function() {
      // log.info('Size is clicked...');
      vm.datepicker.hide();
    }
  };
  // Filter: Container
  vm.filters = {
    price: {
      start: priceMin,
      end: priceMax
    },
    rating: vm.rating.value,
    date: new Date(),
    distance: vm.distances.options[4], // gets an { value: '', text: '' }
    size: vm.sizes.options[0] // gets an { value: '', text: '' }
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
    // $log.warn(searching.filterParams);
    if (searching.isFirstLoad) {

    }
  }, true);


  /* Scope Functions */

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
