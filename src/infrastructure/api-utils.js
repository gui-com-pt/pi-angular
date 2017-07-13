(function(){
	var fn = function(apiException){

		var svc = function(response) {
			this.response = response;

			this.handle = function() {
				if(_.isUndefined(this.response || _.isUndefined(this.response.data))) {
					throw apiException.badRequest;
				}

				if(this.response.statusCode >= 400) {
					
				}

				this.success = true;
				return this.response.data;
			};
		};

		return {
			service: svc,
			setProvider: function(dependency) {
				svc.setHandler(dependency);
			}
		}
	};

	angular
        .module('pi')
		.constant('apiException', {
			badRequest: 502,
			notFound: 404,
			notAuthorize: 501,
			ok: 200
		})
		.factory('apiResponseProvider', ['apiException', fn]);
})();