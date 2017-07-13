(function(){
	angular
		.module('pi.core.app')
		.factory('pi.core.app.eventCategorySvc', ['piHttp', function(piHttp){

			this.post = function(model){
				return piHttp.post('/event-category', model);
			}

			this.remove = function(id){
				return piHttp.post('/event-category-remove/' + id);
			}

			this.get = function(id, model) {
				return piHttp.get('/event-category/' + id, model);
			}

			this.find = function(model) {
				return piHttp.get('/event-category', {params: model});
			};

			this.put = function(id, model) {
				return piHttp.post('/event-serie/' + id, model);
			};

			return this;
		}]);
})();
