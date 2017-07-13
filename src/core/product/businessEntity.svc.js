(function(){
	angular
		.module('pi.core.product')
		.factory('pi.core.product.businessEntity', [function(){
			var svc = [
				{ key: 'Business', value: 1 },
				{ key: 'Enduser', value: 2 },
				{ key: 'PublicInstitution', value: 3 },
				{ key: 'Reseller', value: 4 }
			];
			return svc;
		}]);
})();