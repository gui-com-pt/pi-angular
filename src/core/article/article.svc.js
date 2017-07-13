(function(){
	angular
		.module('pi.core.article')
		.factory('pi.core.article.articleSvc', ['piHttp', '$log', function(piHttp, $log){

			var self = this;

			this.schema = [
			{
				name: 'id',
				type: 'objectId',
				required: true
			},
			{
				name: 'name',
				type: 'shortString',
				required: true
			},
			{
				name: 'headline',
				type: 'shortString',
				required: false
			},
			{
				name: 'articleBody',
				type: 'string',
				required: true
			},
			{
				name: 'keywords',
				type: 'string',
				required: false
			},
			{
				name: 'datePublished',
				type: 'string',
				required: false
			},
			{
				name: 'dateCreated',
				type: 'string',
				required: false
			},
			{
				name: 'image',
				type: 'string',
				required: false
			},
			{
				name: 'categoryPath',
				type: 'string',
				required: false
			},
			{
				name: 'category',
				type: 'string',
				required: false
			},
			{
				name: 'viewsCounter',
				type: 'int',
				required: false
			},
			{
				name: 'state',
				type: 'int',
				required: true
			},
			{
				name: 'author',
				type: 'string',
				required: false
			},
			{
				name: 'refferName',
				type: 'string',
				required: false
			},
			{
				name: 'refferUrl',
				type: 'string',
				required: false
			},
			{
				name: 'refferImage',
				type: 'string',
				required: false
			}];


			this.post = function(model){
				return piHttp.post('/article', model);
			}

			this.postPublisheDate = function(id, date){
				return piHttp.post('/article-publish/' + id, {
					id: id,
					date: date
				});
			}

			this.postCategory = function(id, catId){
				return piHttp.post('/article-save-category/' + id, {
					id: id,
					categoryId: catId
				});
			}

			this.postState = function(id, state){
				return piHttp.post('/article-state/' + id, {
					id: id,
					state: state
				});
			}

			this.postKeywords = function(id, keywords) {
				return piHttp.post('/article-keywords/' + id, {
					id: id,
					keywords: _.isArray(keywords) ? keywords : [keywords]
				});	
			}

			this.removeKeywords = function(id, keywords) {
				return piHttp.delete('/article-keywords/' + id, {
					id: id,
					keywords: _.isArray(keywords) ? keywords : [keywords]
				});	
			}

			this.postReffer = function(id, name, url, image){
				return piHttp.post('/article-reffer/' + id, {
					refferName: name,
					refferImage: image,
					refferUrl: url
				});
			}

			this.removeReffer = function(id, name, url, image){
				return piHttp.delete('/article-reffer/' + id);
			}

			this.remove = function(id) {
				return piHttp.post('/article-remove/' + id);
			}

			this.put = function(id, model) {
				return piHttp.post('/article/' + id, model);
			}

			this.get = function(id, model) {
				return piHttp.get('/article/' + id, model);
			}
			
			this.config = {};

			this.reset = function() {
				self.config = {
					lc: 'pt_PT',
					sortOrder: null,
					sortBy: null,
					size: 10
				};
			}

			this.withLanguage = function(lc) {
				self.config.lc = lc;
			}

			this.sortOrder = function(sort){
				self.config.sortOrder = sort;
			}

			this.sortBy = function(sort){
				self.config.sortBy = sort;
			}

			this.size = function(size){
				self.config.size = size;
			}

			this.find = function(model) {
				var promise = piHttp.get('/article', {params: model});
				self.reset();
				promise.then(function(res) {
					if(piHttp.isPersist()) {
						piHttp.persist(self.schema, res.data.articles);
					}
				});
				return promise;
			};
			return this;
		}]);
})();
