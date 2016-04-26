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

	// Create user
	vm.addClass = function() {

    var startTimeHour = vm.startTime.getHours(),
        startTimeSuffix = (startTimeHour >= 12)? 'pm' : 'am',
        startTimeHour = (startTimeHour > 12)? startTimeHour -12 : startTimeHour,
        startTimeHour = (startTimeHour == '00')? 12 : startTimeHour,
        startTimeMinute = vm.startTime.getMinutes(),

        // The start time - e.g. 12:00pm
        startTime = startTimeHour + ":" + startTimeMinute + startTimeSuffix;

    var endTimeHour = vm.endTime.getHours(),
        endTimeSuffix = (endTimeHour >= 12)? 'pm' : 'am',
        endTimeHour = (endTimeHour > 12)? endTimeHour -12 : endTimeHour,
        endTimeHour = (endTimeHour == '00')? 12 : endTimeHour,
        endTimeMinute = vm.endTime.getMinutes(),

        // The end time - e.g. 3:00pm
        endTime = endTimeHour + ":" + endTimeMinute + endTimeSuffix;

		var classData = {
			'title': vm.title, //'rest class title'
			'brief': vm.brief, //'rest brief'
			//'description': vm.description, //'some description'
			'teacherId': $rootScope.userId, //'78'
      'categoryId': vm.categoryId, //2
      'subcategoryId': vm.subcategoryId, //2
			'intervalId': 1, //2
			'startTime': startTime, //'02:30 PM'
			'endTime': endTime, //'05:00 PM'
			'startDate': '2016-03-29', //'2015-12-22'
			'endDate': '2017-03-29', //'2015-12-30'
			'dayIds': [1,2,3,4,5,6,7], //[2,4,6]
			'price': vm.price, //'60.25'
			'size': vm.size, //20
			'bookingType': 'instant', //'instant'
			'venueType': 'private' //'private'
		};

		console.log(classData);

		$http.post($rootScope.apiUrl + 'classes/create', classData).success((data) => {
			if (data.result === 0) {
				vm.formDone = false;
			} else {
				vm.formDone = true;
			}

			vm.formSent = true;
		}).error((err, status) => {
			vm.formSent = true;

      $log.error(err);
      $log.error(status);
		});
	}

}

export default {
  name: 'UserCtrl',
  fn: UserCtrl
};
