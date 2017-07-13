(function(){
	angular
		.module('pi.facebook', ['pi', 'facebook']);

	angular
		.module('pi.facebook')
		.run(['$rootScope',])
		.config(['$httpProvider',
			function($httpProvider) {
				$httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
			}]);
})();