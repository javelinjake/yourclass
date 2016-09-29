function searching($rootScope, $http, $log) {
  'ngInject';

  // Category & Location
  this.search = {
    category: null,
    location: null
  };

  this.setCategory = function(category) {
    this.search.category = category ? category : null;
  };
  this.setLocation = function(location) {
    this.search.location = location ? location : null;
  };

  this.getCategory = function() {
    return this.search.category;
  };
  this.getLocation = function() {
    return this.search.location;
  };


  // Filters
  this.filter = {};

}

export default {
  name: 'searching',
  fn: searching
};
