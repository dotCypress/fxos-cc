define(['app'], function(app) {
  app.controller('DashboardCtrl', ['$scope', '$routeParams', '$navigate', 'database',
    function DashboardCtrl($scope, $routeParams,  $navigate, database) {
      $scope.currentTab=0;
      $scope.add = function(){
        if($scope.currentTab == 0){
          $navigate.go('/editTask', 'modal');
        }
      };

      database.getItems(function(err, docs){
        $scope.due = docs;
        $scope.$apply();
      });
    }
  ]);
});
