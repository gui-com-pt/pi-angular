describe('Directive SEO Validator', function(){
	 var $scope, form, commonUtils;

	beforeEach(module('pi'));

  beforeEach(inject(function($compile, $rootScope, _commonUtils_) {
    $scope = $rootScope;
    commonUtils = _commonUtils_;
    var element = angular.element(
      '<form name="form">' +
      '<input ng-model="model.somenum" name="somenum" pi-seo-validator />' +
      '</form>'
    );
    $scope.model = { somenum: null }
    $compile(element)($scope);
    $scope.$digest();
    form = $scope.form;
  }));

	describe('Title', function(){
    it('should pass with integer', function() {
      var text = commonUtils.randomText(20);
      form.somenum.$setViewValue(3);
      expect($scope.model.somenum).toEqual(3);
      expect(form.somenum.$valid).toBe(true);
    });
    it('should not pass with string', function() {
      form.somenum.$setViewValue('a');
      expect($scope.model.somenum).toBeUndefined();
      expect(form.somenum.$valid).toBe(false);
    });
  });
});
