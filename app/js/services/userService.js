'use strict';

function UserService($http) {
  'ngInject';

  const service = {};

  service.get = function() {
    return new Promise((resolve, reject) => {
      $http.get('http://yourclass.vkonovalenko.dev.ideus.biz/web/rest/users').success((data) => {
        resolve(data);
      }).error((err, status) => {
        reject(err, status);
      });
    });
  };

  return service;

}

export default {
  name: 'UserService',
  fn: UserService
};