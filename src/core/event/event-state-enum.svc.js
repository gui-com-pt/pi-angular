(function(){
	angular
		.module('pi.core.app')
		.factory('$piEventStateEnum', function(){
			return {
				Draft: 1,
				Published: 2,
				Censored: 3,
				Removed: 99
			};
		});
})();