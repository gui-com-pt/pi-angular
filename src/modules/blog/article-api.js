(function(){
	
	var apiFn = function(){
		this.get = function(articleId) {
			var httpObj = {
				method: 'GET',
				url: '/api/blog/article/' + articleId
			};

			return $http(httpObj);
		};

		this.post = function(blogId, model) {
			model.blogId = blogId;

			var httpObj = {
				method: 'POST',
				url: '/api/blog/article',
				data: model
			};

			return $http(httpObj);
		};

		this.put = function(articleId, model) {
			var httpObj = {
				method: 'POST',
				url: '/api/blog/article/:id',
				data: model
			};

			return $http(httpObj);
		};

		this.remove = function(articleId) {
			var httpObj = {
				method: 'DELETE',
				url: '/api/blog/article/' + articleId
			};

			return $http(httpObj);
		};
	};

	var blogArticleResource = function($resource) {
		return $resource('/api/blog/article/:id');
	};
	blogArticleResource.$inject = ['$resource'];

	angular
		.module('pi')
		.factory('blogArticleResource', blogArticleResource)
		.service('blogArticleApi', ['$rootScope', '$q', '$http', apiFn]);

})();