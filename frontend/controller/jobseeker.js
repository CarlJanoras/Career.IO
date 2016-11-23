var jobseeker = angular.module("jobseeker", []);

jobseeker.controller("jobSeekerController", function($scope, $rootScope) {
	$rootScope.location = "Jobs";
	$scope.profile = {
		name : "Kendrick Timothy B. Mercado",
		location : "Los Banos, Philippines",
		skills : ["Programming", "Designing", "Boxing"],
		email: "mightymercado@gmail.com",
		number: 1020939393,
		description : "The quickest and brownest fox jumped over lazy dogs one at a time.",
		education : [
			{
				school: "University of the Philippines",
				attainment: "College",
				start: "August 2012",
				end: "November 2016",
				description : "Quick Brown Fox"
			},
			{
				school: "University of the Philippines",
				attainment: "College",
				start: "August 2012",
				end: "November 2016",
				description : "Quick Brown Fox"
			}
		],
		work : [
			{
				title: "Editor-in-chief",
				company : "Kalibrr",
				description : "test",
				start: "20101",
				end: "2012"
			}
		]
	};

});
