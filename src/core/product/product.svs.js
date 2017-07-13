(function(){
	angular
		.module('pi.core.product')
		.factory('pi.core.product.productSvc', ['piHttp', function(piHttp){

			this.post = function(model){
				return piHttp.post('/product', model);
			}

			this.get = function(id, model) {
				return piHttp.get('/product/' + id, model);
			}

			this.find = function(model) {
				return piHttp.get('/product', {params: model});
			};

			this.postOffer = function(productId, model) {
				return piHttp.post('/product-offer/' + productId, model);
			}

			return this;
		}]);
})();