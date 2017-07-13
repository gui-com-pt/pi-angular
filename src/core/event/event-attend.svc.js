(function(){
	
	angular
		.module('pi.core.app')
		.factory('pi.core.app.eventAttendSvc', ['piHttp', function(piHttp){
			
			this.post = function(model) {
				return piHttp.post('/event-attend', model);
			}

			this.get = function(id, model) {
				return piHttp.get('/event-attend/' + id);
			}

			this.find = function(model) {
				return piHttp.get('/event-attend', model);
			}

			return this;
		}]);
})();