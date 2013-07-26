define(['app'], function(app) {
  app.controller('DashboardCtrl', ['$scope', '$routeParams', '$navigate', 'database',
    function DashboardCtrl($scope, $routeParams,  $navigate, database) {
      $scope.tabs = [
        {name: 'Due today', icon:'icon-due'},
        {name: 'Projects',  icon:'icon-projects'},
        {name: 'Contexts',  icon:'icon-contexts'},
        {name: 'Chaos Box', icon:'icon-chaosbox'}
      ];
      $scope.currentTab=-1;
      $scope.add = function(){
        if($scope.currentTab == 0){
          $navigate.go('/editTask', 'modal');
        }
      };
      $scope.switchTab = function(index){
        $scope.currentTab = index;
        loadData();
      };
      $scope.currentTabTitle = function(){
        return $scope.tabs[$scope.currentTab].name;
      };
      $scope.switchTab(0);

      function loadData(){
        switch($scope.currentTab){
          case 0:
            database.getDueTasks(function(err, tasks){
              $scope.due = tasks;
              $scope.$apply();
            });
          break;
          case 1:
            database.getProjects(null, function(err, projects){
              $scope.projects = projects;
              $scope.$apply();
            });
          break;
          case 2:
            database.getContexts(null, function(err, contexts){
              $scope.contexts = contexts;
              $scope.$apply();
            });
          break;
        }
      }
    }
  ]);
});
