describe('Ionic', function(){
    var $rootScope,
        $compile,
        $scope;

    beforeEach(module('pi'));

    beforeEach(inject(function(_$rootScope_, _registerSvc_, _recoverSvc_, _accountApi_, _$httpBackend_, _$compile_) {
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
    }));

    afterEach(function(){
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should create new account', function(){
        
    });
});