define(['app'], function(app) {
  app.controller('ContextCtrl', ['$scope', '$routeParams', '$navigate', 'database',
    function ContextCtrl($scope, $routeParams,  $navigate, database) {

      database.getContextById($routeParams.id, function(err, context){
        $scope.context = context;
        database.getContextTasks($routeParams.id, function(err, tasks){          
          $scope.tasks = tasks;
          $scope.$apply();
        });        
      });

      $scope.close = function(){
        $navigate.goBack();
      };

      $scope.editTask = function(id){
        $navigate.go('/edit-task/' + id + '//', 'modal');
      }
    }
  ]);
});
