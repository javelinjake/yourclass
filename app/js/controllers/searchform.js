function SearchFormCtrl($rootScope, $stateParams, $location, $timeout, $log, categories, locations, searching) {
  'ngInject';

  // ViewModel
  const vm = this;

  // Get list of Categories:
  categories.getList().then(function(response) { // As promise
    vm.categoriesList = response;
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
    selected: searching.search.category,
    query: vm.searchQuery,
    // change: function(item) {}
  };
  vm.locations = {
    selected: searching.search.location,
    query: vm.searchQuery,
    // change: function(item) {}
  };


  /* Check the URL and update the Search Form and Searching service values */
  var urlCategory = $stateParams.searchCategory;
  categories.getCategoryElement(urlCategory).then(function(response) { // As promise
    if (!response) return false;
      vm.categories.selected = response;
      searching.setCategory(response);
  });
  var urlLocation = $location.search().location;
  var urlLocationElement = locations.getLocationElement(urlLocation);
      vm.locations.selected = urlLocationElement;
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
    // $log.info(newURL); $log.info(urlParamLoc);

    // Set new search parameters
    searching.setCategory(vm.categories.selected);
    searching.setLocation(vm.locations.selected);
    // $log.info(searching.getCategory());
    // $log.info(searching.getLocation());

    $location.search('location', urlParamLoc);
    $location.replace().path(newURL);
  };
}

export default {
  name: 'SearchFormCtrl',
  fn: SearchFormCtrl
};
