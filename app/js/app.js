define(['angular'], function() {
  var app = angular
    .module('app', ['mobile-navigate'])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/dashboard.html',
          controller: 'DashboardCtrl'
        })
        .when('/edit-task/:id/:pid/:cid', {
          templateUrl: 'views/edit-task.html',
          controller: 'EditTaskCtrl'
        })
        .when('/edit-context/:id', {
          templateUrl: 'views/edit-context.html',
          controller: 'EditContextCtrl'
        })
        .when('/edit-project/:id', {
          templateUrl: 'views/edit-project.html',
          controller: 'EditProjectCtrl'
        })
        .when('/context/:id', {
          templateUrl: 'views/context.html',
          controller: 'ContextCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    }]);

  app.controller('MainCtrl', ['$scope', '$navigate', '$location', function($scope, $navigate, $location) {
    var search = $location.search();
    $navigate.go($location.path(), 'none').search(search);
  }]);
  app.state={};
  return app;
});
