var job = angular.module("job", []);

var getParam = function (key){
	var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
	return result && unescape(result[1]) || "";
}

job.controller("jobController", function($scope, $http) {
	$scope.job = {
		title : "Test",
		level : "test",
		company : "Kalibrr",
		deadline : "Wow",
		industry : "Information Technology",
		employmenttype : "wow",
		address : "wow2",
		skills: ["Programming", "Designing"],
		salary : 100000,
		description : "WOWOWOWOWOWOW",
		education: "UPLB"
	};

	$http.get('/getJobDetails', {
	    params: { id: getParam('id') }
	}).then(function (response) {
		console.log(response.data[0]);
		$scope.job.address = response.data[0].address + ", " + response.data[0].city + ", " + response.data[0].country;
		$scope.job.deadline = response.data[0].application_deadline;
		$scope.job.description = response.data[0].description;
		$scope.job.education = response.data[0].educational_attainment;
		$scope.job.employmenttype = response.data[0].employment_type;
		$scope.job.level = response.data[0].job_level;
		$scope.job.salary = response.data[0].salary;
		$scope.job.skills = [response.data[0].skill];
		$scope.job.work_experience = [response.data[0].work_experience];
		$scope.job.title = response.data[0].title;
		$scope.job.industry = response.data[0].industry;
	});
});
