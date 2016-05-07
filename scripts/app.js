'use strict';

var app = angular.module('slides', ['ngResource', 'ngCookies'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/slides', {
        templateUrl: 'views/list.html',
        controller: 'ListCtrl',
        resolve: {
          loadData: ListCtrl.listData
        }
      })
      .when('/slides/new', {
        templateUrl: 'views/edit.html',
        controller: 'EditCtrl',
        resolve: {
          loadData: EditCtrl.editData
        }
      })
      .when('/slides/:id', {
        templateUrl: 'views/read.html',
        controller: 'ReadCtrl',
        resolve: {
          loadData: ReadCtrl.readData
        }
      })
      .when('/slides/:id/edit', {
        templateUrl: 'views/edit.html',
        controller: 'EditCtrl',
        resolve: {
          loadData: EditCtrl.editData
        }
      })
      .otherwise({
        redirectTo: '/slides'
      });
  });


app.controller('AppCtrl', function ($rootScope) {
  $rootScope.$on('$routeChangeError', function () {
    console.log('Failed to load data.');
  });
});