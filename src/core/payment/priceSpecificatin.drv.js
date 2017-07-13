(function(){
	
	angular
		.module('pi.core.product')
		.directive('piPriceSpecifications', ['$log', function($log){
			return {

				link: function(scope, elem, attrs, ngModel) {
					scope.view = 'home';
					var modelDefault = {
							eligibleQuantity: null,
							eligibleTransactionVolume: null,
							minPrice: null,
							maxPrice: null,
							price: null,
							priceCurreny: 'EURO',
							validFrom: null,
							validThrough: null,
							valueAddedTaxIncluded: null
						};

					scope.model = {};
					scope.items = [];
			
					scope.setPrice = function() {
						var value = ngModel.$viewValue;
						value.push(scope.model);
						ngModel.$setViewValue(value);	
						scope.items.push(scope.model);

						scope.model = angular.copy(modelDefault);
						scope.view = 'home';
					}

					scope.edit = function(index) {
						scope.editIndex = index;
						scope.editModel = scope.items[index];
						scope.view = 'edit';
					}

					scope.save = function() {
						ngModel.$viewValue[scope.editIndex] = scope.editModel;
						scope.items[scope.editIndex] = scope.editModel;

						scope.view = 'home';
					}

					attrs.$observe('ngModel', function(value){
			        	scope.$watch(value, function(newValue){ 
			        			try {
			        				ngModel.$setViewValue(_.isObject(ngModel.$viewValue) ? ngModel.$viewValue : [modelDefault]);	
			        			} catch(err) {
			        				$log.info('piPriceSpecification couldnt set the ngModel, the default is used. Error: ' + err);
			        				ngModel.$setViewValue([modelDefault]);
			        			}
			                    
			            });
			        });

			        scope.model = angular.copy(modelDefault);
				},
				scope: {
					'piPriceSpecifications': '@'
				},
				require: '^ngModel',
				templateUrl: 'html/pi/price-specification.tpl.html'
			}
		}]);
})();