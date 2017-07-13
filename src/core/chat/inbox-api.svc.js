(function(){

	angular
		.module('pi.core.chat')
		.factory('pi.core.chat.inboxSvc', ['piHttp', '$rootScope', function(piHttp, $rootScope){

			this.post = function(model){
				return piHttp.post('/inbox', model);
			}

			this.get = function(id) {
				var model = {};
				model.fromId = id;
				model.toId = $rootScope.userId;
				return piHttp.post('/inbox-view', model);
			}

			return this;
		}]);
})();