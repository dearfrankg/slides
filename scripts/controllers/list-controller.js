'use strict';

var ListCtrl = app.controller('ListCtrl', function ($scope, $location, $cookies, Slide, loadData) {

  $scope.getMoment = function (date) {
    return moment(date).fromNow();
  };

  $scope.initialize = function () {

    $scope.projects = loadData;

    $scope.query = '';

    $scope.sort = {
      type: $cookies.sortType || '-created_on',
      button: {
        names: [ 'Newest', 'Alphabetic' ],
        values: [ '-created_on',  '+name' ]
      }
    };

    $scope.view = {
      type: $cookies.viewType || 'Normal',
      button: {
        names: ['Compact', 'Normal', 'Large'],
        values: ['Compact', 'Normal', 'Large']
      }
    };

  };

  $scope.create = function(){
    $location.path('/slides/new');
  };

  $scope.edit = function(id){
    $location.path('/slides/'+id+'/edit');
  };

  $scope.show = function(id){
    $location.path('/slides/'+id);
  };

  $scope.initialize();

  $scope.$watch('sort.type +  view.type', function () {
    $cookies.sortType = $scope.sort.type;
    $cookies.viewType = $scope.view.type;
  });


});


ListCtrl.listData = function ($q, $rootScope, Slide) {

  $rootScope.isVisible = true;
  var defer = $q.defer();

  Slide.query(
    function (slides) {
        defer.resolve(slides);
        $rootScope.isVisible = false;
    },
    function () {
      defer.reject();
    }
  );

  return defer.promise;

};





























