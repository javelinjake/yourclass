'use strict';

function OnConfig($stateProvider, $locationProvider, $urlRouterProvider) {
  'ngInject';

  $locationProvider.html5Mode(true);

  $stateProvider
  .state('Home', {
    url: '/',
    controller: 'MainCtrl as home',
    templateUrl: 'home.html',
    title: 'Home'
  })
  .state('About', {
    url: '/about',
    templateUrl: 'about.html',
    title: 'About'
  })
  .state('Teach', {
    url: '/teach',
    templateUrl: 'teach.html',
    title: 'Teach'
  })
  .state('Learn', {
    url: '/learn',
    templateUrl: 'learn.html',
    title: 'Learn'
  });

  $urlRouterProvider.otherwise('/');

}

export default OnConfig;