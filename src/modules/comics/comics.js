(function() {
  var module = angular.module('comics', ['ngRoute']);

  module.controller('ComicsController', function($scope, comicsService){
    $scope.curPage = 0;
    $scope.lastPage = 100;
    $scope.elemCount = 10;

    $scope.limpiarFiltro = function(){
      $scope.valorFiltro = "";
    };

    $scope.nextPage = function(){
      $scope.curPage = $scope.curPage +1;
      $scope.reloadData();
    };

    $scope.prevPage = function(){
      $scope.curPage = $scope.curPage -1;
      $scope.reloadData();
    };

    $scope.reloadData = function(){
      comicsService.pagina($scope.curPage, $scope.elemCount)
          .then(function(pagina){
            $scope.comics = pagina.items;
            $scope.lastPage = Math.ceil(pagina.total /  $scope.elemCount) -1 ;
            if ($scope.curPage > $scope.lastPage){
              $scope.curPage = $scope.lastPage;
              $scope.reloadData();
            }
          });
    };

    $scope.reloadData();

  });

  module.factory('comicsService', function($http){
    return {
      pagina: function (pgNum, elemCount) {
        return $http.get('http://localhost:8001/v1/comics?page=' + pgNum + '&count=' + elemCount)
            .then(function (response) {
              return response.data;
            });
      }
    }
  });

  module.config(function($routeProvider){
    $routeProvider.when('/listado',{
      templateUrl: 'modules/comics/listado.html',
      controller: 'ComicsController'
    });

    $routeProvider.otherwise({
      redirectTo: '/listado'
    });
  });

  module.run(function() {
    console.debug("Comics module running");
  });

}());