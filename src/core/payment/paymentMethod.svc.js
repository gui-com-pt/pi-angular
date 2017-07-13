(function(){
	angular
		.module('pi.core.payment')
		.factory('pi.core.payment.paymentMethod', [function(){
			var svc = [
				{ byBankTransferInAdvance: 1 },
				{ byInvoice: 2 },
				{ cash: 3 },
				{ checkInAdvance: 4 },
				{ cod: 5 },
				{ directDebit: 6 },
				{ googleCheckout: 7 },
				{ payPal: 8 },
				{ paySwarm: 9 }
			];
			return svc;
		}]);
})();