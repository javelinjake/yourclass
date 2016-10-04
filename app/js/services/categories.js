function categories($rootScope, $http, $log, $q) {
  'ngInject';

  var categoriesList = undefined;


  /* Inner functions */
  var uploadList = function() {
    // Get list of categories for autocomplete
    var deferred = $q.defer();

    $http
      .get($rootScope.apiUrl + 'classes/categories')
      .then(function successCallback(response) {
        deferred.resolve(response);

        // $log.info('success' + response);
      }, function errorCallback(response) {
        // $log.error('error' + response);
      });

    return deferred.promise;
  };
  var createList = function(response) {
    var categoriesData = angular.fromJson(response.data).data;
    var categoriesArray = categoriesData.map(function(category) {
      return { id: category.id, title: category.title, image: category.image };
    });
    return categoriesArray;
  };
  var getById = function(id) {
    var category = categoriesList.filter(function(element) {
      return angular.lowercase(element.id) == id;
    });
    return category[0];
  };
  var getByTitle = function(title) {
    var category = categoriesList.filter(function(element) {
      return angular.lowercase(element.title) == title;
    });
    return category[0];
  };


  /* Service methods: */
  this.getList = function returnList() {
    if (categoriesList !== undefined) {
      var defer = $q.defer();
      defer.resolve(categoriesList);
      return defer.promise;
    }

    return uploadList().then(function(response) {
      categoriesList = createList(response);
      return categoriesList;
    });
  };
  this.getElementById = function returnElementById(title) {
    if (categoriesList !== undefined) {
      var defer = $q.defer();
      defer.resolve(getById(id));
      return defer.promise;
    }

    return uploadList().then(function(response) {
      categoriesList = createList(response);
      return getById(id);
    });
  };
  this.getElementByTitle = function returnElementByTitle(title) {
    if (categoriesList !== undefined) {
      var defer = $q.defer();
      defer.resolve(getByTitle(title));
      return defer.promise;
    }

    return uploadList().then(function(response) {
      categoriesList = createList(response);
      return getByTitle(title);
    });
  };
}

export default {
  name: 'categories',
  fn: categories
};
