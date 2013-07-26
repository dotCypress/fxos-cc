define(['app'], function(app) {
  app.controller('EditTaskCtrl', ['$scope', '$routeParams', '$navigate', 'database',
    function EditTaskCtrl($scope, $routeParams, $navigate, database) {

      database.getTaskById($routeParams.id, function(err, task){
        $scope.task = task || {
          _id: new Date().getTime() +'',
          name: '',
          memo: '',
          contextId: null,
          projectId: 0,
          isCompleted: false,
          startDate: null,
          dueDate:null
        };
        $scope.isExisting = task != null;

        database.getProjects(null, function(err, projects){
          projects.unshift({_id:0, name: 'Chaos Box'});
          $scope.projects = projects;

          database.getContexts(null, function(err, contexts){
            $scope.contexts = contexts;
            $scope.$apply();
          });
        });
      });

      $scope.close = function(){
        $navigate.goBack();
      };

      $scope.save = function(){
        $scope.error = false;
        if(!$scope.task.name || $scope.task.name.lenght === 0){
          return $scope.error = true;
        }
        database.saveTask($scope.task, function(err){
                  console.log(err);
          $navigate.goBack();
          $scope.$apply();
        });
      };

      $scope.delete = function(){
        database.deleteTask($scope.task, function(err){
          $navigate.goBack();
          $scope.$apply();
        });
      };

    }
  ]);
});
