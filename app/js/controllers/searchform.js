function SearchFormCtrl($rootScope, $scope, $stateParams, $location, $log, categories, locations, searching) {
  'ngInject';

  // ViewModel
  const vm = this;


  // Get list of Categories:
  searching.isAvailable = false;
  categories.getList().then(function(response) { // As promise
    vm.categoriesList = response;

    // $log.error('Loading categories...');
    $rootScope.$broadcast('loadedCategories', response);
  });

  // Get list of Locations:
  vm.locationsList = locations.getList();

  /* Functions */
  vm.searchQuery = function(query, type) {
    var list = type == 'cat' ? vm.categoriesList : vm.locationsList;
    var results = query ? list.filter(vm.createQueryFilter(query)) : list;
    return results;
  };
  vm.createQueryFilter = function(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function(item) {
      var itemTitle = angular.lowercase(item.title);
      return (itemTitle.indexOf(lowercaseQuery) !== -1);
    }
  }


  /* Data containers */
  /* Selected values are saved in the Searching service */
  vm.categories = {
    selected: searching.getCategory() || null,
    query: vm.searchQuery,
    change: function(item) {
      // searching.setCategory(item);
    }
  };
  vm.locations = {
    selected: searching.getLocation() || null,
    query: vm.searchQuery,
    change: function(item) {
      // searching.setLocation(item);
    }
  };


  /* Check the URL and update the Search Form and Searching service values */
  $scope.$on('loadedCategories', function(event, response) {
    var urlCategory = $stateParams.searchCategory;
    if (urlCategory) {
      categories.getElementByTitle(urlCategory).then(function(response) {
        if (!response) return false;

        vm.categories.selected = response;
        searching.setCategory(response);

        $rootScope.$broadcast('updatedSearching', response);
      });
    } else {
      // OR clean both:
      // vm.categories.selected = null;
      // searching.setCategory(null);
    }
  });
  var urlLocation = $location.search().location;
  if (urlLocation) {
    var urlLocationElement = locations.getLocationElement(urlLocation);

    vm.locations.selected = urlLocationElement;
    searching.setLocation(urlLocationElement);

  } else {
    // OR clean both:
    // vm.locations.selected = null;
    // searching.setLocation(null);
  }

  /* Form submit event */
  vm.search = function() {
    var newURL = '/search/';

    // Continue searching only if category is selected
    // if (!vm.categories.selected) return false;

    if (vm.categories.selected) {
      newURL += angular.lowercase(vm.categories.selected.title);
    }

    var urlParamLoc = vm.locations.selected ? angular.lowercase(vm.locations.selected.title) : null;

    // Set new search parameters
    searching.setCategory(vm.categories.selected);
    searching.setLocation(vm.locations.selected);

    $location.search('location', urlParamLoc);
    $location.replace().path(newURL);
  };
}

export default {
  name: 'SearchFormCtrl',
  fn: SearchFormCtrl
};
