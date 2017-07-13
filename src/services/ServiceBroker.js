(function(){

	var ServiceBroker = function($log, ServiceRunner) 
	{
		var services = [];
		/* Map the Service Request Type and the Service index
		 */
		var servicesMap = {};
		var self = this;

		this.register = function(serviceType)
		{
			var register = function(service)
			{
				var index = services.push(service);
				angular.forEach(service.requestsTypes, function(requestType, typeIndex){
					servicesMap[serviceType] = index;
				});
			}
			
			if(_.isArray(serviceType))
			{
				angular.forEach(serviceType, function(value, key) {
					register(value);
				});
			} else {
				register(serviceType);
			}
		};

		this.unregister = function(serviceType)
		{

		};

		/**
		 * Execute a request
		 * @param  {[type]} requestType [description]
		 * @param  {[type]} method      [description]
		 * @param  {[type]} requestDto  [description]
		 * @return {promise}             [description]
		 */
		this.executeRequest = function(requestType, method, requestDto)
		{
			var service = services[servicesMap[requestType]];
			var runner = new ServiceRunner(service, requestType, requestDto);
			
			return runner.execute(method);
		};

	};
	ServiceBroker.$inject = ['$log', 'ServiceRunner'];

	angular
		.module('pi')
		.factory('ServiceBroker', ServiceBroker);
})();