(function(){
	angular
		.module('pi.core')
		.provider('pi.core.responseUtilsSvc', [function(){

			var getModelFromStateParams = function(names, model){
                angular.forEach(names, function(value){
                    if(!_.isUndefined($stateParams[value])) {
                        model[value] = $stateParams[value];
                    }
                });

                return model;
            };
			return {
				$get: ['$stateParams', function($stateParams){
					return {
						orderByNewest: function(items, keyDate) {
							if(!_.isArray(items) || !_.isString(keyDate)) {
								return null;
							}

							var events = _.groupBy(items, function (event) {
		                      return moment.utc(event[keyDate], 'X').startOf('day').format('DD-MM-YYYY');
		                    });

		                    events = _.map(events, function(group, day){
		                        return {
		                            day: day,
		                            results: group
		                        }
		                    });

							return events;
						},
						getModelFromStateParams: function(names, model){
		                    return getModelFromStateParams(names, model);
		                },
		                getQueryModel: function(data, queryKeys, take){
		                	var take = _.isNumber(take) ? take : 12,
		                		model = {
		                			skip: _.isObject(data) && _.isNumber(data.length) ? data.length : 0, 
		                			take: take
		                		};

		                    getModelFromStateParams(queryKeys, model);
		                    return model;
		                },
					}
				}]
			}
		}]);
})();