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
  .state('Search', {
    url: '/search',
	controller: 'SearchCtrl as search',
    templateUrl: 'search.html',
    title: 'Search'
  })
  .state('Class', {
    url: '/class/:classId',
	controller: 'ClassCtrl as class',
    templateUrl: 'class.html',
    title: 'Class',
	  resolve: {
		  getClassId: function($stateParams){
              return $stateParams.classId;
          }
	  }
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