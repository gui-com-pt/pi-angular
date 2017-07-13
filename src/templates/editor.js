(function(){
	/**
	 * @ng-doc overview
	 * @name pi template editor
	 * 
	 * @description
	 * template editor for pi based apps
	 * the editor store dom with angular directives in jsonml
	 */

	 var svcFn = function(){

	 	/**
	 	 * @param bodyJson the jsonml retrieved from database
	 	 */
	 	var main = function(bodyJson) {
	 		this.toolBar = {
	 			items: [],
	 			version: '0.0.1'
	 		};
	 	}

	 };


	 var directive = function($compile){
	 	var compileFn = function(element, attributes) {
	 		var preFn = function(scope, element, attributes, controller) {

	 				},
	 				postFn = function(scope, iElement, attributes, controller) {
	 					$compile(iElement)(scope);
	 				};

	 		return {
	 			pre: preFn,
	 			post: postFn
	 		}
	 	}
 		return {
 			compile: compileFn
 		}
	 };
})();