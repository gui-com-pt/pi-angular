(function(){
	'use strict';

	angular
		.module('pi.core.app')
		.factory('pi.core.app.appSvc', ['piHttp', function(piHttp){

			this.post = function(model){
				return piHttp.post('/application', model);
			}

			this.get = function(id, model) {
				return piHttp.get('/application/' + id, model);
			}

			this.find = function(model) {
				return piHttp.get('/application', {params: model});
			}

			this.put = function(id, model){
				return piHttp.post('/application/' + id, model);
			}

			return this;
		}]);

})();