define(['app'], function(app) {
  app.controller('ContextCtrl', ['$scope', '$routeParams', '$navigate', 'database', 'extensions',
    function ContextCtrl($scope, $routeParams,  $navigate, database, extensions) {
      $scope.sorting = extensions.sorting;
      $scope.sortKind = extensions.sorting[4];
      database.getContextById($routeParams.id, function(err, context){
        $scope.context = context;
        if(!context){
          $navigate.goBack();
          return $scope.$apply();;
        }
        database.getContextTasks($routeParams.id, function(err, tasks){
          $scope.tasks = tasks;
          $scope.$apply();
        });
      });

      $scope.switchSorting = function(sort){
        $scope.sortKind = sort;
        $scope.showSortingChooser = false;
      };

      $scope.close = function(){
        $navigate.goBack();
      };

      $scope.editTask = function(id){
        $navigate.go('/edit-task/' + id + '//', 'modal');
      }

      $scope.edit = function(){
        $navigate.go('/edit-context/' + $scope.context._id, 'modal');
      }

      $scope.add = function(){
        $navigate.go('/edit-task//0/' + $scope.context._id, 'modal');
      }
    }
  ]);
});
