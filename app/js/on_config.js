function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, $breadcrumbProvider) {
  'ngInject';

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('Home', {
      url: '/',
      controller: 'HomeCtrl as home',
      templateUrl: 'home.html',
      title: 'Home',
      class: 'home',
      ncyBreadcrumb: {
        label: 'Home'
      }
    })
    .state('Search', {
      url: '/search',
      controller: 'SearchCtrl as search',
      templateUrl: 'search.html',
      title: 'Search',
      class: 'search',
      ncyBreadcrumb: {
        label: 'Search'
      }
    })
    .state('Verify', {
      url: '/verificate',
      controller: 'VerifyCtrl as verify',
      templateUrl: 'verify.html',
      title: 'Verify Email Address',
      ncyBreadcrumb: {
        label: 'Verify'
      }
    })
    .state('Class', {
      url: '/class/:classAlias',
      controller: 'ClassCtrl as class',
      templateUrl: 'class.html',
      title: 'Class',
      class: 'class',
      resolve: {
        getClassAlias: function($stateParams) {
          return $stateParams.classAlias;
        }
      },
      ncyBreadcrumb: {
        label: 'Class'
      }
    })
    .state('user', {
      controller: 'UserCtrl as user',
      templateUrl: 'user/user.html',
      ncyBreadcrumb: {
        skip: true
      }
    })
    .state('user.dashboard', {
      url: '/user/dashboard',
      controller: 'UserCtrl as dashboard',
      templateUrl: 'user/dashboard.html',
      title: 'User Dashboard',
      class: 'user-dashboard',
      ncyBreadcrumb: {
        label: 'Account Dashboard'
      }
    })
    .state('user.edit', {
      url: '/user/edit',
      controller: 'UserCtrl as edit',
      templateUrl: 'user/edit.html',
      title: 'User Edit',
      class: 'user-edit',
      ncyBreadcrumb: {
        label: 'Account Edit'
      }
    })
    .state('user.class', {
      url: '/user/class',
      controller: 'UserCtrl as class',
      templateUrl: 'user/class.html',
      title: 'User Class',
      class: 'user-class',
      ncyBreadcrumb: {
        label: 'Add class'
      }
    });

  $urlRouterProvider.otherwise('/');
  $breadcrumbProvider.setOptions({
      prefixStateName: 'Home'
    });

}

export default OnConfig;
