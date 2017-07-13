(function(){
	var apiFn = function($rootScope, $http, $q){
		this.get = function(id){
			var httpObj = {
				method: 'GET',
				url: '/api/blog/' + id
			};

			return $http(httpObj);
		};

		this.post = function(model) {
			var httpObj = {
				method: 'POST',
				url: '/api/blog',
				data: model
			};

			return $http(httpObj);
		};

		this.put = function(blogId, model) {
			var httpObj = {
				method: 'POST',
				url: '/api/blog/' + blogId,
				datA: datA
			};

			return $http(httpObj);
		};

		this.remove = function(blogId) {
			var httpObj = {
				method: 'DELETE',
				url: '/api/blog/' + blogId
			};

			return $http(httpObj);
		};
	};

	angular
		.module('pi')
		.service('blogApi', ['$rootScope', '$http', '$q', apiFn]);
})();