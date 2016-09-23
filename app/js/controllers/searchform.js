function SearchFormCtrl($rootScope, $state, $location, $log, categories, locations) {
  'ngInject';

  // ViewModel
  const vm = this;

  vm.categoriesList = categories.getList();
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
      return (itemTitle.indexOf(lowercaseQuery) === 0);
    }
  }

  /* Data containers */
  vm.categories = {
    current: undefined,
    query: vm.searchQuery,
    change: function(item) {
      this.current = item;
    }
  };
  vm.locations = {
    current: undefined,
    query: vm.searchQuery,
    change: function(item) {
      this.current = item;
    }
  };

  /* Form submit event */
  vm.search = function() {
    // $log.info('Searching...');

    var newURL = '/search/';
    // if (!vm.categories.current) return false;

    if (vm.categories.current) {
      newURL += angular.lowercase(vm.categories.current.title);
    }

    var urlParamLoc = vm.locations.current ? angular.lowercase(vm.locations.current.title) : null;

    $location.search('location', urlParamLoc);
    $location.replace().path(newURL);
  };
}

export default {
  name: 'SearchFormCtrl',
  fn: SearchFormCtrl
};
