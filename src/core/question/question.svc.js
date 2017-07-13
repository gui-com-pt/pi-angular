(function(){
	angular
		.module('pi.core.question')
		.factory('pi.core.question.questionSvc', ['piHttp', function(piHttp){

			this.post = function(model){
				return piHttp.post('/question', model);
			}

			this.remove = function(id) {
				return piHttp.post('/question-remove/' + id);
			}

			this.put = function(id, model) {
				return piHttp.post('/question/' + id, model);
			}

			this.get = function(id, model) {
				return piHttp.get('/question/' + id, model);
			}

			this.find = function(model) {
				return piHttp.get('/question', {params: model});
			};
			return this;
		}]);
})();
