

function ClassCtrl($http, $rootScope, $scope, $log, getClassAlias) {
	'ngInject';

	// ViewModel
	const vm = this;

	// Get Classes
	$http.get($rootScope.apiUrl + 'classes/one', {params: {_alias: getClassAlias}}).success((data) => {
		vm.class = data.data;

    // Update booking price
    vm.booking.price = vm.class.price;
	}).error((err, status) => {});

  vm.booking = {
    spots: 6,
    friends: {
      count: 0,
      less: function() {
        var count = vm.booking.friends.count;
        vm.booking.friends.count = count > 0 ? --count : 0;
      },
      more: function() {
        var count = vm.booking.friends.count,
            limit = vm.booking.friends.limit;
        vm.booking.friends.count = count < limit ? ++count : limit;
      },
      limit: 5
    },
    list: new Array(10),
    price: 0,
    select: function(e) {
      console.log(arguments);
    },
    selected: [],
    view: {
      expanded: true,
      toggle: function() {
        vm.booking.view.expanded = !vm.booking.view.expanded;
      },
      limit: 5
    },
    submit: function() {
      console.log('submit');

      if (vm.booking.selected.length == 0) {
        vm.booking.error = true;
      } else {
        vm.booking.error = false;
      }
    },
    error: false
  };

}

export default {
	name: 'ClassCtrl',
	fn: ClassCtrl
};
