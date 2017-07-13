/**
 * Pi Provider
 *
 * The main module provider
 */
(function(){
	
	/**
	 * Global settings
	 *
	 * Settings that don't belong to a specific module are stored here
	 */	
 	var settings = { };

	var providerFn = function(){

		/**
		 * OAuth Provider
		 */
		settings.oAuthProviders =  [];

		this.getAuthProviders = function(){
			return settings.oAuthProviders;
		};

		this.addOAuthProvider = function(provider, appId) {
			settings.oAuthProviders.push({
				key: provider,
				appId: appId
			});
		};

		this.hasOAuthProvider = function(provider){
			angular.forEach(settings.oAuthProviders, function(value, key) {
				if(value.key == provider)  {
					return true;
				}
			});
			return false;
		};

		this.getOAuthAppId = function(provider){
			angular.forEach(settings.oAuthProviders, function(value, key) {
				if(value.key == provider) {
					return value.appId;
				}
			});

			return null;
		};


		/**
		 * Rest API
		 */
		settings.apiBaseUrl = '/api';

		this.getApiBaseUrl = function(){
			return settings.apiBaseUrl;
		};

		this.setApiBaseUrl = function(url){
			settings.apiBaseUrl = url;
		};

		/**
		 * Module version
		 */

		settings.version = '0.1';

		this.getVersion = function(){
			return settings.version;
		};

		this.setVersion = function(version) {
			settings.version = version;
		};

		/**
		 * Pi Modules
		 */
		settings.modules = [];

		this.getModules = function(){
			return settings.modules;
		};

		this.addModule = function(module) {
			settings.modules.push(module);
		};

		this.hasModule = function(module) {
			var ex = false;
			angular.forEach(settings.modules, function(value, vakey) {
				if(value === module) {
					ex = true;
				};
			});
			
			return ex;
		};

		var getFn = function(piSettings){

		};


		this.$get = [
		'piSettings', getFn];

        return this;
	};
	angular
        .module('pi')
        .value('piSettings', settings)
		.provider('piApp', providerFn);
})();