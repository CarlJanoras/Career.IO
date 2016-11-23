'use strict';
var app = angular.module("Career.IO",["ngRoute"]);

//routes for angular app. configure routes
app.config(["$routeProvider",function($routeProvider){
	$routeProvider
		.when("/job",{
			templateUrl: "job.html"
		})
		.when("/",{
			templateUrl: "index.html"
		})
		.otherwise({reDirectTo:"/"});
}]);
