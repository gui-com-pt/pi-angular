(function(){
	angular
		.module('pi.core.product')
		.factory('pi.core.product.offerStatus', [function(){
			var svc = [
				{ damagedCondition: 1 },
				{ newCondition: 2 },
				{ refurbishedCondition: 3 },
				{ usedCondition: 4 }
			];
			return svc;
		}]);
})();