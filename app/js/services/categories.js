function categories($rootScope, $http, $log) {
  'ngInject';

  var categoriesList = undefined;


  /* Inner functions */
  var uploadList = function() {
    // Get list of categories for autocomplete
    $log.info('Uploading categories...');
    return $http.get($rootScope.apiUrl + 'classes/categories');
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


  /* Service methods: */
  this.getList = function returnList() {

    if (categoriesList !== undefined) return categoriesList;

    return uploadList().then(function(response) {
      categoriesList = createList(response);
      return categoriesList;
    });
  };

  this.getCategoryID = function returnCategoryID(title) {

    if (categoriesList !== undefined) return getID(title);

    return uploadList().then(function(response) {
      categoriesList = createList(response);
      return getID(title);
    });
  };
}

export default {
  name: 'categories',
  fn: categories
};
