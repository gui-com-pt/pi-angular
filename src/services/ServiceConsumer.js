(function(){
	var ServiceConsumer = function($log) 
	{
		this.send = function()
		{

		};
	};
	ServiceConsumer.$inject = ['$log'];

	angular
		.module('pi')
		.factory('ServiceConsumer', ServiceConsumer)
})();