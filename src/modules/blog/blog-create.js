(function(){
	var directiveFn = function() {
		var linkFn = function(scope, element, attrs, blogApi) {
			scope.model = {};

			scope.submit = function(){
				
				blogApi
					.post(scope.model)
					.then(successFn, errorFn);
			};
		};

		return {
			link: linkFn,
			replace: false
		}
	};

	angular
		.module('piBlogCreate', [''])
})();