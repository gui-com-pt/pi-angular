(function(){
  angular
    .module('pi.ui-router')
    .factory('pi.ui-router.stateUtils', ['$stateParams', function($stateParams){
      return {
        getModelFromStateParams: function(names, model){

            angular.forEach(names, function(value){
                if(!_.isUndefined($stateParams[value])) {
                    model[value] = $stateParams[value];
                }
            });

            return model;
        }
      }
    }]);
})();
