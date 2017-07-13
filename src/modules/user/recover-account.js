(function(){
    var svcFn = function(accountApi, $q) {

        this.recover = function(email){

            var deferred = $q.defer(),
                successFn = function(res){
                    deferred.resolve(res.data);
                },
                errorFn = function(res) {
                    deferred.reject(res);
                };

            accountApi
                .recoverFromEmail(email)
                .then(successFn, errorFn);

            return deferred.promise;
        };
    };

    var directiveFn = function(recoverSvc){
        var linkFn = function(scope, element, attrs) {

            scope.recover = function(){

                var successFn = function(res){
                        scope.onSuccess(res);
                    },
                    errorFn = function(res) {
                        scope.onError(res);
                    };

                recoverSvc
                    .recover(scope.email)
                    .then(successFn, errorFn);
            };
        };

        return {
            link: linkFn,
            replace: false,
            scope: {
                'onSuccess': '&',
                'onError': '&'            }
        }
    };

    var directiveSubmit = function()
    {
        var linkFn = function(scope, element, attrs, parentCtrl)
        {
            element.bind('click', function(){
                parentCtrl.recover();
            })
        };

        return {
            replace: false,
            link: linkFn
        }
    };

    angular
        .module('pi')
        .service('recoverSvc', ['accountApi', '$q', svcFn])
        .directive('piAccountRecover', ['recoverSvc', directiveFn])
        .directive('piAccountRecoverSubmit', directiveSubmit);
})();
