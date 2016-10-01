function SearchFormCtrl($rootScope, $scope, $stateParams, $location, $timeout, $log, categories, locations, searching) {
  'ngInject';

  // ViewModel
  const vm = this;

  // Get list of Categories:
  categories.getList().then(function(response) { // As promise
    vm.categoriesList = response;

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
  var selectedCategory = searching.getCategory() ? searching.getCategory().title : null;
  vm.categories = {
    selected: selectedCategory,
    query: vm.searchQuery,
    change: function(item) {
      searching.setCategory(item);
    }
  };
  var selectedLocation = searching.getLocation() ? searching.getLocation().title : null;
  vm.locations = {
    selected: selectedLocation,
    query: vm.searchQuery,
    change: function(item) {
      searching.setLocation(item);
    }
  };


  /* Check the URL and update the Search Form and Searching service values */
  $scope.$on('loadedCategories', function(event, response) {
    $log.info('loadedCategories');

    var urlCategory = $stateParams.searchCategory;
    categories.getCategoryElement(urlCategory).then(function(response) { // As promise
      if (!response) return false;

      vm.categories.selected = response.title;
      searching.setCategory(response);

      $rootScope.$broadcast('updatedSearching', response);
    });
  });
  var urlLocation = $location.search().location;
  var urlLocationElement = locations.getLocationElement(urlLocation);
      if (urlLocationElement) {
        vm.locations.selected = urlLocationElement.title;
      }
      searching.setLocation(urlLocationElement);


  /* Form submit event */
  vm.search = function() {
    // $log.info('Searching...');
    var newURL = '/search/';

    // Continue searching only if category is selected
    if (!vm.categories.selected) return false;

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
