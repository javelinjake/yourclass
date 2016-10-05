function UserAddClassCtrl($rootScope, $http, $log, $state) {
  'ngInject';

  // ViewModel
  const vm = this;

  // Lets wrap everything in here and wait for the users data to be loaded
  $rootScope.waitForData.promise.then(function() {

    // Get categories
    $http.get($rootScope.apiUrl + 'classes/categories')
      .then(function successCallback(response) {
        vm.categories = response.data.data;
      });

    // Gets the sub categories from selected category
    vm.classCategory = function(category) {
      vm.subCategory = category;
    }

    // Add class basic
    vm.addClass = function() {

      // Price buttons and custom price
      vm.customPrice = false;
      if (vm.priceRadio == 'custom') {
        vm.price = vm.priceInput;
      } else {
        vm.price = vm.priceRadio;
      }

      // Size buttons and custom size
      vm.customSize = false;
      if (vm.sizeRadio == 'custom') {
        vm.size = vm.sizeInput;
      } else {
        vm.size = vm.sizeRadio;
      }

      // Validate radio buttons TODO

      var classData = {
        'title': vm.title,
        'teacherId': $rootScope.userData.id,
        'categoryId': vm.categoryId,
        'subcategoryId': vm.subcategoryId,
        'price': vm.price,
        'size': vm.size,
        'venueType': 'private' // Default for now
      };

      $http.post($rootScope.apiUrl + 'classes/create', classData)
        .then(function successCallback(response) {

          // convert title to alias TODO - Check with Slava and put in filters?
          function slugify(text)
            {
              return text.toString().toLowerCase()
                .replace(/\s+/g, '-')           // Replace spaces with -
                .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                .replace(/\-\-+/g, '-')         // Replace multiple - with single -
                .replace(/^-+/, '')             // Trim - from start of text
                .replace(/-+$/, '');            // Trim - from end of text
            }

          // Redirect to edit class
          $state.go('User-Edit-Class', {classEditName: slugify(vm.title)});

          // Set coming from add class to true
          $rootScope.fromAddClass = true;
        });

    }

  });

}

export default {
  name: 'UserAddClassCtrl',
  fn: UserAddClassCtrl
};
