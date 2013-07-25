define(['app'], function(app) {
  app.controller('EditTaskCtrl', ['$scope', '$routeParams', '$navigate', 'database',
    function EditTaskCtrl($scope, $routeParams, $navigate, database) {
      $scope.close = function(){       
        $navigate.goBack();
      };
    }
  ]);
});
