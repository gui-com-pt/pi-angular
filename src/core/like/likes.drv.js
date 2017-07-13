(function(){
    angular
        .module('pi.core.likes')
        .directive('piLikes', [function(){

            var ctrl = function(likesSvc, $scope) {
                var self = this,
                    loaded = false;

                $scope.$watch('entityId', function(current) {
                    if(!current) return;
                    self.entityId = current;
                    if(!loaded) {
                        self.get();
                        loaded = true;
                    }
                });

                $scope.$watch('entityNamespace', function(current) {
                    if(!current) return;
                    self.entityNamespace = current;
                });

                this.get = function() {
                    likesSvc.get(self.entityNamespace, self.entityId)
                        .then(function (res) {
                            self.users = res.data.likes;
                        });
                };


                this.like = function(){
                    likesSvc.like(self.entityNamespace, self.entityId);
                }
            }


            return {
                templateUrl: 'html/pi/likes.tpl.html',
                controller: ['pi.core.likes.likesSvc', '$scope', ctrl],
                controllerAs: 'ctrl',
                scope: {
                    entityId: '=',
                    entityNamespace: '='
                }
            }
        }]);
})();