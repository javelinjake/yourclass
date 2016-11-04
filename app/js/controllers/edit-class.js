function UserEditClassCtrl($rootScope, $http, $log, getEditClassAlias, $state, $q, Upload, $timeout) {
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

      vm.tabIndex = 0;
      if ($rootScope.fromAddClass) {
        vm.tabIndex = 1;
      }

      $log.info(vm.classData.category.id);

      //vm.classData.category.id.selected = vm.classData.category.id[0];

      // Get categories
      $http.get($rootScope.apiUrl + 'classes/categories')
        .then(function successCallback(response) {
          vm.categories = response.data.data;
        });

      vm.subCategory = vm.classData.category.id;

      // Gets the sub categories from selected category
      vm.classCategory = function(category) {
        vm.subCategory = category;
      }

      vm.focusPrice = function() {
        $timeout(function () {
          angular.forEach(document.querySelectorAll('.price-input'), function(elem) { elem.focus(); });
        });
      }
      vm.focusSize = function() {
        $timeout(function () {
          angular.forEach(document.querySelectorAll('.size-input'), function(elem) { elem.focus(); });
        });
      }

      // If custom price has been chosen
      if (vm.classData.price == '0.00' || vm.classData.price == '10.00' || vm.classData.price == '20.00' || vm.classData.price == '30.00') {
        vm.customPrice = false;
      } else {
        vm.customPrice = true;
        vm.priceInput = Number(vm.classData.price);
      }
      // If custom size has been chosen
      if (vm.classData.size == '1' || vm.classData.size == '2' || vm.classData.size == '5' || vm.classData.size == '10' || vm.classData.size == '20') {
        vm.customSize = false;
      } else {
        vm.customSize = true;
        vm.sizeInput = Number(vm.classData.size);
      }

      // Add class basic
      vm.editClassBasics = function() {

        // console.log(vm.addClassForm.title.$pristine);

        // Price buttons and custom price
        //vm.customPrice = false;
        if (vm.classData.price == 'custom') {
          vm.classData.price = vm.priceInput;
        }

        // Size buttons and custom size
        //vm.customSize = false;
        if (vm.classData.size == 'custom') {
          vm.classData.size = vm.sizeInput;
        }

        // if (!vm.classData.subcategory.id) {
        //   vm.classData.subcategory.id = "";
        // }

        var classData = {
          '_auth_key': $rootScope.authToken,
          '_id': vm.classData.id,
          'title': vm.classData.title,
          //'categoryId': vm.classData.category.id,
          //'subcategoryId': vm.classData.subcategory.id,
          'price': vm.classData.price,
          'size': vm.classData.size
          //'venueType': 'private' // Default for now
        };

        $http.post($rootScope.apiUrl + 'classes/update', classData).success((data) => {
          $log.info(data);
          $log.info('Class updated the basics');

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
            // Set to false as you will be redirected to details tab
            $rootScope.fromAddClass = false;
            // Reload with new URL
            $state.go('User-Edit-Class', {classEditName: slugify(vm.classData.title)});
          } else {
            // Just reload the page TODO - Any need to reload?
            // $state.reload();

            //vm.tabIndex = 0;
          }

        }).error((err, status) => {

        });
      }

      // Add class details
      vm.editClassDetails = function() {

        var classData = {
          '_auth_key': $rootScope.authToken,
          '_id': vm.classData.id,
          'brief': vm.classData.brief,
          'description': vm.classData.description
        };

        $http.post($rootScope.apiUrl + 'classes/update', classData).success((data) => {
          $log.info(data);
          $log.info('Class updated the details');

          // Just reload the page
          //$state.reload();

          //vm.tabIndex = 1;

        }).error((err, status) => {

        });
      }

      vm.uploadFiles = function(files, errFiles) {
        vm.files = files;
        vm.errFiles = errFiles;
        angular.forEach(files, function(file) {
          file.upload = Upload.upload({
            url: $rootScope.apiUrl + 'classes/upload',
            data: {
              'id': vm.classData.id,
              '_auth_key': $rootScope.authToken,
              'file': file
            }
          });

          file.upload.then(function(response) {
            $timeout(function() {
              file.result = response.data;
              $log.info("Image response: ", response.data);
              // $state.reload();
            });
          }, function(response) {
            if (response.status > 0)
              vm.errorMsg = response.status + ': ' + response.data;
          }, function(evt) {
            file.progress = Math.min(100, parseInt(100.0 *
              evt.loaded / evt.total));
          });
        });
      }

    vm.options = {
      minDate: new Date(),
      showWeeks: false
    };

      // Time steps
      vm.hstep = 1;
      vm.mstep = 15;

      // Get current date
      var date = new Date;
      var minutes = date.getMinutes();
      var hours = date.getHours();

      // Round minutes and hours to nearest whole number
      var m = (Math.round(minutes/15) * 15) % 60;
      var h = ((((minutes/105) + .5) | 0) + hours) % 24;

      // Set default time
      date.setHours(h);
      date.setMinutes(m);
      vm.classTime = date;

      // Class duration options
      vm.classDuration = {
        availableOptions: [
          {id: '30', name: '30 minutes'},
          {id: '45', name: '45 minutes'},
          {id: '60', name: '1 hour'},
          {id: '75', name: '1 hour 15 minutes'},
          {id: '90', name: '1 hour 30 minutes'},
          {id: '120', name: '2 hours'},
          {id: '150', name: '2 hours 30 minutes'},
          {id: '180', name: '3 hours'},
          {id: '210', name: '3 hours 30 minutes'},
          {id: '240', name: '4 hours'},
          {id: '270', name: '4 hours 30 minutes'},
          {id: '300', name: '5 hours'}
        ],
        selectedOption: {
          id: '60', name: '1 hour'
        }
      };

      // Add class details
      vm.editClassDates = function() {

        // Get friendly date
        var classDate = vm.classDate.getFullYear() + "-" + (vm.classDate.getMonth()+1) + "-" + vm.classDate.getDate();

        // Get class end time
        var endTime = vm.classTime;
        endTime = new Date(vm.classTime.getTime() + vm.classDuration.selectedOption.id*60000);

        // Function to get friendly time
        function friendlyTime(time) {
          return time.getHours() + ":" + time.getMinutes();
        }

        // Get friendly times
        var classStartTime = friendlyTime(vm.classTime);
        var classEndTime = friendlyTime(endTime);

        // Create data object
        var dateTimes = {};
        dateTimes[classDate] = [{
          startTime: classStartTime,
          endTime: classEndTime,
          spots: vm.classData.size
        }];

        var classData = {
          'id': vm.classData.id,
          'datetimes': dateTimes
        };

        $http.post($rootScope.apiUrl + 'classes/adddates', classData).success((data) => {
          $log.info(data);
          $log.info('Class date updated');

          // Just reload the page
          //$state.reload();

          //vm.tabIndex = 1;

        }).error((err, status) => {

        });
      }

      vm.deleteClassTime = function(date, startTime, endTime) {
        $log.info(date);
        $log.info(startTime);
        $log.info(endTime);

        var classTimeData = {
          '_id': vm.classData.id,
          '_date': date,
          '_startTime': startTime,
          '_endDate': endTime
        };

        $http.post($rootScope.apiUrl + 'classes/deletetimes', classTimeData).success((data) => {
          $log.info(data);
          $log.info('Class time deleted');

          // Just reload the page
          //$state.reload();

          //vm.tabIndex = 1;

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
