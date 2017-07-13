(function(){
	
	var svcFn = function($rootScope){

		var svc = function(model){
			var self = this;
			this.model = model;
			
			this.get = function(){
				return self.model;
			};

		};

		svc.prototype.build = function(skip, take) {
			
			if(_.isUndefined(this.model.skip)) {
				this.model.skip = _.isUndefined(skip) ? 0 : skip;
			}

			if(_.isUndefined(this.model.take)) {
				this.model.take = _.isUndefined(take) ? 40 : take;
			}
		};

		return svc;		
	};

	angular
		.module('pi')
		.factory('queryModelFactory', ['$rootScope', svcFn]);
})();