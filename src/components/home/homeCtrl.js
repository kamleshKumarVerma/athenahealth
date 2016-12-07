angular.module("athenaHealth").controller("homeController", function($scope, config, homeService) {
	
	$scope.appTagLine = config.appTagLine;
	$scope.appSubTagLine = config.appSubTagLine;
	$scope.athenistas = homeService.getAthenistas();


	$scope.myInterval = 3000;
	$scope.slides = [
		{
		  image: 'http://lorempixel.com/400/200/'
		},
		{
		  image: 'http://lorempixel.com/400/200/food'
		},
		{
		  image: 'http://lorempixel.com/400/200/sports'
		},
		{
		  image: 'http://lorempixel.com/400/200/people'
		}
	];

});
