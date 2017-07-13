var INTEGER_REGEXP = /^\-?\d*$/;

(function(){
  var PiSeoValidator = function(SeoValidator)
  {


    var linkFn = function(scope, elem, attrs, ctrl)
    {
      ctrl.$parsers.unshift(function(viewValue) {
       if (INTEGER_REGEXP.test(viewValue)) {
         // it is valid
         ctrl.$setValidity('integer', true);
         return viewValue;
       } else {
         // it is invalid, return undefined (no model update)
         ctrl.$setValidity('integer', false);
         return undefined;
       }
     });
    };

    return {
      require: 'ngModel', // Validation is run agains the ng-model
      link: linkFn
    };
  };

  PiSeoValidator.$inject = ['SeoValidator'];

  angular
    .module('pi')
    .directive('piSeoValidator', PiSeoValidator);
})();
