(function() {
  var app = angular.module('app', ['comics']);
  
  app.run(function() {
    console.debug("App running");
  });
  
}());