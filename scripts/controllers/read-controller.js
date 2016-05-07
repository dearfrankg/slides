'use strict';

var ReadCtrl = app.controller('ReadCtrl', function($scope, $location, $routeParams, loadData) {

  $scope.markdown = loadData;

  $scope.gotoList = function() {
    $location.path('/slides');
  };

  $scope.gotoEdit = function() {
    $location.path('/slides/' + $routeParams.id + '/edit' );
  };



});


ReadCtrl.readData = function ($q, $rootScope, $route, Slide) {

  $rootScope.isVisible = true;
  var defer = $q.defer();

  Slide.get({id: $route.current.params.id},
    function(slide) {
      defer.resolve(slide.data);
      $rootScope.isVisible = false;
    },
    function () {
      defer.reject();
    }
  );

  return defer.promise;

};
