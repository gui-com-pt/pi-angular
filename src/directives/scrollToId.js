/**
 * @ng-doc directive
 * @name scrollToId
 * @dependencies jquery jquery.animate
 *
 * @description
 * Scroll to an element by his id, animating the window
 *
 * @example
 * <a id="firstSection">First Section</a>
 * <a scroll-to-id scroll-to="firstSection">Scroll to first section</a>
 */
(function(){
	var fn =  function() {                                                      
	    return {                                                                                 
	        restrict: 'A',                                                                       
	        scope: {                                                                             
	            scrollTo: "@"                                                                    
	        },                                                                                   
	        link: function(scope, $elm,attr) {

	        	$elm.on('click', function() {                                                    
	                $('html,body').animate({scrollTop: $(scope.scrollTo).offset().top }, "slow");
	            });
	        }                
	    };
    };
})();