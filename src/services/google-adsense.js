(function(){

	angular
		.module('pi.adsense')
		.run(['$rootScope', '$window', function($rootScope, $window){

			$rootScope.$on('$locationChangeStart', function () {
              Object.keys($window).filter(function(k) { return k.indexOf('google') >= 0 }).forEach(
                function(key) {
                  delete($window[key]);
                }
              );
            });

		}])
		.provider('googleAdSenseService', [function(){
	      
	      var self = this;
	      self.format = 'auto';

	      return {
	        $get: function() {

	          this.getClient = function(){
	            return self.client;
	          };

	          this.getSlot = function(){
	            return self.slot;
	          };

	          this.getFormat = function(){
	            return self.format;
	          };

	          return this;
	        },
	        setClient: function(value){
	          self.client = value;
	        },
	        setSlot: function(value){
	          self.slot = value;
	        },
	        setFormat: function(value){
	          self.format = value;
	        }
	      };

	    }])
	    .directive('googleAdSense', ['googleAdSenseService', function (googleAdSenseService) {
	        
	        return {
	            restrict: 'A',
	            replace: true,       
	            template: '<ins class="adsbygoogle" style="display:block" data-ad-client="{{client}}" data-ad-slot="{{slot}}" data-ad-format="{{format}}"></ins>',
	            controller: ['$scope', 'googleAdSenseService', function($scope, googleAdSenseService){
	              $scope.client = googleAdSenseService.getClient();
	              $scope.slot = googleAdSenseService.getSlot();
	              $scope.format = googleAdSenseService.getFormat();
	              (adsbygoogle = window.adsbygoogle || []).push({});
	            }]
	        };

	    }]);
})();