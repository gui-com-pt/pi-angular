(function(){
	angular
		.module('pi.core.product')
		.factory('pi.core.product.businessFunction', [function(){
			var svc = [
				{ key: 'ConstructionInstallation', value: 1 },
				{ key: 'Dispose', value: 2 },
				{ key: 'LeaseOut', value: 3 },
				{ key: 'Maintain', value: 4 },
				{ key: 'ProvideService', value: 5 },
				{ key: 'Repair', value: 6 },
				{ key: 'Sell', value: 7 },
				{ key: 'Buy', value: 8 }
			];
			return svc;
		}]);
})();