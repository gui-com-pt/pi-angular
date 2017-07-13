(function(){

	var runFn = function($rootScope, $history, $state) {
	
		$rootScope.$on("$stateChangeSuccess", function(event, to, toParams, from, fromParams) {
			if (!from.abstract) {
				$history.push(from, fromParams);
			}
	  	});

	  	$history.push($state.current, $state.params);
	};

	runFn.$inject = ['$rootScope', '$history', '$state'];

	angular
		.module('pi.ui-extensions')
		.run(runFn)
})();