(function(){
	angular
		.module('pi.core.user')
		.factory('pi.core.user.userSvc', ['piHttp', function(piHttp){

			this.post = function(model){
				return piHttp.post('/user', model);
			}

			this.remove = function(id) {
				return piHttp.post('/user-remove/' + id);
			}

			this.put = function(id, model) {
				return piHttp.post('/user/' + id, model);
			}

			this.get = function(id, model) {
				return piHttp.get('/user/' + id, model);
			}

			this.find = function(model) {
				return piHttp.get('/user', {params: model});
			};
			return this;
		}]);
})();
