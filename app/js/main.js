import angular from 'angular';

// angular modules
import constants from './constants';
import onConfig  from './on_config';
import onRun     from './on_run';
import 'angular-ui-router';
import 'ngMap';
import 'angular-ui-bootstrap';
import 'angular-animate';
import 'angular-material';
import 'angularjs-slider';
import 'ngsticky';
import 'angular-dropdowns';
import 'angular-cookies';
import 'ng-file-upload';
// import 'ng-image-gallery';
import 'angular-breadcrumb';
import 'angular-input-stars';
import 'angular-ui-mask';
//import 'ng-password-meter';
import './templates';
import './filters';
import './controllers';
import './services';
import './directives';

// create and bootstrap application
const requires = [
  'ui.router',
  'ngMap',
  'ngAnimate',
  'ngMaterial',
  'rzModule',
  'sticky',
  'ngDropdowns',
  'ui.bootstrap',
  'ngCookies',
  'ngFileUpload',
  'templates',
  // 'thatisuday.ng-image-gallery',
  'ncy-angular-breadcrumb',
  'angular-input-stars',
  'ui.mask',
  // 'ngPasswordMeter',
  'app.filters',
  'app.controllers',
  'app.services',
  'app.directives'
];

// mount on window for testing
window.app = angular.module('app', requires);

angular.module('app').constant('AppSettings', constants);

angular.module('app').config(onConfig);

angular.module('app').run(onRun);

angular.bootstrap(document, ['app'], {
  strictDi: true
});
