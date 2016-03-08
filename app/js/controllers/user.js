function UserCtrl($http, $rootScope, $log, $filter, Upload, $timeout, $state) {
  'ngInject';

  // ViewModel
  const vm = this;

  //vm.teacherEmail = "";
  vm.isCollapsed = true;

  // Get Users to be displayed in select input
  // $http.get($rootScope.apiUrl + 'users/list')
  //   .then(function successCallback(response) {
	//
  //     // The scope output
  //     vm.teachers = response.data.data;
	//
  //     // Log the response
  //     $log.info('success', response);
	//
  //   }, function errorCallback(response) {
	//
  //     // Log the response
  //     $log.error('error', response);
	//
  //   });

  // Get current logged in user
  //vm.teacherEmailClick = function() {
    $http.get($rootScope.apiUrl + 'users/one?auth_key=' + $rootScope.authToken)
      .then(function successCallback(response) {

        // The scope output
        vm.teachersTwo = response.data.data;

        // Need to output birthday as accepted date
        //vm.newBirthday = new Date(vm.teachersTwo.profile.birthday)

        // Log the response
        $log.info('success', response);

      }, function errorCallback(response) {

        // Log the response
        $log.error('error', response);

      });
  //}

  // Edit user form
  vm.editDetails = function() {

    //vm.newBirthday = $filter('date')(vm.newBirthday, "yyyy-MM-dd");

    //$log.info(vm.newBirthday);

    var userData = {
      '_auth_key': $rootScope.authToken, // Authentication token of current user
      'firstName': vm.teachersTwo.profile.firstName,
      'lastName': vm.teachersTwo.profile.lastName,
      //'birthday': vm.newBirthday,
      'brief': vm.teachersTwo.profile.brief,
      'about': vm.teachersTwo.profile.about
    };

    $http.post($rootScope.apiUrl + 'users/update', userData)
      .then(function successCallback(response) {

        // Log the response
        $log.info('success', response);

      }, function errorCallback(response) {

        // Log the response
        $log.error('error', response);

      });

  }

  // vm.addImage = function() {
  //   var f = document.getElementById('file').files[0],
  //     	r = new FileReader();
  //   r.onloadend = function(e) {
  //     var photo = e.target.result;
  //     //send you binary data via $http or $resource or do anything else with it
	//
	// 		$log.info(r.readAsDataURL(e));
	//
	// 		var imageData = {
	// 			'_email': $rootScope.rootUserEmail, // Email of current user
	// 			'photos': r,
	// 		};
	//
  //     $http.post($rootScope.apiUrl + 'users/upload', imageData)
  //       .then(function successCallback(response) {
	//
  //         // Log the response
  //         $log.info('success', response);
	//
  //       }, function errorCallback(response) {
	//
  //         // Log the response
  //         $log.error('error', response);
	//
  //       });
  //   }
  //   r.readAsBinaryString(f);
  // }




			vm.uploadFiles = function (files) {
		        vm.files = files;
		        if (files && files.length) {
		            Upload.upload({
		                url: $rootScope.apiUrl + 'users/upload',
		                data: {
													_email: $rootScope.rootUserEmail, // Email of current user
													imageFiles: files
												}
		            }).then(function (response) {
		                $timeout(function () {
		                    vm.result = response.data;
		                });
		            }, function (response) {
		                if (response.status > 0) {
		                    vm.errorMsg = response.status + ': ' + response.data;
		                }
		            }, function (evt) {
		                vm.progress =
		                    Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
		            });
		        }
		    };



}

export default {
  name: 'UserCtrl',
  fn: UserCtrl
};
