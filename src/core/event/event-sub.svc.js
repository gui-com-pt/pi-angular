(function(){
	angular
		.module('pi.core.app')
		.factory('pi.core.app.eventSubSvc', ['piHttp', function(piHttp){
			
			this.post = function(model) {
				return piHttp.post('/event-subscription', model);
			}

			this.get = function(id, model) {
				return piHttp.get('/event-subscription/' + id);
			}

			this.find = function(model) {
				return piHttp.get('/event-subscription', model);
			}

			this.remove = function(id) {
				return piHttp.post('/event-subscription-remove/' + id);
			};

			return this;
		}]);
	})();