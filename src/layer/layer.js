(function(){
    angular
        .module('pi')
        .directive('piLayerHover', ['piLayer', '$timeout', 'piLayerStack', function(piLayer, $timeout, piLayerStack){

            return {
                link: function(scope, elem, attrs) {

                    var waiting = false,
                        waitingShow = false,
                        instance = null,
                        showTimer = null;

                    elem.on('mouseenter', function(){
                        waitingShow = true;

                        var topPos  = elem.offset().top;
                        var leftPos = elem.offset().left;

                        showTimer  = $timeout(function(){
                            waitingShow = false;
                            instance = piLayer.open({
                                namespace: scope.piNamespace,
                                entity: scope.piEntity,
                                top: topPos,
                                left: leftPos,
                                width: elem.width()
                            })
                        }, 700);


                    });

                    var clearFn = function(){
                        if(waitingShow) {
                            $timeout.cancel(showTimer)
                        }
                        waiting = true;
                        $timeout(function(){
                            scope.$apply(function(){
                                if(!_.isNull(instance)) {
                                    instance.close();
                                }
                            });
                        }, 3000)
                    }
                    elem.on('mouseleave', clearFn);
                    elem.on('blur', clearFn);
                },
                scope: {
                    piNamespace: '=',
                    piEntity: '='
                }
            }
        }])
        .directive('piLayerWindow', ['piLayerStack', function(piLayerStack){

            return {

                controller: function($scope){
                    $scope.visible = false;
                    $scope.current = piLayerStack.getTop();

                    $scope.closeCurrent = function(){
                        piLayerStack.dismiss($scope.current);
                        if(piLayerStack.length() > 0) {
                            $scope.current = piLayerStack.getTop();
                        } else {
                            $scope.current = null;
                            $scope.visible = false;
                        }
                    };

                    piLayerStack.onAdded(function(layer, opts){
                        currentLayer = layer;
                        if(!_.isUndefined($scope.current)) {
                            $scope.closeCurrent();
                        }

                        $scope.$apply(function(){
                            $scope.visible = true;
                            $scope.current = opts.entity;
                            $scope.top = opts.top;

                            $scope.left = opts.left - opts.width;
                        });
                    });


                }
            }
        }])
        .factory('piLayer', ['piLayerStack', '$q', function(piLayerStack, $q){
            this.open = function(opts) {
                var resultDeferred = $q.defer(),
                    openDeferred = $q.defer(),
                    instance = {
                        result: resultDeferred.promise,
                        opened: openDeferred.promise,
                        close: function(result) {
                            piLayerStack.close(instance);
                        },
                        dismiss: function(reason) {
                            piLayerStack.dismiss(instance);
                        }
                    };

                piLayerStack.open(instance, opts);

                return instance;
            };

            return this;
        }])
        .factory('piLayerStack', ['piStack', function(piStack){
            var stack = {};
            var callable;
            var layersVisibled = piStack.create();

            var open = function(instance, opts) {
                layersVisibled.add(instance, opts);
                if(!_.isUndefined(callable)){
                    callable(instance, opts);
                }

                return instance;
            }

            var close = function(instance) {
                layersVisibled.remove(instance);
            }

            var dismiss = function(instance) {
                layersVisibled.remove(instance);
            }

            var getTop = function() {
                return layersVisibled.top();
            }

            var getLength = function(){
                return layersVisibled.length();
            }

            return {
                length: getLength,
                open: open,
                onAdded: function(c) {
                    return callable = c;
                },
                length: function(){
                    return layersVisibled.length();
                },
                dismiss: dismiss,
                close: close,
                getTop: getTop
            }
        }]);
})();