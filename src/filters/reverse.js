/**
 * Filter to reverse a list
 * @ngdoc filter
 * @name reserve
 * @kind function
 *
 * @description
 * Reverse a array without replacing the original array since slice is used to return the array 
 *
 * @return {Array}
 *
 * @example
 * <div ng-repeat="verses in bibles.kingJames | reverse">
 * 	<em ng-bind="verse.number"></em> <span ng-bind="verse.message"></span>
 * </div>
 */
(function(){
	
	var reverseFilter = function(){

	  return function(items) {
	    return items ? items.slice().reverse() : [];
	  };

	};

	angular.module('pi')
		.filter('reverse', reverseFilter);
})();