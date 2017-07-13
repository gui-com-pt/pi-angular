(function(){

	var UpdateBuilder = function($log){
		var fn = function(){
			this.current = undefined;
			this.request = {};
			var self = this;

			this.field = function(field) {
				self.current = field;
				return self;
			};

			this.set = function(value) {
				self.request[self.current] = value;
				self.current = undefined;
				$log.debug('field ' + self.current + ' set ' + value);
				return self;
			};

			this.getRequest = function(){
				return self.request;
			};
		};

		return fn;
	};

	UpdateBuilder.$inject = ['$log'];

	angular
		.module('pi')
		.factory('UpdateBuilder', UpdateBuilder);
})();