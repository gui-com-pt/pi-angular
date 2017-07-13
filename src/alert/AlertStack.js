(function(){
  var piAlertStack = function(piStack)
  {
    var stack = {};
    var alertsOpened = piStack.create();

    var open = function(instance, alert)
    {
      alertsOpened.add(instance, alert);
    };

    var close = function(instance, result) {
      alertsOpened.remove(instance);
    }

    var dismiss = function(instance, reason)
    {
      alertsOpened.remove(instance);
    };

    var top = function(){
      return alertsOpened.top();;
    }

    return {
      open: open,
      dismiss: dmiss,
      close: close,
      top: top
    }
  };
  piAlertStack.inject = ['piStack'];

  var piAlert = function(piAlertStack, $q) {

    var piAlertProvider = {
      options: {
        relative: true
      },
    $get: ['$injector', '$rootScope', '$q', '$http', '$templateCache', '$controller', 'piAlertStack',
    function ($injector, $rootScope, $q, $http, $templateCache, $controller, $modalStack) {
      var piAlert = {};

      function getTemplatePromise(options) {
        return options.template ? $q.when(options.template) :
          $http.get(options.templateUrl, {cache: $templateCache}).then(function (result) {
            return result.data;
          });
      }

      function getResolvePromises(resolves) {
        var promisesArr = [];
        angular.forEach(resolves, function (value, key) {
          if (angular.isFunction(value) || angular.isArray(value)) {
            promisesArr.push($q.when($injector.invoke(value)));
          }
        });
        return promisesArr;
      }
        piAlert.open = function(alertOptions) {
            var alertResultDererred = $q.defer(),
                alertOpenedDeferred = $q.defer(),
                instance = {
                  result: modalResultDeferred.promise,
                  opened: modalOpenendDeferred.promise,
                  close: function(result) {
                    piAlertStack.close(instance, result);
                  },
                  dismiss: function(reason) {
                    piAlertStack.dismiss(instane, reason);
                  }
                };
            modal
            piAlertStack.open(instance, alert);
        };

        alertOptions = angular.extend({}, alertProvider.options, alertOptions);
        alertOptions.resolve = alertOptions.resolve || {};

        if(!modalOptions.template && !modalOptions.templateUrl) {
          throw new Error('One of template or templateUrl options is required.');
        }

        var tplAndResolvePromise = $q
        .all([getTemplatePromise(alertOptions)])
        .concat(getResolvePromises(alertOptions.resolve));
    }]
};
    angular
      .module('pi')
      .provider('piAlert', piAlert)
      .factory('piAlertStack', piAlertStack);
  };

  piAlert.$inject = ['piAlertStack', '$q'];

  piAlertContainer = function(){
      var link = function(scope, elem, attrs)
      {
        scope.close = function(evt)
        {
          evt.preventDefault();
          evt.stopPropagation();
          var alert = piAlertStack.getTop();
          //if (alert && alert.value.backdrop && modal.value.backdrop != 'static' && (evt.target === evt.currentTarget)) {
          $modalStack.dismiss(modal.key, 'backdrop click');
        };
      };

      return {
        restrict: 'EA',
        templateUrl: 'pi/alert-container.html'
      }
  };

})();
