function UserCtrl($http, $rootScope, $log, $filter, Upload, $timeout, $state) {
  'ngInject';

  // ViewModel
  const vm = this;

  vm.isCollapsed = true;

  // Get current logged in user
  $http.get($rootScope.apiUrl + 'users/one?_auth_key=' + $rootScope.authToken)
    .then(function successCallback(response) {

      // The scope output
      vm.userData = response.data.data;

      // Need to output birthday as accepted date
      //vm.newBirthday = new Date(vm.teachersTwo.profile.birthday)

      // Log the response
      $log.info('success', response);

    }, function errorCallback(response) {

      // Log the response
      $log.error('error', response);

    });

  // Edit user form
  vm.editDetails = function() {

    //vm.newBirthday = $filter('date')(vm.newBirthday, "yyyy-MM-dd");

    //$log.info(vm.newBirthday);

    var userDataEdit = {
      '_auth_key': $rootScope.authToken, // Authentication token of current user
      'firstName': vm.userData.profile.firstName,
      'lastName': vm.userData.profile.lastName,
      //'birthday': vm.newBirthday,
      'phone': vm.userData.profile.phone,
      'brief': vm.userData.profile.brief,
      'about': vm.userData.profile.about
    };

    $http.post($rootScope.apiUrl + 'users/update', userDataEdit)
      .then(function successCallback(response) {

        $state.reload();

        // Log the response
        $log.info('success', response);

      }, function errorCallback(response) {

        // Log the response
        $log.error('error', response);

      });

  }

  vm.uploadFiles = function(files, errFiles) {
    vm.files = files;
    vm.errFiles = errFiles;
    angular.forEach(files, function(file) {
      file.upload = Upload.upload({
        url: $rootScope.apiUrl + 'users/upload',
        data: {
          '_auth_key': $rootScope.authToken, // Authentication token of current user
          'file': file
        }
      });

      file.upload.then(function(response) {
        $timeout(function() {
          file.result = response.data;
          $state.reload();
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

  vm.userImageDelete = function(id) {

    var userImageDeleteData = {
      '_auth_key': $rootScope.authToken, // Authentication token of current user
      'id': id,
    };

    // Delete user image
    $http.post($rootScope.apiUrl + 'users/deletephoto', userImageDeleteData)
      .then(function successCallback(response) {

        // Log the response
        $log.info('success', response);

        $state.reload();

      }, function errorCallback(response) {

        // Log the response
        $log.error('error', response);

      });
  }

  vm.userImageDefault = function(id) {

    var userImageDefaultData = {
      '_auth_key': $rootScope.authToken, // Authentication token of current user
      'id': id,
    };

    // Set profile photo
    $http.post($rootScope.apiUrl + 'users/setmainphoto', userImageDefaultData)
      .then(function successCallback(response) {

        // Log the response
        $log.info('success', response);

        $state.reload();

      }, function errorCallback(response) {

        // Log the response
        $log.error('error', response);

      });
  }

  // Get current logged in user
  $http.get($rootScope.apiUrl + 'classes/categories')
    .then(function successCallback(response) {

      // The scope output
      vm.categories = response.data.data;

      // Log the response
      $log.info('success', response);

    }, function errorCallback(response) {

      // Log the response
      $log.error('error', response);

    });

  vm.bookingList = [
	   {id: 'approval', title: 'Approval'},
	   {id: 'instant', title: 'Instant'}
	];

	vm.venueList = [
	   {id: 'private', title: 'Private'},
	   {id: 'public', title: 'Public'},
	   {id: 'private-indoors', title: 'Private Indoors'},
	   {id: 'private-outdoors', title: 'Private Outdoors'},
	   {id: 'public-indoors', title: 'Public Indoors'},
	   {id: 'public-outdoors', title: 'Public Outdoors'}
	];

	vm.intervalList = [
	   {id: '1', title: 'Every Day'},
	   {id: '2', title: 'Every Week'},
	   {id: '3', title: 'Every 2 Weeks'},
	   {id: '4', title: 'Every Month'},
	   {id: '5', title: 'Every Year'}
	];

	vm.dayList = [
	   {id: '1', title: 'Sunday'},
	   {id: '2', title: 'Monday'},
	   {id: '3', title: 'Tuesday'},
	   {id: '4', title: 'Wednesday'},
	   {id: '5', title: 'Thursday'},
	   {id: '6', title: 'Friday'},
	   {id: '7', title: 'Saturday'}
	];

  //vm.startTime = new Date();

  vm.hstep = 1;
  vm.mstep = 15;

  vm.classCategory = function(category) {
    vm.subCategory = category;
  }

  vm.showAddClass = true;
  vm.showAddClassOptional = false;
  vm.showAddClassDates = false;
  vm.showAddClassSuccess = false;

	// Add class basic
	vm.addClass = function() {

		var classData = {
			'title': vm.title, //'rest class title'
			'teacherId': $rootScope.userId, //'78'
      'categoryId': vm.categoryId, //2
      'subcategoryId': vm.subcategoryId, //2
			'price': vm.price, //'60.25'
			'size': vm.size, //20
			'venueType': 'private' //'private'
		};

		$http.post($rootScope.apiUrl + 'classes/create', classData).success((data) => {
      vm.showAddClass = false;
      vm.showAddClassOptional = true;

      vm.currentClassTitle = vm.title;
		}).error((err, status) => {

		});
	}

  // Add class optional
  vm.addClassOptional = function() {

    // Get list of latest class added
    $http.get($rootScope.apiUrl + 'classes/one',  {params: {'_title': vm.currentClassTitle}})
      .then(function successCallback(response) {
        vm.currentClassId = response.data.data.id;

        // Update the class
        var classOptionalData = {
          '_auth_key': $rootScope.authToken,
          '_id': vm.currentClassId,
    			'brief': vm.brief, //'rest brief'
          'description': vm.description, //'some description'
        };

        $http.post($rootScope.apiUrl + 'classes/update', classOptionalData).success((data) => {
          vm.showAddClassOptional = false;
          vm.showAddClassDates = true;
        }).error((err, status) => {

        });

      }, function errorCallback(response) {
      });


  }

  vm.classOptionalSkip = function() {
    vm.showAddClassOptional = false;
    vm.showAddClassDates = true;
  }

  // Add class basic
  vm.addClassDates = function() {

    var dateString = vm.classDate,
        dateDay = dateString.getDate(),
        dateMonth = dateString.getMonth() + 1,
        dateYear = dateString.getFullYear(),
        date = dateYear + "-" + dateMonth + "-" + dateDay;

    vm.date = date;

    var startTimeHour = vm.classStartTime.getHours(),
        startTimeMinute = vm.classStartTime.getMinutes(),
        startTime = startTimeHour + ":" + startTimeMinute;

    var endTimeHour = vm.classEndTime.getHours(),
        endTimeMinute = vm.classEndTime.getMinutes(),
        endTime = endTimeHour + ":" + endTimeMinute;

    // Get list of latest class added
    $http.get($rootScope.apiUrl + 'classes/one',  {params: {'_title': vm.currentClassTitle}})
      .then(function successCallback(response) {
        vm.currentClassId = response.data.data.id;

        // Add class date
        var classOptionalData = {
          'id': vm.currentClassId,
          'datetimes': {[date]:[{"startTime": startTime, "endTime": endTime, "spots": vm.size}]}
        };

        //console.log(classOptionalData);

        $http.post($rootScope.apiUrl + 'classes/adddates', classOptionalData).success((data) => {
          vm.showAddClassDates = false;
          vm.showAddClassSuccess = true;
          console.log(data);
        }).error((err, status) => {

        });

      }, function errorCallback(response) {
      });
  }

  vm.classDatesSkip = function() {
    vm.showAddClassDates = false;
    vm.showAddClassSuccess = true;
  }

  // Get list of listings from user
  $http.get($rootScope.apiUrl + 'classes/list',  {params: {'_teacherId': $rootScope.userId}})
    .then(function successCallback(response) {
      vm.userListings = response.data.data;
    }, function errorCallback(response) {
    });

}

export default {
  name: 'UserCtrl',
  fn: UserCtrl
};
