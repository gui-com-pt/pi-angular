(function(){
	angular
		.module('pi.core.file')
		.factory('pi.core.file.fileSvc', ['piHttp', '$log', function(piHttp, $log){

			var self = this;

			this.remove = function(id) {
				return piHttp.post('/files/' + id);
			}

			this.put = function(id, model) {
				return piHttp.post('/files/' + id, model);
			}

			this.get = function(id, model) {
				return piHttp.get('/files/' + id, model);
			}

      this.find = function(model) {
				return piHttp.get('/files', {params: model});
			}

			return this;
		}]);
})();
