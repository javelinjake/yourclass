'use strict';

function EnquireDirective() {

  return {
    restrict: 'EA',
    templateUrl: 'directives/enquire.html',
    scope: {
      title: '@',
      message: '@enquireDirective'
    }
  };
}

export default {
  name: 'enquireDirective',
  fn: EnquireDirective
};
