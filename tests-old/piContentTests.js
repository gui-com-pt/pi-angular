describe('Tests for Pi Content directives', function(){
    var $rootScope,
        $compile,
        $scope;

    beforeEach(module('pi'));

    beforeEach(inject(function(_$rootScope_, _$compile_) {
        $rootScope = _$rootScope_;
        $compile = _$compile_;
        $scope = $rootScope.$new();
    }));

    var compileDirective = function(markup, scope) {
        var elementRecover = angular.element(markup);
        $compile(elementRecover)(scope);
        //scope.$digest();
        return elementRecover;
    };

    var compileAllDirectives = function(){
      return compileDirective('<div pi-content><div pi-content-view><button class="pi-content-edit" pi-content-edit>Editar</button></div><div pi-content-editable></div></div>', $scope);
    };

    it('Should create directives with normal view as default', function(){

      var directive = compileAllDirectives();
      $scope.$digest();
      var controller = directive.controller;

      expect($scope.getView()).toBe('normal');
    });

    it('Should change from view normal to editing when triggring pi-content-edit button', function(){
        var piContent = compileAllDirectives();
        var piContentEdit = angular.element(piContent[0].querySelector('.pi-content-edit'));
        expect(piContentEdit.length).toNotBe(0);

        expect($scope.getView()).toBe('normal');
        $scope.viewEdit();
        expect($scope.getView()).toBe('edit');

    });
});
