var athenaHealth = angular.module("athenaHealth", ["ngRoute"]);

/* Setting up provider for getting config data */
athenaHealth.provider("config", function () {

    var config = {};

    /* Accessible only in config function */
    this.setConfigData = function (dataFromServer) {
        config = dataFromServer;
    };

    /* Accessible in controller/service/factory */
    this.$get = function() { return config; };

});

/* First fetch the config data than only application will bootstrap */
fetchConfigData().then(bootstrapApplication);

function fetchConfigData() {
    var initInjector = angular.injector(["ng"]);
    
    var $http = initInjector.get("$http");

    return $http.get("../config.json").then(function(response) {

        athenaHealth.config(function($routeProvider, configProvider) {

            configProvider.setConfigData(response.data);

            $routeProvider
            // route for the home page
            .when('/', {
                templateUrl : 'components/home/homeTemplate.html',
                controller: 'homeController'
            })

            // route for the about page
            .when('/about', {
                templateUrl : 'components/about/aboutTemplate.html',
                controller: 'aboutController'
            })

            .otherwise({redirectTo:'/'});

        });

    }, function(errorResponse) {
        // Handle error case
    });
}

function bootstrapApplication() {
    angular.element(document).ready(function() {
        angular.bootstrap(document, ["athenaHealth"]);
    });
}
