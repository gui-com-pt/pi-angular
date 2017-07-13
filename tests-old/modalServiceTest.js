describe('Tests for Modal Service', function(){
    var $rootScope,
        $compile,
        $scope;

    beforeEach(module('pi'));

    beforeEach(inject(function(_$rootScope_, _$compile_) {
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $compile = _$compile_;
    }));

    it('Should request recover email', function(){

    });

})