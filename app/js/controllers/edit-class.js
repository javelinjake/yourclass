function UserEditClassCtrl($rootScope, $http, $log, getEditClassAlias, $state, $q) {
  'ngInject';

  // ViewModel
  const vm = this;

  // Lets wrap everything in here and wait for the users data to be loaded
  $rootScope.waitForData.promise.then(function() {

    // Sets defer for user data to load
    vm.waitForClassData = $q.defer();

    // Get class to edit
    $http.get($rootScope.apiUrl + 'classes/one', {params: {_alias: getEditClassAlias}}).success((data) => {
      vm.classData = data.data;

      // Class data has now been loaded
      vm.waitForClassData.resolve();
    }).error((err, status) => {});

    // Lets also wait for the class data to be loaded
    vm.waitForClassData.promise.then(function() {

      $log.info(vm.classData.category.id);

      //vm.classData.category.id.selected = vm.classData.category.id[0];

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
      vm.editClass = function() {

        console.log(vm.addClassForm.title.$pristine);

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

        var classData = {
          '_auth_key': $rootScope.authToken,
          '_id': vm.classData.id,
          'title': vm.classData.title,
          'categoryId': vm.classData.category.id,
          'subcategoryId': vm.classData.subcategory.id,
          'price': vm.classData.price,
          'size': vm.classData.size
          //'venueType': 'private' // Default for now
        };

        $http.post($rootScope.apiUrl + 'classes/update', classData).success((data) => {
          $log.info(data);
          $log.info('Class updated');

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

          // Check to see if title was changed
          if (!vm.addClassForm.title.$pristine) {
            // Reload with new URL
            $state.go('User-Edit-Class', {classEditName: slugify(vm.classData.title)});
          } else {
            // Just reload the page
            $state.reload();
          }

        }).error((err, status) => {

        });
      }

    });

  });

}

export default {
  name: 'UserEditClassCtrl',
  fn: UserEditClassCtrl
};
