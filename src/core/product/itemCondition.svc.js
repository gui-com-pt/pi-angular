(function(){
	angular
		.module('pi.core.product')
		.factory('pi.core.product.itemCondition', [function(){
			var svc = [
				{ key: 'Discontinued', value: 1 },
				{ key: 'InStock', value: 2 },
				{ key: 'InStoreOnly', value: 3 },
				{ key: 'LimitedAvailability', value: 4 },
				{ key: 'OnlineOnly', value: 5 },
				{ key: 'PutOfStock', value: 6 },
				{ key: 'PreOrder', value: 7 },
				{ key: 'SoldOut', value: 8 }
			];
			return svc;
		}]);
})();