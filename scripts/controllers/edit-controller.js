'use strict';

var EditCtrl = app.controller('EditCtrl', function($scope, $location, $routeParams, Slide, loadData) {

  var self = this;




  if ( $routeParams.id ) {
    self.original = loadData.original;
    $scope.item = loadData.copy;
  }


  $scope.hasChanges = function() {
    return ! angular.equals(self.original, $scope.item);
  };

  $scope.save = function() {
    if ( $routeParams.id  ) {
      $scope.item.update( function(item) {
        self.original = item;
      });
    }
    else {
      $scope.item.created_on = (new Date()).toJSON();
      Slide.save($scope.item, function (item) {
        $location.path('/slides/' + item._id.$oid + '/edit' );
      });
    }
  };

  $scope.remove = function() {

    if ($scope.item.description !== '') {
      alert('You must save a blank description field before removing.');
      return;
    }

    $scope.item.destroy(function() {
      $location.path('/slides');
    });

  };

  $scope.gotoList = function() {
    $location.path('/slides');
  };

  $scope.gotoSlides = function() {
    $location.path('/slides/' + $scope.item._id.$oid );
  };

});


EditCtrl.editData = function ($q, $rootScope, $route, Slide) {

  $rootScope.isVisible = true;

  var defer = $q.defer();
  var id = $route.current.params.id;

  if ( id ) {

    Slide.get({id: id},
      function(slide) {

        defer.resolve( { original: slide, copy: new Slide(slide) } );
        $rootScope.isVisible = false;
      },
      function () {
        defer.reject();
      }
    );

  }
  else {

    defer.resolve();
    $rootScope.isVisible = false;
    
  }

  return defer.promise;

};


