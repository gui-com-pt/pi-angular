(function(){
	var pagingFn = function(){

        var svc = function(queryFnName){
            this.queryFnName = queryFnName;
            this.observerCallbacks = [];

            this.modelQuery = {
                current: 1,
                limit: 20,
                count: 0
            };

            var self = this;


            this.registerObserver = function(callback){
                self.observerCallbacks.push(callback);
            };

            this.notifyObservers = function() {
                angular.forEach(self.observerCallbacks, function(callback) {
                    callback();
                });
            };

        };

        svc.prototype.update = function(){
            this[this.queryFnName]();
        };

        svc.prototype.dataNext = function(){
            this.modelQuery.current++;
            this.bids = [];

            return this.queryFnName();

        };

        svc.prototype.dataPrevious = function(){
            this.modelQuery.current--;
            this.bids = [];

            this[this.queryFnName]();
        };

        return svc;
    };

    angular
    	.module('pi')
    	.factory('dataPagingBase', pagingFn)
})();