(function(){
  angular
    .module('pi')
    .directive('ngPrism', ['$interpolate', function($interpolate){
            return {
                restrict: 'AEC',
                template: '<pre><code ng-transclude></code></pre>',
                replace: true,
                transclude: true,
                link: function (scope, elm) {
                    var tmp = $interpolate(elm.find('code').text())(scope);
                    elm.find('code').html(Prism.highlightElement(tmp).value);
                }
            };
        }]);
})();
