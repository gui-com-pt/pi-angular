(function(){
	angular
		.module('pi.core.place')
		.factory('pi.core.place.placeCategorySvc', ['piHttp', function(piHttp){

			this.post = function(model){
				return piHttp.post('/place-category', model);
			}

			this.remove = function(id){
				return piHttp.post('/place-category-remove/' + id);
			}

			this.get = function(id, model) {
				return piHttp.get('/place-category/' + id, model);
			}

			this.find = function(model) {
				return piHttp.get('/place-category', {params: model});
			};

			this.put = function(id, model) {
				return piHttp.post('/place-serie/' + id, model);
			};

			return this;
		}]);
})();
