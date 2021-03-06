define(['app'], function(app) {
  app.controller('EditContextCtrl', ['$scope', '$routeParams', '$navigate', 'database',
    function EditContextCtrl($scope, $routeParams, $navigate, database) {

      database.getContextById($routeParams.id, function(err, context){
        $scope.context = context || {
          _id: new Date().getTime() +'',
          name: '',
          memo: ''
        };
        $scope.isExisting = context != null;
        $scope.$apply();
      });

      $scope.close = function(){
        $navigate.goBack();
      };

      $scope.save = function(){
        $scope.error = false;
        if(!$scope.context.name || $scope.context.name.lenght === 0){
          return $scope.error = true;
        }
        database.saveContext($scope.context, function(err){
          $navigate.goBack();
          $scope.$apply();
        });
      };

      $scope.delete = function(){
        database.deleteContext($scope.context, function(err){
          $navigate.goBack();
          $scope.$apply();
        });
      };

    }
  ]);
});
