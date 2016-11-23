var index = angular.module("index", []);

index.controller("indexController", function($scope, $rootScope) {
	$rootScope.location = "Home";
});
