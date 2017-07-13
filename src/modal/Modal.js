(function(){
  var piModalStack = function(piStack)
  {
    var stack = {};
    var modalsOpened = piStack.create();

    var open = function(instance, modal)
    {
      modalsOpened.add(instance, modal);
    };

    var close = function(instance, result){
        modalsOpened.remove(instance);
    };

    var dismiss = function(instance, reason) {
      modalsOpened.remove(instance);
    };

    return {
        open: open,
        close: close,
        dismiss: dismiss
    }
  };

  piModalStack.$inject = ['piStack'];

  var piModal = function(piModalStack, $q)
  {
      this.open = function(modal)
      {
        var modalResultDeferred = $q.defer(),
            modalOpenedDeferred = $q.defer(),
            instance = {
              result: modalResultDeferred.promise,
              opened: modalOpenedDeferred.promise,
              close: function (result) {
                piModalStack.close(instance, result);
              },
              dismiss: function (reason) {
                piModalStack.dismiss(instance, reason);
              }
            };
        piModalStack.open(instance, modal);
      };

      return this;
  };

  piModal.$inject = ['piModalStack', '$q'];

  /**
   * Directive that handles the priority with z-index
   */
  var piModalBack = function($compile)
  {
    var ctrl = function() {

    };
    ctrl.$inject = [];

    return {
      templateUrl: 'pi/modal-back.html',
      controllerAs: 'ctrl',
      controller: ctrl
    }
  };

  var piModalWindow = function(piModalStack, $timeout) {
    var link = function(scope, elem, attrs) {
        scope.windowClass = attrs.windowClass;

        $timeout(function(){
          $scope.animate = true;
          elem[0].focus();
        });

        scope.close = function(evt) {
          var modal = $modalStack.getTop();
          if(modal && modal.value.backdrop){
            
          }
        }
    };
    return {
      restruct: 'EA',
      scope: {
        index: '@',
        animate: '='
      },
      replace: true,
      transclude: true,
      templateUrl: 'pi/modal-window.html',
      link: link
    }
  };

  piModalBack.$inject = ['$compile'];
})();
