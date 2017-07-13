(function(){
	'use strict';

	angular
		.module('pi.core.app')
		.factory('pi.core.payment.paymentSvc', ['piHttp', function(piHttp){

			this.post = function(model){
				return piHttp.post('/payment/report', model);
			}

			this.get = function(id, model) {
				return piHttp.get('/payment/report/' + id, model);
			}

			this.find = function(model) {
				return piHttp.get('/payment/report', model);
			};

			return this;
		}]);
})();