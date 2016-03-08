

function AdminCtrl($http, $rootScope) {
	'ngInject';

	// ViewModel
	const vm = this;

	vm.bookingList = [
	   {id: 'approval', title: 'Approval'},
	   {id: 'instant', title: 'Instant'}
	];

	vm.venueList = [
	   {id: 'private', title: 'Private'},
	   {id: 'public', title: 'Public'},
	   {id: 'private-indoors', title: 'Private Indoors'},
	   {id: 'private-outdoors', title: 'Private Outdoors'},
	   {id: 'public-indoors', title: 'Public Indoors'},
	   {id: 'public-outdoors', title: 'Public Outdoors'}
	];

	vm.intervalList = [
	   {id: '1', title: 'Every Day'},
	   {id: '2', title: 'Every Week'},
	   {id: '3', title: 'Every 2 Weeks'},
	   {id: '4', title: 'Every Month'},
	   {id: '5', title: 'Every Year'}
	];

	vm.dayList = [
	   {id: '1', title: 'Sunday'},
	   {id: '2', title: 'Monday'},
	   {id: '3', title: 'Tuesday'},
	   {id: '4', title: 'Wednesday'},
	   {id: '5', title: 'Thursday'},
	   {id: '6', title: 'Friday'},
	   {id: '7', title: 'Saturday'}
	];

	// Create class
	vm.addClass = function() {

		var classData = {
			'title': vm.title, //'rest class title'
			'brief': vm.brief, //'rest brief'
			'description': vm.description, //'some description'
			'teacherId': vm.teacherId, //'78'
			'intervalId': vm.intervalId, //2
			'startTime': vm.startTime, //'02:30 PM'
			'endTime': vm.endTime, //'05:00 PM'
			'startDate': vm.startDate, //'2015-12-22'
			'endDate': vm.endDate, //'2015-12-30'
			'dayIds': [vm.dayIds], //[2,4,6]
			'price': vm.price, //'60.25'
			'size': vm.size, //20
			'bookingType': vm.bookingType, //'instant'
			'venueType': vm.venueType //'private'
		};

		console.log(classData);

		$http.post($rootScope.apiUrl + 'classes/create', classData).success((data) => {
			if (data.result === 0) {
				vm.formDone = false;
			} else {
				vm.formDone = true;
			}

			vm.formSent = true;
		}).error((err, status) => {
			vm.formSent = true;
		});
	}

	// Get Users
	$http.get($rootScope.apiUrl + 'users/list').success((data) => {
		vm.teachers = data.data;
	}).error((err, status) => {});

}

export default {
	name: 'AdminCtrl',
	fn: AdminCtrl
};
