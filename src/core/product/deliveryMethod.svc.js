(function(){
	angular
		.module('pi.core.product')
		.factory('pi.core.product.deliveryMethod', [function(){
			var svc = [
				{ key: 'Direct Download', value: 1 },
				{ key: 'Freight', value: 2 },
				{ key: 'Mail', value: 3 },
				{ key: 'Own Fleet', value: 4 },
				{ key: 'PickUp Mode', value: 5 },
				{ key: 'DHL', value: 6 },
				{ key: 'Federal Express', value: 7 },
				{ key: 'UPS', value: 8 }
			];
			return svc;
		}]);
})();