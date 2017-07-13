(function(){
	'use strict';

	angular
		.module('pi.core.place')
		.factory('pi.core.place.placeSvc', ['piHttp', function(piHttp){

			this.post = function(model){
				return piHttp.post('/place', model);
			}

			this.get = function(id, model) {
				return piHttp.get('/place/' + id, model);
			}

			this.find = function(model) {
				return piHttp.get('/place', {params: model});
			};

			this.remove = function(id) {
				return piHttp.post('/place-remove/' + id);
			};

			this.put = function(id, model) {
				return piHttp.post('/place/' + id, model);
			};

			return this;
		}]);
})();