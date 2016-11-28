function SearchCtrl($rootScope, $scope, $http, $log, $timeout, $filter, searching, categories) {
  'ngInject';

  // ViewModel
  const vm = this;

  /* Heading */
  vm.heading = {
    category: null,
    location: null,
    image: 'background-image: url(/images/outside-yoga.jpg)',
    imageDefault: 'background-image: url(/images/outside-yoga.jpg)'
  };

  vm.isLoading = false; // Hidden Loader
  vm.isFirstLoad = true;


  /* Helper Functions */
  var sliceSearchResults = function(classesList, startIndex, endIndex) {
    if (!classesList || classesList.length == 0) return [];

    var slicedList = classesList.slice(startIndex, endIndex);
    return slicedList;
  };

  var loadSearchResults = function(parameters) {
    /* Get Search results: simple request */

    // Prevent loading if category is not set
    if (searching.getCategory() === null) {
      return false;
    }

    vm.isLoading = true; // Show Loader

    searching.getResults(parameters).then(function(response) {
      if (response === undefined) {
        vm.isLoading = false;
        return false;
      }

      var classesArray = response;

      vm.classesList = $filter('orderBy')(classesArray, [vm.sorting.sortby, 'title']);
      vm.classesListSliced = sliceSearchResults(vm.classesList, 0, vm.pagination.limit);

      vm.isLoading = false; // Hide Loader

      // Update pagination settings:
      vm.pagination.current = 1;
      vm.pagination.last = 1;
      vm.pagination.total = classesArray.length;

      // $log.warn('Loaded search results.');
    });
  };

  var updateSearchHeading = function() {
    var category = searching.getCategory();
    var location = searching.getLocation();

    vm.heading.category = category ? category.title : null;
    vm.heading.location = location ? location.title : null;
    vm.heading.image = (category && category.image.length > 0) ? 'background-image: url(' +  $rootScope.imageUrl + category.image + ')' : vm.heading.imageDefault;

    // $log.warn('Updated search heading.');
  };

  var updateSliderPrice = function(min, max) {
    vm.slider.options.floor = min || 0;
    vm.slider.options.ceil  = max || 1000;

    if (vm.slider.max > vm.slider.options.ceil) {
      vm.filters.price.max = vm.slider.max = vm.slider.options.ceil;
    }
    if (vm.slider.min < vm.slider.options.floor) {
      vm.filters.price.min = vm.slider.min = vm.slider.options.floor;
    }

    // Refresh filter slider:
    vm.slider.refresh();
  };


  /* Filter model */
  // Filter: Price Slider
  vm.slider = {
    min: searching.getFilterPriceMin() || searching.getFilterPriceFloor() || 0,
    max: searching.getFilterPriceMax() || searching.getFilterPriceCeil() || 500,
    options: {
      floor: searching.getFilterPriceFloor() || 0,
      ceil: searching.getFilterPriceCeil() || 500,
      step: 1,
      hidePointerLabels: false,
      hideLimitLabels: true,
      translate: function(value, sliderId, label) {
        switch (label) {
          case 'model':
            return value > 0 ? '$' + value : 'Free';
          case 'high':
            return '$' + value;
          default:
            return value;
        }
      },
      onEnd: function(sliderId, modelValue, highValue, pointerType) {
        vm.filters.price.min = modelValue;
        vm.filters.price.max = highValue;
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
    value: searching.getFilterRating() || 0,
    titles: ['0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5']
  };
  // Filter: Datepicker Popup
  vm.datepicker = {
    value: searching.getFilterDate() || new Date(),
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
    value: searching.getFilterDistance() || { value: '10', text: '10km' },
    options: [
      { value: '0',  text: 'Any'  },
      { value: '2',  text: '2km'  },
      { value: '5',  text: '5km'  },
      { value: '10', text: '10km' },
      { value: '20', text: '20km' },
      { value: '30', text: '30km' }
    ],
    change: function() {
      // $log.info('Distance is changed...');
    },
    click: function() {
      // $log.info('Distance is clicked...');
      vm.datepicker.hide();
    }
  };
  // Filter: Size select
  vm.sizes = {
    value: searching.getFilterSize() || { value: '0',  text: 'Any'  },
    options: [
      { value: '0',  text: 'Any'  },
      { value: '1',  text: '1'    },
      { value: '2',  text: '2+'   },
      { value: '5',  text: '5+'   },
      { value: '10', text: '10+'  }
    ],
    change: function() {
      // $log.info('Size is changed...');
    },
    click: function() {
      // log.info('Size is clicked...');
      vm.datepicker.hide();
    }
  };
  // Filter: Container
  vm.filters = {
    price: {
      min:    vm.slider.min,
      max:    vm.slider.max
    },
    rating:   vm.rating.value,
    date:     vm.datepicker.value,
    distance: vm.distances.value, // gets an { value: '', text: '' }
    size:     vm.sizes.value // gets an { value: '', text: '' }
  };
  /* Sorting */
  vm.sorting = {
    options: [
      { value: 'pricehigh',  text: 'Price (high)' },
      { value: 'pricelow',  text: 'Price (low)' },
      { value: 'rating',  text: 'Rating' },
      { value: 'date',  text: 'Date' },
      { value: 'distance', text: 'Distance' },
      { value: 'size', text: 'Size' }
    ],
    sortby: searching.getSortType() || '-price',
    selected: searching.getSortSelected() || { value: 'rating',  text: 'Rating' },
    change: function() {
      // $log.info('Sort settings are changed...');
      var type = '';
      switch(this.selected.value) {
        case 'pricehigh':
          type = '-price';
          break;
        case 'pricelow':
          type = 'price';
          break;
        case 'rating':
          type = '-rating';
          break;
        case 'date':
          type = 'dateStart';
          break;
        case 'distance':
          type = 'distance';
          break;
        case 'size':
          type = 'size';
          break;
        default:
          type = '-rating';
          break;
      }
      this.sortby = type;
      searching.setSortType(type);
      searching.setSortSelected(this.selected);
    },
    click: function() {
      // log.info('Sorting is clicked...');
      vm.datepicker.hide();
    }
  };
  $scope.$watch('search.sorting.selected', function() {
    vm.sorting.change();
  });
  /* Dropdowns have "dropdown-onchange" attribute, but it fires on changing and not when the selected value is already changed. This is why I used $watch event. */


  /* Results model */

  // Results: Pagination
  vm.pagination = {
    current: 1,
    last: 1,
    total: 0,
    limit: 20, // 20
    size: 4,
    display: false
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


  /* Load results on controller is load */
  if (searching.isAvailable) {
    // Update price
    var price = searching.getCategory().price;
    updateSliderPrice(parseInt(price.min), parseInt(price.max));

    updateSearchHeading();
    loadSearchResults(vm.filters);
  }
  /* Load results after categories list and searching parameters are updated */
  $scope.$on('updatedSearching', function(event, response) {
    // Update price
    var price = searching.getCategory().price;
    updateSliderPrice(parseInt(price.min), parseInt(price.max));

    updateSearchHeading();
    loadSearchResults(vm.filters);

    searching.isAvailable = true;
  });


  /* Watch events */

  // Pagination:
  // Slice results according to the current page
  $scope.$watch('search.pagination.current', function() {
    var start = vm.results.getIndexStart(),
        end   = vm.results.getIndexEnd();

    vm.classesListSliced = sliceSearchResults(vm.classesList, start, end);
  });
  // Filter updates in searching service. Loading new results
  $scope.$watch('search.filters', function(current, original) {
    if (vm.isFirstLoad) {
      vm.isFirstLoad = false;
      return false;
    }
    updateSearchHeading();
    loadSearchResults(current);
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
