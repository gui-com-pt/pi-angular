describe('Test: Data Paging factory', function(){
    var dataPagingBase, $q, $rootScope, $httpBackend;

    beforeEach(module('pi'));

    beforeEach(inject(function(_dataPagingBase_, _$q_,  _$rootScope_, _$httpBackend_){
        dataPagingBase = _dataPagingBase_;
        $q = _$q_;
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
    }));

    it("should create a new instance", function(){
        var query = function(model){
            var deferred = $q.defer();

            deferred.resolve({
               data: {
                   results: [
                       {id: 1, name: 'a'},
                       {id: 2, name: 'b'}
                   ]
               }
            });

            return deferred.promise;
        };

        var page = new dataPagingBase(query);
        expect(page.modelQuery.current).toBe(1);

        var responseResolved;
        page.dataNext()
            .then(function(res) {
                responseResolved = res;
            });

        expect(responseResolved).toBeUndefined();
        $rootScope.$apply();
        expect(responseResolved.data.results.length).toBe(2);


        var observerFn = function(res) {

        };
        page.registerObserver(observerFn);


        expect(page.modelQuery.current).toBe(2);
    });

});