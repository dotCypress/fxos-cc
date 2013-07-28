define(['app'], function(app) {
  app.controller('AboutCtrl', ['$scope', '$routeParams', '$navigate',
    function AboutCtrl($scope, $routeParams, $navigate) {

      $scope.close = function(){
        $navigate.goBack();
      };

    }
  ]);
});
