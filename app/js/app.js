define(['angular'], function() {
  var app = angular
    .module('app', ['mobile-navigate'])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/dashboard.html',
          controller: 'DashboardCtrl'
        })
        .when('/editTask', {
          templateUrl: 'views/edit-task.html',
          controller: 'EditTaskCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    }]);

  app.controller('MainCtrl', ['$scope', '$navigate', '$location', function($scope, $navigate, $location) {
    var search = $location.search();
    $navigate.go($location.path(), 'none').search(search);
  }]);

  return app;
});
