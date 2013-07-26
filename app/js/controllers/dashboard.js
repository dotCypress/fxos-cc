define(['app'], function(app) {
  app.controller('DashboardCtrl', ['$scope', '$routeParams', '$navigate', 'database',
    function DashboardCtrl($scope, $routeParams,  $navigate, database) {

      $scope.tabs = [
        {name: 'Due today', icon:'icon-due'},
        {name: 'Projects',  icon:'icon-projects'},
        {name: 'Contexts',  icon:'icon-contexts'},
        {name: 'Chaos Box', icon:'icon-chaosbox'}
      ];

      $scope.add = function(){
        switch($scope.currentTab){
          case 0:
            $navigate.go('/edit-task///', 'modal');
          break;
          case 1:
            $navigate.go('/edit-project/', 'modal');
          break;
          case 2:
            $navigate.go('/edit-context/', 'modal');
          break;
          case 3:
            $navigate.go('/edit-task/0//', 'modal');
          break;
        }
      };

      $scope.navigateToContext = function(id){
        $navigate.go('/context/' + id, 'slide');
      }

      $scope.navigateToProject = function(id){
        $navigate.go('/project/' + id, 'slide');
      }

      $scope.editTask = function(id){
        $navigate.go('/edit-task/' + id + '//', 'modal');
      }

      $scope.switchTab = function(index){
        app.state.tab = index;
        $scope.currentTab = index;
        loadData();
      };

      $scope.currentTabTitle = function(){
        return $scope.tabs[$scope.currentTab].name;
      };

      $scope.switchTab(app.state.tab || 0);

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
          case 3:
            database.getProjectTasks(0, function(err, contexts){
              $scope.chaosBox = contexts;
              $scope.$apply();
            });
          break;
        }
      }
    }
  ]);
});
