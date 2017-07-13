(function(){
    var fn = function($resource, fittingModel, piHttp) {
        return $resource(piHttp.getBaseUrl() + '/feed/' + fittingModel.userId,
            {},
            {
                'query': {
                    method: 'GET',
                    transformResponse: function(res) {
                        return angular.fromJson(res).feeds || [];
                    },
                    isArray: true
                }
            });
    };

    fn.$inject = ['$resource', 'fittingModel', 'piHttp'];

    angular
        .module('pi')
        .factory('FeedResource', fn);
})();
