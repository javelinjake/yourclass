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
    .state('Admin', {
      url: '/admin',
      controller: 'AdminCtrl as admin',
      templateUrl: 'admin.html',
      title: 'Admin',
      class: 'admin'
    });

  $urlRouterProvider.otherwise('/');

}

export default OnConfig;
