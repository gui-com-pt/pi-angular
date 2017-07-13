describe('piHttpTests', function(){
    var $rootScope,
        piHttp,
        $httpBackend,
        $scope;

    beforeEach(module('pi'));

    beforeEach(inject(function(_$rootScope_, _piHttp_, _$httpBackend_) {
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        piHttp = _piHttp_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function(){
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should do all methods requests', function(){

        $httpBackend
            .expectPOST('/api/account')
            .respond(function(method, url, data, headers) {
                return [200, {  message: 'Success'}]
            });

        var result,
            deferred = piHttp.post('/api/account')
            .then(function(res) {
                result = res;
            });

        expect(deferred).toBeDefined();

        $httpBackend.flush();
        $rootScope.$apply();

        expect(result.message).toBe('Success');
    });

})