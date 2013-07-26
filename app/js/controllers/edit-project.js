define(['app'], function(app) {
  app.controller('EditProjectCtrl', ['$scope', '$routeParams', '$navigate', 'database',
    function EditProjectCtrl($scope, $routeParams, $navigate, database) {

      database.getProjectById($routeParams.id, function(err, project){
        $scope.project = project || {
          _id: new Date().getTime() +'',
          name: '',
          memo: ''
        };
        $scope.isExisting = project != null;
        $scope.$apply();
      });

      $scope.close = function(){
        $navigate.goBack();
      };

      $scope.save = function(){
        $scope.error = false;
        if(!$scope.project.name || $scope.project.name.lenght === 0){
          return $scope.error = true;
        }
        database.saveProject($scope.project, function(err){
          $navigate.goBack();
          $scope.$apply();
        });
      };

      $scope.delete = function(){
        database.deleteProject($scope.project, function(err){
          $navigate.goBack();
          $scope.$apply();
        });
      };
    }
  ]);
});
