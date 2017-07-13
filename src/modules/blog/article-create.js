/**
 * @ng-doc service
 * @name blogArticleCreateService
 *
 * @description
 * Create a new Article
 *
 * @dependencies blogApi
 */
(function(){
	
	var createService = function(blogApi){

		var fn = function(blogId) {
			this.blogId = blogId;
			this.model = {};
		};

		/*
		 * Title is validated agains the API to check titles already in use
		 */
		fn.prototype.slugIsValid = function(){
			if(blogApi.validateSlugTitle(this.model.title) == false) {

			};
		};

		fn.prototype.validateSeo = function(){

		};

		fn.prototype.create = function(){
			return blogApi.createArticle(this.model);
		};

		return fn;
	};

	createService.$inject = ['blogApi'];

	angular
		.module('pi')
		.factory('articleCreateService', createService);

})();