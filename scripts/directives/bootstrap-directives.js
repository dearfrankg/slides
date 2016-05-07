'use strict';

app.directive('buttonsRadio', function() {

  return {
    restrict: 'E',
    scope: { model: '=', options:'='},
    controller: function($scope){
      $scope.activate = function(options, option){
        $scope.model = options.values[ options.names.indexOf(option) ];
      };
    },
    template: '' +
    '<button ' +
      'ng-repeat="option in options.names" '+
      'type="button" class="btn btn-small btn-primary" '+
      'ng-class="{active: options.values[ options.names.indexOf(option) ] == model }"'+
      'ng-click="activate(options, option)">{{option}}'+
    '</button>'
  };

});

      // <buttons-radio 
      // class="btn-group" 
      // data-toggle="buttons-radio" 
      // model="sort.type" 
      // options="sort.names" 
      // ></buttons-radio>
