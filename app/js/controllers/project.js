define(['app'], function(app) {
  app.controller('ProjectCtrl', ['$scope', '$routeParams', '$navigate', 'database', 'extensions',
    function ProjectCtrl($scope, $routeParams,  $navigate, database, extensions) {

      var loadData = function() {
        database.getProjectTasks($routeParams.id, function(err, tasks){
          $scope.tasks = extensions.filter(tasks, $scope.sortKind);
          $scope.$apply();
        });
      };
      $scope.getTaskStatus = extensions.getTaskStatus;
      $scope.getDueDate = extensions.getDueDate;
      $scope.sorting = extensions.sorting;
      $scope.sortKind = extensions.sorting[4];
      if($routeParams.id == '1'){
        $scope.project = {_id: '1', name: 'Single tasks'};
        loadData();
      }else{
        database.getProjectById($routeParams.id, function(err, project){
          $scope.project = project;
          $scope.isEditable = true;
          if(!project){
            $navigate.goBack();
            return $scope.$apply();
          }
          loadData();
        });
      }

      $scope.switchSorting = function(sort){
        $scope.sortKind = sort;
        $scope.showSortingChooser = false;
        loadData();
      };

      $scope.close = function(){
        $navigate.goBack();
      };

      $scope.editTask = function(id){
        $navigate.go('/edit-task/' + id + '//', 'modal');
      }

      $scope.edit = function(){
        $navigate.go('/edit-project/' + $scope.project._id, 'modal');
      }

      $scope.add = function(){
        $navigate.go('/edit-task//' + $scope.project._id + '/', 'modal');
      }

      $scope.taskChanged = function(task){
        database.saveTask(task, function (err) {
          loadData();
        });
      };
    }
  ]);
});
