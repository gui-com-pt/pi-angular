(function(){
	var TestService = function(ServiceBase){
		var service = new ServiceBase('TestService');

		return service;
	};

	TestService.$inject = ['ServiceBase'];

	angular
		.module('pi')
		.factory('TestService', TestService);

	var TestAppHost = function(AppHost) {
		var config = {
			'appName': 'test'
		};
		
		return new AppHost(config);
	};

	TestAppHost.$inject = ['AppHost'];

	var AppHost = function($log, ServiceBroker){

		var fn = function(configs) {

			var self = this;
			this.appName = configs.appName || 'default';
			this.mode = configs.mode || 'production';
			this.plugins = [];

			this.init = function()
			{
				var services = discoveryServices();
				self.registerService(services);
			};
			this.setConfigs = function(configs)
			{
				if(!_.isUndefined(configs['appName'])) {
					self.appName = configs.appName;
				}
				if(!_.isUndefined(configs['mode'])) {
					self.mode = configs.mode;
				}

				self.configs = configs;
			};

			this.getConfigs = function()
			{
				return self.configs;
			}

			this.registerService = function(service)
			{
				return ServiceBroker.register(service);
			};

			this.execute = function(requestType, method, requestDto)
			{
				return ServiceBroker.executeRequest(requestType, method, requestDto);
			};

			var discoveryServices = function()
			{
				return [
					{
						id: "serverId",
						endpoint: '/api/user',
						requestsTypes: [
							{
								name: 'GetUser',
								methods: ['GET'],
								roles: []
							},
							'PutUser',
							'DeleteUser'
						]
					},
					{
						id: "serverId2",
						endpoint: '/api/group'
					}
				];
			};
		};

		return fn;
	};

	AppHost.$inject = ['$log'];

	angular
		.module('pi')
		.factory('AppHost', AppHost)
		.factory('TestAppHost', TestAppHost);
})();