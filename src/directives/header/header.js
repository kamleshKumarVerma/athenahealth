angular.module('athenaHealth').directive('athenaHealthHeader', function() {
	
	return {
		strict: "E",
		scope: {},
		templateUrl: "directives/header/header.html",
		controller: function($scope, $location) {
			$scope.menus = [
				{name: "Product & Service", url: "/", subMenu: false},
				{name: "Industry Solutions", url: "/", subMenu: false},
				{name: "Results & Sights", url: "/", subMenu: true},
				{name: "About athenahealth", url: "/about", subMenu: false}
			]

			$scope.changeRoute = function(route) {
				$location.path(route);
			}
		}
	}

});