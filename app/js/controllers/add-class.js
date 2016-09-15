function UserAddClassCtrl($rootScope, $http, $log) {
  'ngInject';

  // ViewModel
  const vm = this;

  // Add class basic
	vm.addClass = function() {

    // Price buttons and custom price
    vm.customPrice = false;
    if (vm.priceRadio == 'custom') {
      vm.price = vm.priceInput;
    } else {
      vm.price = vm.priceRadio;
    }

    // Size buttons and custom size
    vm.customSize = false;
    if (vm.sizeRadio == 'custom') {
      vm.size = vm.sizeInput;
    } else {
      vm.size = vm.sizeRadio;
    }

		var classData = {
			'title': vm.title,
			'teacherId': 200, //TODO - get from $rootScope.userData.id
      'categoryId': vm.categoryId,
      'subcategoryId': vm.subcategoryId,
			'price': vm.price,
			'size': vm.size,
			'venueType': 'private' // Default for now
		};

		$http.post($rootScope.apiUrl + 'classes/create', classData).success((data) => {
      vm.showAddClass = false;
      vm.showAddClassOptional = true;

      vm.currentClassTitle = vm.title;
		}).error((err, status) => {

		});
	}

}

export default {
  name: 'UserAddClassCtrl',
  fn: UserAddClassCtrl
};
