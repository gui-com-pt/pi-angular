(function(){
	angular
		.module('pi.core.article')
		.factory('$piArticleStateEnum', function(){
			return {
				Draft: 1,
				Published: 2,
				Censored: 3,
				Removed: 99
			};
		});
})();