(function(){

	var svcFn = function($http, $q){
		/**
		 * Create a new forum
		 *
		 * @param model Request model
		 * @param parentId The forum parent id. If null or undefined, the forum is created as a Parent
		 */
		this.create = function(model, parentId) {

			var data = angular.copy(model);
			if(!_.isUndefined(parentId)) {
				data.parentId = parentId;
			}

			var deferred = $q.defer(),
				successFn = function(res) {
					deferred.resolve(res.data);
				},
				errorFn = function(res) {
					deferred.reject(res.data);
				},
				httpObj = {
					method: 'POST',
					url: '/api/community/forum',
					data: data
				};

			$http(httpObj)
				.then(successFn, errorFn);

			return deferred.promise;
		};

		this.updateInformation = function(forumId, model) {
			var data = angular.copy(model);
			data.id = forumId;

			var deferred = $q.defer(),
				successFn = function(res) {
					deferred.resolve(res.data);
				},
				errorFn = function(res) {
					deferred.reject(res);
				},
				httpObj = {
					method: 'POST',
					url: '/api/community/forum/info',
					data: data
				};

			$http(httpObj)
				.then(successFn, errorFn);

			return deferred.promise;
		};

		this.remove = function(forumId, reason) {
			var data = {
					id: forumId
				},
				deferred = $q.defer(),
				succesFn = function(res) {
					deferred.resolve(res.data);
				},
				errorFn = function(res) {
					deferred.reject(res);
				},
				httpObj = {
					method: 'DELETE',
					url: '/api/community/forum',
					data: data
				};

			$http(httpObj)
				.then(successFn, errorFn);

			return deferred.promise;
		};

		angular
			.module('pi')
			.service('forumApi', ['$http', '$q', svcFn]);
	};
});