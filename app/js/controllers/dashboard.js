define(['app'], function(app) {
  app.controller('DashboardCtrl', ['$scope', '$navigate', 'database', 'extensions',
    function DashboardCtrl($scope, $navigate, database, extensions) {
      $scope.getTaskStatus = extensions.getTaskStatus;
      $scope.getDueDate = extensions.getDueDate;
      $scope.sorting = extensions.sorting;
      $scope.sortKind = extensions.sorting[4];
      $scope.tabs = [
        {name: 'Due today', icon:'icon-due'},
        {name: 'Projects',  icon:'icon-projects'},
        {name: 'Contexts',  icon:'icon-contexts'},
        {name: 'Chaos Box', icon:'icon-chaosbox'}
      ];

      $scope.add = function(){
        switch($scope.currentTab){
          case 0:
            $navigate.go('/edit-task//1/', 'modal');
          break;
          case 1:
            $navigate.go('/edit-project/', 'modal');
          break;
          case 2:
            $navigate.go('/edit-context/', 'modal');
          break;
          case 3:
            $navigate.go('/edit-task//0/', 'modal');
          break;
        }
      };

      $scope.switchSorting = function(sort){
        $scope.sortKind = sort;
        $scope.showSortingChooser = false;
        loadData();
      };

      $scope.taskChanged = function(task){
        database.saveTask(task, function (err) {
          loadData();
        });
      };

      $scope.navigateToContext = function(id){
        $navigate.go('/context/' + id, 'slide');
      }

      $scope.about = function(){
        $navigate.go('/about', 'slide');
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
            database.getProjectTasks('0', function(err, tasks){
              $scope.chaosBox = extensions.filter(tasks, $scope.sortKind);
              $scope.$apply();
            });
          break;
        }
      }
    }
  ]);
});
