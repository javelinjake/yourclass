function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, $breadcrumbProvider, $httpProvider) {
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
      url: '/search/:searchCategory?location=',
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
    .state('Checkout', {
      url: '/class/:classAlias/booking',
      controller: 'CheckoutCtrl as checkout',
      templateUrl: 'checkout.html',
      title: 'Booking',
      class: 'checkout',
      ncyBreadcrumb: {
        label: 'Booking'
      }
    })
    .state('User', {
      url: '/user/user',
      controller: 'UserCtrl as user',
      templateUrl: 'user/edit-profile.html',
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
      url: '/user/edit-class/:classEditName',
      controller: 'UserEditClassCtrl as userEditClass',
      templateUrl: 'user/edit-class.html',
      title: 'User Edit Class',
      class: 'user-edit-class',
      resolve: {
        getEditClassAlias: function($stateParams) {
          return $stateParams.classEditName;
        }
      },
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

  // TODO - Need to change for production, should just be able to remove
  // $httpProvider.defaults.headers.common = {};
  // $httpProvider.defaults.headers.post = {};
  // $httpProvider.defaults.headers.put = {};
  // $httpProvider.defaults.headers.patch = {};

}

export default OnConfig;
