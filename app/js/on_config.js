function OnConfig($stateProvider, $locationProvider, $urlRouterProvider) {
  'use strict';
  'ngInject';

  $locationProvider.html5Mode(true);

  app.config(function($mdThemingProvider) {
    $mdThemingProvider.setDefaultTheme('none');
  });

  $stateProvider
    .state('Home', {
      url: '/',
      controller: 'MainCtrl as home',
      templateUrl: 'home.html',
      title: 'Home',
      class: 'home'
    })
    .state('Search', {
      url: '/search',
      controller: 'SearchCtrl as search',
      templateUrl: 'search.html',
      title: 'Search',
      class: 'search'
    })
    .state('Verify', {
      url: '/verificate',
      controller: 'VerifyCtrl as verify',
      templateUrl: 'verify.html',
      title: 'Verify Email Address'
    })
    .state('Class', {
      url: '/class/:classAlias',
      controller: 'ClassCtrl as class',
      templateUrl: 'class.html',
      title: 'Class',
      resolve: {
        getClassAlias: function($stateParams) {
          return $stateParams.classAlias;
        }
      }
    })
    .state('user', {
      controller: 'UserCtrl as user',
      templateUrl: 'user/user.html'
    })
    .state('user.dashboard', {
      url: '/user/dashboard',
      controller: 'userDashboardCtrl as dashboard',
      templateUrl: 'user/dashboard.html',
      title: 'User Dashboard',
      class: 'user-dashboard'
    })
    .state('user.edit', {
      url: '/user/edit',
      controller: 'userEditCtrl as edit',
      templateUrl: 'user/edit.html',
      title: 'User Edit',
      class: 'user-edit'
    })
    .state('user.class', {
      url: '/user/class',
      controller: 'userClassCtrl as class',
      templateUrl: 'user/class.html',
      title: 'User Class',
      class: 'user-class'
    });

  $urlRouterProvider.otherwise('/');

}

export default OnConfig;
