(function() {
    var svcFn = function($modal, $q) {

        var modalSvc = {};

        modalSvc.configuration = {
            internalErrorTitle: 'Erro Interno',
            internalErrorContent: 'Ocorreu um erro interno na nossa Plataforma que foi registado. Pedimos desculpa pelo incómodo.'
        };

        this.$get = function(){

            return modalSvc;
        };

        modalSvc.success = function(title, message) {
            addModal(title, message);
        };

        modalSvc.internalError = function(response) {
            addModal(modalSvc.configuration.internalErrorTitle, modalSvc.configuration.internalErrorContent);
        };

        var addModal = function(title, message, errors, statusCode) {
            var deferred = $q.defer();
            var instance = $modal.open({
                templateUrl: 'modalDisplay.html',
                controller: 'modalDisplayCtrl',
                resolve: {
                    modalObj: function() {
                        var res =  {
                            title: title,
                            body: message,
                            errors: _.isArray(errors) && errors.length > 0 ? errors : []
                        };
                        if(!_.isUndefined(statusCode)) {
                            res.sucess = statusCode < 300;
                            res.warning = statusCode >= 300 && statusCode < 400;
                            res.error = statusCode >= 400 && statusCode < 600;
                        } else if(res.errors.length > 0) {
                            res.sucess = false;
                            res.warning = false;
                            res.error = true;
                        } else {
                            res.sucess = true;
                            res.warning = false;
                            res.error = false;
                        }
                        return res;
                    }
                }
            });

            instance.result.then(function(res) {
                deferred.resolve(res);
            }, function(res) {
                deferred.reject(res);
            });

            return deferred.promise;
        };

        var confirmModal = function(title, content, btnConfirm, btnDismiss) {
            var deferred = $q.defer();

            var instance = $modal.open({
                templateUrl: 'modalConfirm.html',
                controller: 'modalConfirmCtrl',
                resolve: {
                    model: function(){
                        return {
                            title: title,
                            content: content,
                            btnDismiss: _.isUndefined(btnDismiss) ? 'Cancelar' : btnDismiss,
                            btnConfirm: _.isUndefined(btnConfirm) ? 'Ok' : btnConfirm
                        }
                    }
                }
            });

            instance.result.then(function(res) {
                deferred.resolve(res);
            }, function(res) {
                deferred.reject(res);
            });

            return deferred.promise;
        };
        /**
         * Modal Confirmation
         *
         * @return $q promise to handle the user behaviour: ok or cancel
         */
        modalSvc.confirm = confirmModal;

        modalSvc.display = function(res) {
            var response = _.isUndefined(res.data) ? res : res.data;
            var title = '';
            switch (response.statusCode) {
                case 400:
                    title = 'Erro de validação';
                    break;
                case 500:
                    title = 'Erro interno';
                    break;
            }
            var errors = _.isArray(response.validationErrors) ?
                    response.validationErrors :
                        !_.isUndefined(response.errors)  && _.isArray(response.errors) ? response.errors : [];
            var message = !_.isEmpty(response.errorDescription) ?
                    response.errorDescription :
                !_.isEmpty(response.errorMessage) ? response.errorMessage :
                !_.isEmpty(response.message) ? response.message :
                '';

            return addModal(title, message, errors, response.statusCode);
        };

        return modalSvc;
    };

    var confirmCtrl = function($scope, $modalInstance, model, $sce) {
        $scope.title = model.title;
        $scope.content = model.content;
        $scope.btnConfirm = model.btnConfirm;
        $scope.btnDismiss = model.btnDismiss;

        $scope.submit = function(){
             $modalInstance.close();

        };

        $scope.cancel = function(){
           $modalInstance.dismiss();
        };
    };

    var displayCtrl = function($scope, $modalInstance, modalObj, $sce) {
        $scope.title = modalObj.title;
        $scope.instance = $modalInstance;
        var body = !_.isEmpty(modalObj.body) ? modalObj.body :
            modalObj.errors.length > 0 ? null : 'Pedimos desculpa, ocorreu um erro interno.';

        $scope.status = {
            warning: modalObj.warning,
            error: modalObj.error,
            success: modalObj.success
        };

        $scope.body = $sce.trustAsHtml(body);
        $scope.errors = modalObj.errors;

        $scope.ok = function() {
            $modalInstance.close();
        };
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');

        };
    };

    angular
        .module('pi')
        .service('piModal', ['$modal', '$q', svcFn])
        .controller('modalConfirmCtrl', ['$scope', '$modalInstance', 'model', '$sce', confirmCtrl])
        .controller('modalDisplayCtrl', ['$scope', '$modalInstance', 'modalObj', '$sce', displayCtrl]);
})();