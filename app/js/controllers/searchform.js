function SearchFormCtrl($http, $rootScope, $scope, $log) {
  'ngInject';


  // ViewModel
  const vm = this;

  // Get list of catogories for autocomplete
  $http.get($rootScope.apiUrl + 'classes/categories')
    .then(function successCallback(response) {
      var categoriesData = response.data.data;

      // Real categories:
      vm.categoriesList = categoriesData.map(function(category) {
        return {
          id: category.id,
          name: category.title
        };
      });

      // Test!!! locations:
      var locationsData = [{"id":"alabama","name":"Alabama"},{"id":"alaska","name":"Alaska"},{"id":"arizona","name":"Arizona"},{"id":"arkansas","name":"Arkansas"},{"id":"california","name":"California"},{"id":"colorado","name":"Colorado"},{"id":"connecticut","name":"Connecticut"},{"id":"delaware","name":"Delaware"},{"id":"florida","name":"Florida"},{"id":"georgia","name":"Georgia"},{"id":"hawaii","name":"Hawaii"},{"id":"idaho","name":"Idaho"},{"id":"illinois","name":"Illinois"},{"id":"indiana","name":"Indiana"},{"id":"iowa","name":"Iowa"},{"id":"kansas","name":"Kansas"},{"id":"kentucky","name":"Kentucky"},{"id":"louisiana","name":"Louisiana"},{"id":"maine","name":"Maine"},{"id":"maryland","name":"Maryland"},{"id":"massachusetts","name":"Massachusetts"},{"id":"michigan","name":"Michigan"},{"id":"minnesota","name":"Minnesota"},{"id":"mississippi","name":"Mississippi"},{"id":"missouri","name":"Missouri"},{"id":"montana","name":"Montana"},{"id":"nebraska","name":"Nebraska"},{"id":"nevada","name":"Nevada"},{"id":"new hampshire","name":"New Hampshire"},{"id":"new jersey","name":"New Jersey"},{"id":"new mexico","name":"New Mexico"},{"id":"new york","name":"New York"},{"id":"north carolina","name":"North Carolina"},{"id":"north dakota","name":"North Dakota"},{"id":"ohio","name":"Ohio"},{"id":"oklahoma","name":"Oklahoma"},{"id":"oregon","name":"Oregon"},{"id":"pennsylvania","name":"Pennsylvania"},{"id":"rhode island","name":"Rhode Island"},{"id":"south carolina","name":"South Carolina"},{"id":"south dakota","name":"South Dakota"},{"id":"tennessee","name":"Tennessee"},{"id":"texas","name":"Texas"},{"id":"utah","name":"Utah"},{"id":"vermont","name":"Vermont"},{"id":"virginia","name":"Virginia"},{"id":"washington","name":"Washington"},{"id":"west virginia","name":"West Virginia"},{"id":"wisconsin","name":"Wisconsin"},{"id":"wyoming","name":"Wyoming"}];
      vm.locationsList = locationsData;

      // Console success message:
      $log.info('Success loading categories: ' + response);
    }, function errorCallback(response) {
      // Console error message:
      $log.error('ESrror loading categories' + response);
    });

  /* Functions */
  vm.searchQuery = function(query, type) {
    var list = type == 'cat' ? vm.categoriesList : vm.locationsList;
    var results = query ? list.filter(vm.createQueryFilter(query)) :list;
    return results;
  };

  vm.createQueryFilter = function(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function(item) {
      var itemTitle = angular.lowercase(item.name);
      return (itemTitle.indexOf(lowercaseQuery) === 0);
    }
  }

  vm.categories = {
    query: vm.searchQuery
  };
  vm.locations = {
    query: vm.searchQuery
  };
}

export default {
  name: 'SearchFormCtrl',
  fn: SearchFormCtrl
};
