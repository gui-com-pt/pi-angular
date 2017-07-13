(function(){
	
	var configFn = function($provide) {

		// use $state.forceReload() to reload the current state
		// delegate cames from SO http://stackoverflow.com/questions/21714655/angular-js-angular-ui-router-reloading-current-state-refresh-data
		$provide.decorator('$state', function($delegate, $stateParams) {
	        $delegate.forceReload = function() {
	            return $delegate.go($delegate.current, $stateParams, {
	                reload: true,
	                inherit: false,
	                notify: true
	            });
	        };
	        return $delegate;
	    });
	};
	angular
		.module('pi.ui-extensions')
		.config(['$provide', configFn]);
})();