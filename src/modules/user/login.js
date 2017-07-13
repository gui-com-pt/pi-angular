(function(){
  var service = function($http, $q) {

    /**
     * @ngdoc function
     * @name Login
     * @description
     *
     * Try to authenticate using a username and password
     * If the authentication is confirmed, a token is returned to consume the API
     */
    this.login = function(username, password) {

      var deferred = $q.defer(),
          successFn = function(res) {
            deferred.resolve(res.data);
          },
          errorFn = function(res) {
            deferred.reject(res);
          },
          request = {
            email: username,
            password: password
          },
          httpObj = {
            url: '/login',
            method: 'POST',
            data: request
          };

          $http(httpObj)
            .then(sucessFn, errorFn);

      return deferred.promise;
    };

    /**
     * @ngdoc function
     * @name Domain Black List
     * @description
     *
     * A list of domains blocked from Pi network
     * Those domains have been banned and cannot register or login
     */
    this.domainBlackList = ['gov.pt'];
  };
})();
