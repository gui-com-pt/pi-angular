(function(){
	var ServiceBase = function($resource, $q, MessageBroker) {
		var fn = function(serviceName)
		{
			this.serviceName = serviceName;
			this.requests	 = 0;
			this.currentRequest = undefined;
			this.httpBusy = false;
			this.MessageBroker = MessageBroker;
		};

		fn.prototype.update = function(first_argument) {
			// body...
		};

		fn.prototype.get = function(id) {
			
		};

		fn.prototype.remove = function(id) {
			// body...
		};

		fn.prototype.query = function() {
			// body...
		};

		return fn;
	};

	ServiceBase.$inject = ['$resource', '$q', 'MessageBroker'];

	angular
		.module('pi')
		.factory('ServiceBase', ServiceBase)
})();