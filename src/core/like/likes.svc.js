(function(){
	angular
		.module('pi.core.likes')
		.factory('pi.core.likes.likesSvc', ['piHttp', function(piHttp){

            this.get = function(namespace, id) {
                return piHttp.get('/like/' + namespace + '/' + id);
            };

            this.hasLiked = function(namespace, id) {

            }

            this.like = function(namespace, id) {
                return piHttp.post('/like/' + namespace + '/' + id);
            }

            return this;

        }]);
})();