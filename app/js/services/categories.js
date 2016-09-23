function categories($rootScope, $http, $log, $q) {
  'ngInject';

  var categoriesList = undefined;


  /* Inner functions */
  var uploadList = function() {
    // Get list of categories for autocomplete
    var deferred = $q.defer();

    $http
      .get($rootScope.apiUrl + 'classes/categories')
      .then(function(response) {
        deferred.resolve(response);
      });

    return deferred.promise;
  };
  var createList = function(response) {
    var categoriesData = angular.fromJson(response.data).data;
    var categoriesArray = categoriesData.map(function(category) {
      return { id: category.id, title: category.title };
    });
    return categoriesArray;
  };
  var getID = function(title) {
    var category = categoriesList.filter(function(element) {
      return angular.lowercase(element.title) == title;
    });
    return category[0].id;
  };
  // It doesn't work for now, because response data doesn't have this value:
  /* var getImage = function(title) {
    var category = categoriesList.filter(function(element) {
      return angular.lowercase(element.title) == title;
    });
    return category[0].image;
  }; */


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
  this.getCategoryID = function returnCategoryID(title) {

    if (categoriesList !== undefined) {
      var defer = $q.defer();
      defer.resolve(getID(title));
      return defer.promise;
    }

    return uploadList().then(function(response) {
      categoriesList = createList(response);
      return getID(title);
    });
  };
  // It doesn't work for now, because response data doesn't have this value:
  /* this.getCategoryImage = function returnList() {

    if (categoriesList !== undefined) {
      var defer = $q.defer();
      defer.resolve(getImage(title));
      return defer.promise;
    }

    return uploadList().then(function(response) {
      categoriesList = createList(response);
      return getImage(title);
    });
  }; */
}

export default {
  name: 'categories',
  fn: categories
};
