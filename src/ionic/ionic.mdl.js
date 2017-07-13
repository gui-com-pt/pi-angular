(function(){
	
	angular
		.module('pi.ionic')
		.config(['$httpProvider', function($httpProvider){
			$httpProvider.interceptors.push(function($rootScope) {
		    return {
		      request: function(config) {
		        $rootScope.$broadcast('http:start')
		        return config
		      },
		      response: function(response) {
		        $rootScope.$broadcast('http:end')
		        return response
		      }
		    }
		  });
		}]);
})();