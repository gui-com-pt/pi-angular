(function(){
	
	var registerFactory = function($http, $q){

		this.register = function(registerModel) {
			var model = registerModel;
				deferred = $q.defer(),
				successFn = function(res) {
					deferred.resolve(res.data);
				},
				errorFn = function(res) {
					deferred.reject(res);
				},
				httpObj = {
					method: 'POST',
					url: '/api/register',
					data: model
				};

			$http(httpObj)
				.then(successFn, errorFn);

			return deferred.promise;
		};
	};

	angular	
		.module('pi')
		.service('piRegisterService', registerFactory);
})();