(function() {
    angular
        .module('pi')
        .factory('pi.core.placeSvc', ['piHttp', function (piHttp) {

            this.post= function (dto) {
                return piHttp.post('/place', dto);
            }

            this.find = function () {
                return piHttp.get('/place');
            }

            this.get = function (id) {
                return piHttp.get('/place/' + id);
            }


            return this;

        }]);
})();