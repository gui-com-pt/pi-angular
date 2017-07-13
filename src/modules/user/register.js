(function(){
	var svcFn = function(accountApi, $q) {

		this.basic = function(email, password, passwordConfirm, requestModel) {

			if(_.isUndefined(requestModel) && !_.isObject(requestModel)) {
				requestModel = {};
			}
			requestModel.email = email;
			requestModel.password = password;

			var deferred = $q.defer(),
				successFn = function(res) {
					deferred.resolve(res.data);
				},
				errorFn = function(res) {
					deferred.reject(res.data);
				};

            accountApi.register(requestModel)
				.then(successFn, errorFn);

			return deferred.promise;
		};

	};

	var directiveFn = function(registerSvc){
		
		var linkFn = function(scope, element, attrs) {
			
			var disposeFn = function(){

			};

			element.on('$destroy', disposeFn);

			scope.account = {};

			scope.submit = function(){
				var model = {};
				registerSvc.basic(scope.account.email, scope.account.password, model);
			};

		};
		return {
			link: linkFn,
			scope: {
				'account': ''
			},
			replace: false
		}
	};

	angular
		.module('pi')
		.service('registerSvc', ['accountApi', '$q', svcFn])
		.directive('piRegister', ['registerSvc', directiveFn]);

})();

