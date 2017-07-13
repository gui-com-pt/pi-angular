(function(){
  "use strict";

  var piPromptConfirmationStack = function(piStack) {
    var stack = piStack.create();

    var open = function(instance, prompt)
    {
      stack.add(instance, prompt);
    };

    var confirm = function(instance, result)
    {
      stack.remove(instance);
    };

    var dismiss = function(instance, reason)
    {
      stack.remove(instance);
    };

  };

  piPromptConfirmationStack.$inject = ['piStack'];

  /**
   * @ng-doc service
   * @name Prompt Confirmation
   * @description
   * This service allow you to prompt user before commiting an action
   * @todo
   * - implement a provider for prompt modal, alert, etc
   */
  var promtConfirmation = function(piPromptConfirmationStack)
  {
    this.prompt = function(messageOrObject) {
      var config;
      if(_.isObject(messageOrObject)) {
          config = angular.copy(messageOrObject);
      } else {
        config = {
          message: _.isString(messageOrObject) ? messageOrObject : 'Tens a certeza que pretendes continuar?'
        }
      }

      var resultDeferred = $q.defer(),
          openedDeferred = $q.defer(),
          instance = {
            result: resultDeferred,
            opened: openedDeferred,
            dismiss: function() {
              piPromptConfirmationStack.dismiss(instance);
            }
          };

      piPromptConfirmationStack.open(instance, config);
      
    };

    return this;
  };

  promtConfirmation.$inject = ['piPromptConfirmationStack'];

  angular
    .module('pi')
    .factory('piPromptConfirmation', promtConfirmation)
    .factory('piPromptConfirmationStack', piPromptConfirmationStack);
    
})();
