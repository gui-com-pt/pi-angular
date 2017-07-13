(function(){
	var PiBreadcrumb = function(PiBreadcrumbService)
	{
		var link = function(scope, elem, attrs)
		{
			scope.current = PiBreadcrumbService.current;
		}
		return {
			templateUrl: '/html/pi/breadcrumb.html',
			link: link
		}
	};

	PiBreadcrumb.$inject = ['piBreadcrumbService'];

	var PiBreadcrumbService = function($rootScope)
	{
		var _current = {name: 'First', image: null};
		var uiStateGenerated = true;

		var set = function(name, image){
			_current.name = name;

			if(!_.isNull(image)){
				_current.image = image;
			}
		};
		if(uiStateGenerated) {
			$rootScope.$on('$stateChangeStart',
			function(event, toState, toParams, fromState, fromParams){
				_current.name = toState.name;
			});
		}
		var current = function()
		{

			return ;
		};
		return {
			set: set,
			current: _current
		};
	};

	PiBreadcrumbService.$inject = ['$rootScope'];

	angular
		.module('pi')
		.factory('piBreadcrumbService', PiBreadcrumbService)
		.directive('piBreadcrumb', PiBreadcrumb);
})();