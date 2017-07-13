(function(){

	var ServiceRunner = function($http, $q){

		var fn = function(service, requestType, requestDto)
		{
			if(!_.isObject(service) || !_.isObject(requestType))
			{
				return false;
			}
			var self = this;

			this.execute = function(httpMethod)
			{
				var deferred = $q.defer(),
					success = function(response) 
					{
						deferred.resolve(res.data);
					},
					error = function(resposne)
					{
						deferred.reject(response);
					};

				$http({
					method: httpMethod,
					data: requestDto,
					url: service.endpoint
				})
				.then(success, error);

				return deferred.promise;
			};
			
		};

		return fn;
	};
	ServiceRunner.$inject = ['$http', '$q'];

	angular
		.module('pi')
		.factory('ServiceRunner', ServiceRunner);

})();