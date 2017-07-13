describe('Tests for Account Operations', function(){
    var $rootScope,
        $compile,
        $scope;

    beforeEach(module('pi'));

    beforeEach(inject(function(_$rootScope_, _$compile_) {
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $compile = _$compile_;
    }));

    it('Should create new accocd .unt', function(){

    });


    var compileDirective = function(markup, scope) {
        var elementRecover = angular.element(markup);
        $compile(elementRecover)(scope);
        //scope.$digest();
        return elementRecover;
    };

    it('Should request recover email', function(){

       
        var directive = compileDirective('<div pi-account-recover on-success="onSuccess()" on-error="onError()"><input type="text" ng-model="account.email"/></div>', $scope);
    });

})