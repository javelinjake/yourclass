'use strict';

function OnRun($rootScope, $stateParams, AppSettings) {
  'ngInject';

  // change page title based on state
  $rootScope.$on('$stateChangeSuccess', (event, toState) => {
    $rootScope.pageTitle = '';

    if ( toState.title ) {
      $rootScope.pageTitle += toState.title;
      $rootScope.pageTitle += ' \u2014 ';
    }

    $rootScope.pageTitle += AppSettings.appTitle;
	
	$rootScope.apiUrl = AppSettings.apiUrl;
  });

}

export default OnRun;