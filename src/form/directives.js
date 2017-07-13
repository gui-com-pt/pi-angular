(function(){
		'use strict';
    /**
     * @ngdoc directive
     * @name Pi Form
     * @description Directory to create a form
     */
	var piForm = function(){

        var compileFn = function(cElement, cAttrs, transclude) {

            var preFn = function(scope, pElement, pAttrs, pController) {

                },
                postFn = function(scope, pElement, pAttrs, pController) {

                };

            return {
                pre: preFn,
                post: postFn
            }
        };

				var controller = function($scope, $injector, $http, piStack)
		    {
		      if(_.isUndefined($scope.httpMethod)) {
		        $scope.httpMethod = 'POST';
		      }

		      var isService = !_.isUndefined($scope.serviceApp) && !_.isUndefined($scope.serviceUri);
		      $scope.model = {};

		      this.submit = function()
		      {
		        if(isService) {
		          serviceHandler();
		        } else if(isHttp) {
		          httpHandler();
		        } else {

		        }
		      };

		      this.setPreventSave = function()
		      {
		        $scope.$on('tentar mudar pagina', function(){
		          // mostrar modal que retorna uma promessa a ver se muda de página ou ão
		        });
		      };

		      var serviceHandler = function(dto)
		      {
		        var service = piServiceResolver.get($scope.serviceUri);
		        if(_.isNull(service)) {
		          // error
		        }
		        ServiceBroker.executeRequest($scope.serviceRequest, $scope.httpMethod, request)
		        .then(function(res) {
		            scope.onSuccess();
		          }, function(res) {
		            scope.onFailure();
		          });

		      };

		      var httpHandler = function(dto)
		      {
		        $http[$scope.httpMethod]($scope.httpUri, dto)
		          .then(function(res) {
		            scope.onSuccess();
		          }, function(res) {
		            scope.onFailure();
		          });
		      };
		    };
				controller.$inject = ['$scope', '$injector', '$http', 'piStack'];
        return {
            compile: compileFn,
						controller: controller,
						controllerAs: 'piFormCtrl'
        };
    };

    var piFormGroup = function($compile){
        var controllerFn = function($scope, $element, $attrs){

						var guide;

            this.focus = function(){
							if($attrs.piFormGuide){
								guide = $compile('<div class="fit-form__guide">' + $attrs.piFormGuide + '</div>')($scope);
								$element.append(guide);
							}
							// show help guide

                // show all labels with hide attr on form group
            };

            this.blur = function(){
								if(guide){
									guide.remove();
								}
                // hide all la
                // bels with hide attr  on form group
            }
        }
        return {
            controller: controllerFn,
						controllerAs: 'piFormGroupCtrl',
						require: '^piForm'
        }
    };
		piFormGroup.$inject = ['$compile'];

    var piFormFooter = function(){
        return {};
    };

    var piFormControl = function(piFormConfig){
        var compileFn = function(cElement, cAttrs) {

            var preFn = function(scope, pElement, pAttrs, parentCtrl) {
						//	if(piFormConfig.applyPiClasses && !pElement.hasClass('pi-form__control'))
								pElement.addClass('pi-form__control');

              var focusFn = function(fElement) {
                  parentCtrl.focus();
              };
              pElement.on('focus', focusFn);

							var blurFn = function(fElement){
								parentCtrl.blur();
							}
							pElement.on('blur', blurFn)
            },
            postFn = function(scope, pElement, pAttrs) {

            };

            return {
                pre: preFn,
                post: postFn
            }
        };
        return {
            compile: compileFn,
						restrict: 'EA',
						require: '^piFormGroup',
        }
    };
		piFormControl.$inject = ['piFormConfig'];

    var piFormLabel = function(){

        var compileFn = function(cElement, cAttrs, transclude) {

            var preFn = function(scope, pElement, pAttrs, pController) {
                    if(_.isNull(pAttrs.piHideFocus) && pAttrs.piHideFocus == true) {
                        cElement.css('display', 'none');
                    }
                },
                postFn = function(scope, pElement, pAttrs, pController) {

                };

            return {
                pre: preFn,
                post: postFn
            }
        };

        return {
            restrict: 'EAC',
            compile: compileFn
        };
    }

		var piFormClear = function()
	  {


	  };

	  var piFormSubmit = function()
	  {
	    var link = function(scope, elem, attrs, piFormCtrl)
	    {
	      var canSubmit = true;
	      var submit = function()
	      {
	        if(!canSubmit) return;
	        canSubmit = !canSubmit;
	        piFormCtrl.submit().success(function() {
	          canSubmit = true;
	        });
	      };
	      elem.bind('click', function(res) {
	        submit();
	      });
	      elem.bind('touch', function(res) {
	        submit();
	      });

	    }
	  }

	  /**
	   * @ng-doc directive
	   * Form Prevent Save
	   *
	   * Prevent a page from changing or some action that clear the form without user confirmation
	   */
	  var piFormPreventSave = function()
	  {
	    var link = function(scope, elem, attrs, piFormCtrl)
	    {
	        piFormCtrl.setPreventSave();
	    };

	    return {
	      restrict: 'A',
	      require: '^piForm',
	      link: link
	    }
	  };

		var piFormConfig = function(){
			var _applyPiClasses = true;

			return {
				setApplyPiClasses: function(value) {
					_applyPiClasses = value;
				},
				$get: function(){
					applyPiClasses: _applyPiClasses
				}
			}
		};

    angular
        .module('pi.form')
				.provider('piFormConfig', piFormConfig)
        .directive('piForm', piForm)
        .directive('piFormGroup', piFormGroup)
				.directive('piFormControl', piFormControl)
        .directive('piFormLabel', piFormLabel)
        .directive('piFormFooter', piFormFooter);

})();
