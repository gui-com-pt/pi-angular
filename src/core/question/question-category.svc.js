(function(){
	angular
		.module('pi.core.question')
		.factory('pi.core.question.questionCategorySvc', ['piHttp', function(piHttp){

			this.post = function(model){
				return piHttp.post('/question-category', model);
			}

			this.remove = function(id){
				return piHttp.post('/question-category-remove/' + id);
			}

			this.get = function(id, model) {
				return piHttp.get('/question-category/' + id, model);
			}

			this.find = function(model) {
				return piHttp.get('/question-category', {params: model});
			};
			return this;
		}]);
})();
