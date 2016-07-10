var app = angular.module('calculatorApp', [])
app.controller('CalculatorCtrl', function($scope) {
	$scope.doAdd = function() {
		var numX = parseInt($scope.x);
		var numY = parseInt($scope.y);
		$scope.result = numX + numY;
	};
	$scope.doMult = function() {
		var numX = parseInt($scope.x);
		var numY = parseInt($scope.y);
		$scope.result = numX * numY;
	};
});