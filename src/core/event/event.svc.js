(function(){
	'use strict';

	angular
		.module('pi.core.app')
		.factory('pi.core.app.eventSvc', ['piHttp', function(piHttp){

			this.post = function(model){
				return piHttp.post('/event', model);
			}

			this.get = function(id, model) {
				return piHttp.get('/event/' + id, model);
			}

			this.find = function(model) {
				return piHttp.get('/event', {params: model});
			};

			this.remove = function(id) {
				return piHttp.post('/event-remove/' + id);
			};

			this.put = function(id, model) {
				return piHttp.post('/event/' + id, model);
			};

			this.postPublisheDate = function(id, date){
				return piHttp.post('/event-publish/' + id, {
					id: id,
					date: date
				});
			}

			this.postCategory = function(id, catId){
				return piHttp.post('/event-save-category/' + id, {
					id: id,
					categoryId: catId
				});
			}

			this.postState = function(id, state){
				return piHttp.post('/event-state/' + id, {
					id: id,
					state: state
				});
			}

			this.postKeywords = function(id, keywords) {
				return piHttp.post('/event-keywords/' + id, {
					id: id,
					keywords: _.isArray(keywords) ? keywords : [keywords]
				});	
			}

			this.removeKeywords = function(id, keywords) {
				return piHttp.delete('/event-keywords/' + id, {
					id: id,
					keywords: _.isArray(keywords) ? keywords : [keywords]
				});	
			}

			return this;
		}]);
})();