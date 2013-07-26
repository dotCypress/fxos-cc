define(['app'], function(app) {
  app.controller('EditContextCtrl', ['$scope', '$routeParams', '$navigate', 'database',
    function EditContextCtrl($scope, $routeParams, $navigate, database) {

      database.getContextById($routeParams.id, function(err, context){
        $scope.context = context || {
          _id: new Date().getTime() +'',
          name: '',
          memo: '',
        };
      });

      $scope.close = function(){
        $navigate.goBack();
      };

      $scope.save = function(){
        $scope.error = false;
        if(!$scope.context.name || $scope.context.name.lenght === 0){
          return $scope.error = true;
        }
        database.saveContext($scope.context);
        $navigate.goBack();
      };

      $scope.delete = function(){
        database.deleteContext($scope.context);
        $navigate.goBack();
      };

    }
  ]);
});
