var searchJob = angular.module("searchJob", []);

searchJob.controller("searchJobController", function($scope) {
	$scope.jobs = [
		{
			company: "Intel",
			title: "Developer",
			level: "Senior",
			description: "The quick brown fox jumps over the lazy dog.",
			location: "Manila, Philippines",
			deadline: "November 12, 2016"
	}];
	$scope.searchKey = "";
	$scope.performSearch = function() {
		console.log("what");
	};
});
