(function(){
	
	angular
		.module('pi')
		.factory('wizardService', ['$q', '$log',
			function($q, $log) {

				var svc = {
					defaultName: 'defaultWizard'
				};
				var wizards = {};

				svc.addWizard = function(name, wizard) {
					wizards[name] = wizard;
				};

				svc.removeWizard = function(name) {
					delete wizards[name];
				};

				svc.getWizard = function(name) {
					var nameToUse = name;
					if(!name) {
						nameToUse = svc.defaultName;
					}

					return wizards[nameToUse];
				}

				return service;
			}])
		.directive('piWizard', [function(){

			var firstRun = true;


			return {
				scope: {
					'currentStep': '=',
					'onFinish': '&',
					'hideIndicators': '=',
					'editMode': '=',
					'name': '@'
				},
				templateUrl: function(elem, attrs) {
					return attrs.template || 'pi/wizard.tpl.html';
				},
				controller: ['$scope', '$element', 'wizardService', '$q',
					function($scope, $element, wizardService, $q) {
						var wizardName = $scope.name || wizardService.defaultName;

						wizardService.addWizard(wizardName, this);

						$scope.$on('$destroy', function(){
							wizardService.remove(wizardName);
						});

						$scope.steps = [];
						$scope.context = {};
						this.context = $scope.context;

						var getStepByTitle = function(title) {
							var found = null;
							angular.forEach($scope.getEnabledSteps(), function(step) {
								if(step.wizardTitle === title) {
									found = step;
								}
							});

							return found;
						}

						var unselectAll = function() {
							 angular.forEach($scope.getEnabledSteps(), function (step) {
			                    step.selected = false;
			                });
			                
			                $scope.selectedStep = null;
						}	

						$scope.getEnabledSteps = function() {

						}

						$scope.$watch('currentStep', function(step) {
							if(!step) return;
							var stepTitle = $scope.selectedStep.wizardTitle;
							if($scope.selectedStep && stepTitle !== $scope.currentStep) {
								$scope.goToStep(getStepByTitle($scope.currentStep));
							}
						});

						this.addStep = function(step) {
							$scope.steps.push(step);

							if($scope.getEnabledSteps().length === 1) {
								$scope.goToStep($scope.getEnabledSteps()[0]);
							}
						}

						$scope.getEnabledSteps = function() {
			                return $scope.steps.filter(function(step){
			                    return step.disabled !== 'true';
			                });
			            };
						
						$scope.goToStep = function(step) {
							if(firstRun) { // bi-passes validation
								unselectAll();
								$scope.selectedStep = step;

								if(!_.isUndefined($scope.currentStep)) {
									$scope.currentStep = step.wizardTitle;
								}
								step.selected = true;
								$scope.$emit('wizard:stepChanged', {step: step});
								firstRun = false;
							} else { 
								var thisStep = $scope.currentStepNumber() > 0
									? $scope.currentStepNumber() - 1
									: 0;
							}
						}
					}]
			}
		}])
		.directive('piWizardStep', [function(){

			return {
				templateUrl: 'pi/wizard-step.tpl.html',
				controller: ['$scope', '$rootScope',
					function($scope, $rootScope) {

						
					}]
			}
		}])
		.directive('piWizardBack', [function(){

			return {
				templateUrl: 'pi/wizard-step.tpl.html',
				controller: ['$scope', '$rootScope',
					function($scope, $rootScope) {

						
					}]
			}
		}])
		.directive('piWizardButton', [function(){

			return {
				templateUrl: 'pi/wizard-step.tpl.html',
				controller: ['$scope', '$rootScope',
					function($scope, $rootScope) {

						
					}]
			}
		}]);
})();