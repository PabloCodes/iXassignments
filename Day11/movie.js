var app = angular.module('movieApp', ['ngRoute']); 

app.config(function($routeProvider) {
	$routeProvider.when('/', {
		controller: 'MainCtrl',
		templateUrl: 'templates/home.html',
	})
	$routeProvider.when('/movie/:movieId', {
		controller: 'MovieCtrl',
		templateUrl: 'templates/movie.html',
	})
});

app.controller('MainCtrl', function($scope, $http) {
	$scope.searchMovie = function() {
		$http({
			url: "http://www.omdbapi.com/?",
			method: "GET",
			params: {
				s: $scope.searchBox
			}
		}).then(function(response) {
			console.log(response.data.Search);
			$scope.movieArray = response.data.Search;
		})
	}	
});



app.controller('MovieCtrl', function($scope, $http, $routeParams) {
	$http({
		url: "http://www.omdbapi.com/?",
		method: "GET",
		params: { 
			i: $routeParams.movieId
		}
	}).then(function(response) {
		console.log(response);
		$scope.movie = response.data;
		$scope.getGiffy();
	})
	$scope.getGiffy = function() {
		$http({
			url: "http://api.giphy.com/v1/gifs/search",
			method: "GET",
			params: {
				q: $scope.movie.Title,
				api_key: "dc6zaTOxFJmzC"
			}
		}).then(function(response) {
			console.log(response);
			$scope.gifArray = response.data.data;
		})
	}
});
