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
    .state('User', {
      controller: 'UserCtrl as user',
      templateUrl: 'user/user.html',
      ncyBreadcrumb: {
        skip: true
      }
    })
    .state('User-Dashboard', {
      url: '/user/dashboard',
      controller: 'UserDashboardCtrl as userDashboard',
      templateUrl: 'user/dashboard.html',
      title: 'Dashboard',
      class: 'user-dashboard',
      ncyBreadcrumb: {
        label: 'Dashboard'
      }
    })
    .state('User-Add-Class', {
      url: '/user/add-class',
      controller: 'UserAddClassCtrl as userAddClass',
      templateUrl: 'user/add-class.html',
      title: 'Add Class',
      class: 'user-add-class',
      ncyBreadcrumb: {
        label: 'Add class'
      }
    })
    .state('User-Edit-Class', {
      url: '/user/edit-class',
      controller: 'UserEditClassCtrl as userEditClass',
      templateUrl: 'user/edit-class.html',
      title: 'User Edit Class',
      class: 'user-edit-class',
      ncyBreadcrumb: {
        label: 'Edit Class'
      }
    })
    .state('user.listings', {
      url: '/user/listings',
      templateUrl: 'user/listings.html',
      title: 'Listings',
      class: 'user-listings',
      ncyBreadcrumb: {
        label: 'Listings'
      }
    })
    .state('user.classes', {
      url: '/user/classes',
      templateUrl: 'user/classes.html',
      title: 'classes',
      class: 'user-classes',
      ncyBreadcrumb: {
        label: 'classes'
      }
    })
    .state('user.edit-profile', {
      url: '/user/edit-profile',
      templateUrl: 'user/edit-profile.html',
      title: 'User Edit Profile',
      class: 'user-edit-profile',
      ncyBreadcrumb: {
        label: 'Edit Profile'
      }
    });


  $urlRouterProvider.otherwise('/');
  $breadcrumbProvider.setOptions({
    prefixStateName: 'Home'
  });

}

export default OnConfig;
