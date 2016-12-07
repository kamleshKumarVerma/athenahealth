angular.module("athenaHealth").controller("homeController", function($scope, config, homeService) {
	
	$scope.appTagLine = config.appTagLine;
	$scope.appSubTagLine = config.appSubTagLine;
	$scope.athenistas = homeService.getAthenistas();

});
