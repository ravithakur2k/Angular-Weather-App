//Defining Weather Forecast Module
var currentWeatherApp = angular.module('currentWeatherApp', ['ngResource','ngRoute']);

//Defining Routes
currentWeatherApp.config(function($routeProvider){

          $routeProvider
          .when('/',{
            templateUrl: 'weatherPages/main.html',
            controller: 'mainController'
          })

          .when('/weatherReport',{
            templateUrl: 'weatherPages/weatherReport.html',
            controller: 'weatherController'
          })

});

//Defining custom Service
currentWeatherApp.service('weatherCityService',function(){
      this.cityName = "London,UK";
});

//Defining two Controllers
currentWeatherApp.controller('mainController', ['$scope','weatherCityService',function($scope,weatherCityService){

          $scope.cityName = weatherCityService.cityName;
          $scope.$watch('cityName', function(){
            weatherCityService.cityName = $scope.cityName;
          })

}]);

currentWeatherApp.controller('weatherController', ['$scope','$resource','weatherCityService',
function($scope,$resource,weatherCityService){

          $scope.cityName = weatherCityService.cityName;

          $scope.weatherApi = $resource("http://api.openweathermap.org/data/2.5/weather/",{
          callback: "JSON_CALLBACK"}, {get:{method:"JSONP"}});

          $scope.weatherResult = $scope.weatherApi.get({q:$scope.cityName,appid:'e6b20cdb29dd3e1271611dc84f374003'});
          console.log($scope.weatherResult);

          $scope.kelvinToFahrenheit = function(kelvinDeg) {
              return Math.round((1.8 * (kelvinDeg - 273)) + 32);
            };

          $scope.convertToDate = function(dt) {
              return new Date(dt * 1000);
            };

}]);
