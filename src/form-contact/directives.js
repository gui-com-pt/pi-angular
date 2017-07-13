(function(){
  angular
    .module('pi.form-contact')
    .provider('piFormConfiguration', [function(){
      var config = {
        toName: 'Localhost',
        toEmail: 'local@localhost',
        fromName: 'Localhost',
        fromEmail: 'local@localhost',
        subject: 'Form Contact'
      };
      return {
        $get: [function(){
          this.getToName = function(){
            return config['toName'];
          };

          this.getToEmail = function(){
            return config['toEmail'];
          };

          this.getFromName = function(){
            return config['fromName'];
          };

          this.getFromEmail = function(){
            return config['fromEmail'];
          };

          this.getSubject = function(){
            return config['subject'];
          };

          return this;
        }],
        setToName: function(value){
          config['toName'] = value;
        },
        setToEmail: function(value){
          config['toEmail'] = value
        },
        setFromName: function(value){
          config['fromName'] = value;
        },
        setFromEmail: function(value){
          config['fromEmail'] = value
        },
        setSubject: function(value){
          config['subject'] = value
        }
      }
    }])
    .directive('piFormContact', ['piMandril', 'piFormConfiguration', function(piMandril, piFormConfiguration){

        return {
            link: function(scope, elem, attrs) {
                scope.isActive = false;

                var buildFormBody = function(elems) {
                  var msg = '';
                  angular.forEach(elems, function(value, key){
                    msg = msg + '<p><b>' + value.name + '</b>: ' + value.value + '</p>';
                  });

                  return msg;
                }

                var cleanElements = function(elems){
                  angular.forEach(elems, function(value, key){
                    elems[key].value = '';
                  });
                }

                scope.submit = function(){
                    var elems = elem.find('[pi-form-control]');
                    var res = [];
                    var msg = buildFormBody(elems);

                    var toName = _.isUndefined(elem.attr('pi-form-to-name')) ? piFormConfiguration.getToEmail() : elem.attr('pi-form-to-name'),
                        toEmail = _.isUndefined(elem.attr('pi-form-to-email')) ? piFormConfiguration.getToEmail() : elem.attr('pi-form-to-email'),
                        subject = _.isUndefined(elem.attr('pi-form-subject')) ? piFormConfiguration.getSubject() : elem.attr('pi-form-subject');

                    var fromName = elem.find('[pi-form-from-name]').length > 0 ? elem.find('[pi-form-from-name]')[0].value : piFormConfiguration.getFromName(),
                        fromEmail = elem.find('[pi-form-from-email]').length > 0 ? elem.find('[pi-form-from-email]')[0].value : piFormConfiguration.getFromEmail();

                    isActive = true;
                    piMandril.send(fromEmail, fromName, toEmail, toName, subject, msg)
                      .then(function(res){
                    	   scope.formSented = true;
                         scope.isActive = false;
                         cleanElements(elems);
                    	}, function(err){
                        scope.isActive = false;
                      });
                }
            },
            controller: ['$scope', function($scope){
              this.submit = function(){
                $scope.submit();
              }
            }]
        }
    }])
    .directive('piFormSubmit', [function(){
      return {
        require: '^piFormContact',
        link: function(scope, elem, attrs, piFormContactCtrl) {
          elem.bind('click', function(){
              piFormContactCtrl.submit();
          })
        }
      }
    }]);

})();
