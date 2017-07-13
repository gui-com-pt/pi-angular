(function(){
	angular
		.module('pi.core.article')
		.factory('pi.core.article.articleSerieSvc', ['piHttp', function(piHttp){

			this.post = function(model){
				return piHttp.post('/article-serie', model);
			}

			this.remove = function(id) {
				return piHttp.post('/article-serie-remove/' + id);
			}

			this.put = function(id, model) {
				return piHttp.post('/article-serie/' + id, model);
			}

			this.get = function(id, model) {
				return piHttp.get('/article-serie/' + id, model);
			}

			this.find = function(model) {
				return piHttp.get('/article-serie', {params: model});
			};
			return this;
		}]);
})();
