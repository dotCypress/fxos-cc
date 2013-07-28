define(['angular'], function() {
  var app = angular
    .module('app', ['mobile-navigate'])
    .directive('dateFix', function() {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ngModel) {
          element.on('change', function () {
            scope.$apply(function() {
              ngModel.$setViewValue(element.val());
            });
          });
        }
      };
    })
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/dashboard.html',
          controller: 'DashboardCtrl'
        })
        .when('/about', {
          templateUrl: 'views/about.html',
          controller: 'AboutCtrl'
        })
        .when('/edit-task/:id/:pid/:cid/:today', {
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
        .when('/project/:id', {
          templateUrl: 'views/project.html',
          controller: 'ProjectCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    }]);

  app.controller('MainCtrl', ['$scope', '$navigate', '$location', 'database', function($scope, $navigate, $location, database) {
    database.buildPredefined();
    var search = $location.search();
    $navigate.go($location.path(), 'none').search(search);
  }]);

  app.state={};
  return app;
});
