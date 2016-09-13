function SearchCtrl($http, $rootScope, $scope, $log, $timeout) {
  'ngInject';

  // ViewModel
  const vm = this;


  // At the moment I am just calling all of the classes, we will need to have pagination (20 per page)
  /* $http.get($rootScope.apiUrl + 'classes/list')
    .then(function successCallback(response) {
      vm.classesList = response.data.data;
      $log.info('success' + response);
    }, function errorCallback(response) {
      $log.error('error' + response);
    }); */

  /* Get list of Categories */
  /* $http.get($rootScope.apiUrl + 'classes/categories')
    .then(function successCallback(response) {
      vm.categoriesList = response.data.data;
    }, function errorCallback(response) {
    }); */

/*
  M({

    def: {
      price: {
        from: 0,
        to: 60
      },
      raiting: 2.2,
      date: asd,
      distance: 30,
      size: 5
    }

  });

  this.m = new M();
  m.toJSON();

  m.set({distance: 20});

*/

  var SearchItem = function(element, date, time) {
    this.price = element.price || 'free';

    this.title = element.title || 'No set title yet';
    this.location = element.venue || 'No set location yet';

    this.rating = parseFloat(element.rating) * 2;

    this.spotsBooked = parseInt(element.bookings) || 0;
    this.spotsLeft = (time && parseInt(time.spots)) || 0;

    this.teacher = 'Teacher #' + element.teacher.id;

    var dateString = (element.dates[0] && element.dates[0].classDate) || false;
    var timeStart  = (element.dates[0] && element.dates[0].times[0] && element.dates[0].times[0].startTime) || '00:00:00';
    var timeEnd    = (element.dates[0] && element.dates[0].times[0] && element.dates[0].times[0].endTime) || '00:00:00';

    this.dateStart = dateString ? new Date(dateString + ' ' + timeStart) : undefined;
    this.dateEnd = dateString ? new Date(dateString + ' ' + timeEnd) : undefined;
  }

  $http.get($rootScope.apiUrl + 'classes/list')
    .then(function successCallback(response) {
      var data = response.data.data;
      var classesArray = [];

      // vm.classesList = new CollectionList(data).toJSON();

      data.forEach(function(element, i, arr) {
        var item = new SearchItem(element);
        classesArray.push(item);
      });

      vm.classesList = classesArray;
      vm.responseData = data;

      // Refresh filter slider:
      vm.slider.refresh();

      // Console success message:
      $log.info('success' + response);
    }, function errorCallback(response) {
      // Console error message:
      $log.error('error' + response);
    });




  /* Number of displayed results */
  var limitStep = 20;
  vm.resultsLimit = limitStep;
  vm.showMoreResults = function() {
    vm.resultsLimit += limitStep;
  };

  /* Price slider variables */
  var sliderMin = 5;
  var sliderMax = 45;
  var sliderFloor = 0;
  var sliderCeil = 60;

  /* Slider */
  vm.slider = {
    min: sliderMin,
    max: sliderMax,
    options: {
      floor: sliderFloor,
      floorLabel: 'free',
      ceil: sliderCeil,
      ceilLabel: '$' + sliderCeil,
      step: 1,
      hidePointerLabels: true,
      translate: function(value, sliderId, label) {
        switch (label) {
          case 'floor':
            return 'Free';
          case 'ceil':
            return '$' + value;
          default:
            return value;
        }
      },
      onEnd: function(sliderId, modelValue, highValue, pointerType) {
        vm.filters.price.start = modelValue;
        vm.filters.price.end = highValue;
      }
    },
    refresh: function() {
      $timeout(function() {
        $scope.$broadcast('rzSliderForceRender');
      });
    }
  };

  /* Rating */
  vm.rating = {
    titles: ['0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5']
  };

  /* Datepicker Popup */
  vm.datepicker = {
    state: false,
    format: "dd/MM",
    show: function() {
      this.state = true;
    },
    hide: function() {
      this.state = false;
    }
  };

  /* Distance select */
  vm.distances = [
    { id: '0',  title: 'Any'  },
    { id: '2',  title: '2km'  },
    { id: '5',  title: '5km'  },
    { id: '10', title: '10km' },
    { id: '20', title: '20km' },
    { id: '30', title: '30km' }
  ];

  /* Size select */
  vm.sizes = [
    { id: '0',  title: 'Any'  },
    { id: '1',  title: '1'    },
    { id: '2',  title: '2+'   },
    { id: '5',  title: '5+'   },
    { id: '10', title: '10+'  }
  ];

  /* Search filter */
  vm.filters = {
    price: {
      start: sliderMin,
      end: sliderMax
    },
    rating: 0,
    date: false,
    distance: vm.distances[2].id,
    size: vm.sizes[2].id
  };

}

export default {
  name: 'SearchCtrl',
  fn: SearchCtrl
};
