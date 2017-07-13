describe('Tests for Account Operations', function(){
    var $rootScope,
        accountApi,
        registerSvc,
        recoverSvc,
        $httpBackend,
        $compile,
        $scope;

    beforeEach(module('pi'));

    beforeEach(inject(function(_$rootScope_, _registerSvc_, _recoverSvc_, _accountApi_, _$httpBackend_, _$compile_) {
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        registerSvc = _registerSvc_;
        accountApi = _accountApi_;
        recoverSvc = _recoverSvc_;
        $httpBackend = _$httpBackend_;
        $compile = _$compile_;
    }));

    afterEach(function(){
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should create new account', function(){

        $httpBackend
            .expectPOST('/api/account')
            .respond(function(method, url, data, headers) {
                return [200, {  message: 'Success'}]
            });

        var result,
            deferred = registerSvc
            .basic('email@msn.com', '123123', '123123', {firstName: 'Guilherme', lastName: 'Cardoso'})
            .then(function(res) {
                result = res;
            });

        expect(deferred).toBeDefined();

        $httpBackend.flush();
        $rootScope.$apply();

        expect(result.message).toBe('Success');
    });


    var compileDirective = function(markup, scope) {
        var elementRecover = angular.element(markup);
        $compile(elementRecover)(scope);
        //scope.$digest();
        return elementRecover;
    };

    it('Should request recover email', function(){

        $httpBackend
           .expectPOST('/api/account/recover')
           .respond(function(method, url, data, headers) {
               return [200, {message: 'Recovered'}]
           });

        var result;
        $scope.onSuccess = function(){
            result = true;
        };

        $scope.onError = function(){
            result = false;
        };
        var directive = compileDirective('<div pi-account-recover on-success="onSuccess()" on-error="onError()"><input type="text" ng-model="account.email"/></div>', $scope);

        angular.element(directive).scope().submit();
        angular.element(directive).scope().$apply();

        $httpBackend.flush();

        expect(result).toBe(true);

        /*
         var result,
         deferred = recoverSvc
         .recover('test@msn.com')
         .then(function(res) {
         result = res
         });

         expect(deferred).toBeDefined();
         $httpBackend.flush();
         $rootScope.$apply();

         expect(result.message).toBe('Recovered');
         */
    });

})