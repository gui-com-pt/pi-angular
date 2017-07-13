(function(){
	angular
		.module('pi.gallery')
		.directive('piGallery', [function(){
	    	return {
	    		templateUrl: 'core/pi-gallery.tpl.html',
	    		scope: {
	    			images: '='
	    		},
	    		replace: true,
	    		controller: ['$scope', '$rootScope', function($scope, $rootScope){
	    			$scope.path = "src";
					$scope.tileWidth = 150;
					$scope.tileHeight = 150;

					$scope.displayImage = function (img) {
						$scope.selected = $scope.images.indexOf(img);
						$scope.selectedImg = img;
						$scope.showModal = true;
					};

					$scope.close = function(){
						$scope.showModal = false;
					}
	    		}]
	    	}
	    }]);

	    
})();