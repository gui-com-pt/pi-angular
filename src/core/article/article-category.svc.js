(function(){
	angular
		.module('pi.core.article')
		.factory('pi.core.article.articleCategorySvc', ['piHttp', function(piHttp){

			this.post = function(model){
				return piHttp.post('/article-category', model);
			}

			this.remove = function(id){
				return piHttp.post('/article-category-remove/' + id);
			}

			this.get = function(id, model) {
				return piHttp.get('/article-category/' + id, model);
			}

			this.find = function(model) {
				return piHttp.get('/article-category', {params: model});
			};

			this.put = function(id, model) {
				return piHttp.post('/article-serie/' + id, model);
			};

			return this;
		}]);
})();
