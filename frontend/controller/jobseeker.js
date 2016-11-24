var jobseeker = angular.module("jobseeker", []);

var getParam = function (key){
	var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
	return result && unescape(result[1]) || "";
}

jobseeker.controller("jobSeekerController", function($scope, $rootScope) {
	$rootScope.location = "Jobs";
	$scope.profile = {
		name : "",
		location : "",
		skills : [],
		email: "",
		number: "",
		description : "",
		education : []
	};

	$http.get('/getJobSeekerDetails', {
		params: { id: getParam('id') }
	}).then(function (response) {
		console.log(response.data[0]);
		$scope.profile.address = response.data[0].address + ", " + response.data[0].city + ", " + response.data[0].country;
	});
});
