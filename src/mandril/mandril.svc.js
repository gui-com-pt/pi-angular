(function(){
  (function(){
    angular
      .module('pi.mandril')
      .provider('piMandril', [function(){
      	var _token = '';
      	return {
      		$get: ['$q', function($q){

  				this.send =  function(from, fromName, to, toName, subject, body) {
  				      var mandrill_client = new mandrill.Mandrill(_token);

  					var promise = $q.defer(),
  						message = {
  		                  "html": body,
  		                  "text": body,
  		                  "subject": subject,
  		                  "from_email": from,
  		                  "from_name": 'Formulário',
  		                  "to": [{
  		                          "email": to,
  		                          "name": "Website",
  		                          "type": "to"
  		                      }]
  		              	};
  		              mandrill_client.messages.send({"message": message, "async": false}, function(result) {
  		                  promise.resolve(result);
  		              }, function(e) {
  		                  promise.reject(e);
  		              });

  		             return promise.promise;
      			}

      			return this;
      		}],
      		setToken: function(value){
      			_token = value;
      		}

      	}
      }]);
  })();
})();
