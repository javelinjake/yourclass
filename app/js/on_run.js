function OnRun($rootScope, $stateParams, AppSettings, $uibModal, $log) {  'use strict';  'ngInject';  //change page title based on state  $rootScope.$on('$stateChangeSuccess', (event, toState) => {    $rootScope.pageTitle = '';    $rootScope.pageClass = '';    if (toState.title) {      $rootScope.pageTitle += toState.title;      $rootScope.pageTitle += ' \u2014 ';    }    if (toState.class) {      $rootScope.pageClass += toState.class;      $log.info($rootScope.pageClass);    }    $rootScope.pageTitle += AppSettings.appTitle;  });  $rootScope.apiUrl = AppSettings.apiUrl;  $rootScope.SignUpModal = function(size) {    var modalInstance = $uibModal.open({      animation: $rootScope.animationsEnabled,      templateUrl: 'modals/signup.html',      controller: ['$scope', '$http', '$rootScope', SignUpCtrl],      size: size    });  };  $rootScope.SignInModal = function(size) {    var modalInstance = $uibModal.open({      animation: $rootScope.animationsEnabled,      templateUrl: 'modals/signin.html',      controller: ['$scope', '$http', '$rootScope', SignInCtrl],      size: size    });  };  function SignUpCtrl($scope, $http, $rootScope) {    // Create user    $scope.SignUpForm = function() {      var signUpData = {        'firstName': $scope.firstname,        'lastName': $scope.lastname,        'email': $scope.email,        'password': $scope.password      };      $http.post($rootScope.apiUrl + 'users/create', signUpData).success((data) => {        if (data.result === 0) {          $scope.formDone = false;        } else {          $scope.formDone = true;        }        $scope.formSent = true;      }).error((err, status) => {        $scope.formSent = true;      });    };  }  function SignInCtrl($scope, $http, $rootScope) {    // Create user    $scope.SignInForm = function() {      var signInData = {        'email': $scope.email,        'password': $scope.password      };      $http.post($rootScope.apiUrl + 'users/login', signInData).success((data) => {        if (data.result === 0) {          $scope.formDone = false;        } else {          $scope.formDone = true;        }        $scope.formSent = true;      }).error((err, status) => {        $scope.formSent = true;      });    };  }}export default OnRun;