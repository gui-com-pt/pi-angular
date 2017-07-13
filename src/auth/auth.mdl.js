(function(){
  angular
    .module('pi.auth', ['pi']);

  angular
    .module('pi.auth')
    .provider('piConfiguration', function(){
      var config = function(){
        var m = {};
        m.providers = ['basic'];
        m.loginUri = '/login';
        m.logoutUri = '/logout';

        return m;
      };

      var provider = function(){
        var me = config();
        var configs = {};
        configs['default'] = me;

        me.config = function(configName) {
          var c = configs[configName];
          if(!c) {
            c = config();
            configs[configName] = c;
          }
          return c;
        };

        me.$get = ['$q', function($q){
          var deferred = $q.defer();

          return function(configName) {
            return configs[configName];
          }
        }];

        return me;

      };

      return provider();
    })
    .controller('registerCtrl', ['$scope', 'piConfiguration', 'accountApi', function($scope, piConfiguration, accountApi){
      $scope.init = function(configName) {
        var config = piConfiguration(configName);
      }

      $scope.register = function(firstName, lastName, email, password, passwordConfirm, meta) {
        var req = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password
        };

        if(meta) {
          req = angular.extend(req, meta)
        }

        accountApi.register(req)
          .then(function(res){
            window.location = '/';
          }, function(res){
            alert('erro no login');
          });
      }
    }])
    .directive('piRegister', ['$document', function($document){
      return {
        controller: 'registerCtrl',
        controllerAs: 'ctrl',
        transclude: true,
        replace: true,
        template: '<div ng-transclude></div>',
        compile: function compile(tElement, tAttrs, transclude) {
           return {
              pre: function preLink(scope, elemt, attrs, controller){

              },
              post: function postLink(scope, elem, attrs, ctrl) {
                var btn = angular.element(elem[0].querySelector('[login-submit]')),
                    mail = angular.element(elem[0].querySelector('[login-email]')),
                    pw = angular.element(elem[0].querySelector('[login-password]'));

                    if(navigator.appVersion.indexOf("Trident") != -1){
                        terminal.addClass('damn-ie');
                    }

                    var config = attrs['piConfig'];
                    scope.init(config || 'default');

                    var mouseover = false;

                    elem.on('mouseover', function(){
                      mouseover = true;
                    });

                    btn.on('click', function(){
                      scope.login(mail.val(), pw.val());
                    })

                    elem.on('mouseleave', function(){
                      mouseover = false;
                    });
              }
            }
          }
    }
    }])
    .controller('loginCtrl', ['$scope', 'piConfiguration', 'accountApi', function($scope, piConfiguration, accountApi){
      $scope.init = function(configName) {
        var config = piConfiguration(configName);
      }

      $scope.login = function(email, password) {
        accountApi.login(email, password)
          .then(function(res){
            window.location = '/';
          }, function(res){
            alert('erro no login');
          });
      }
    }])
    .directive('piAuth', ['$document', function($document){
      return {
        controller: 'loginCtrl',
        controllerAs: 'ctrl',
        transclude: true,
        replace: true,
        template: '<div ng-transclude></div>',
        compile: function compile(tElement, tAttrs, transclude) {
           return {
              pre: function preLink(scope, elemt, attrs, controller){

              },
              post: function postLink(scope, elem, attrs, ctrl) {
                var btn = angular.element(elem[0].querySelector('[login-submit]')),
                    mail = angular.element(elem[0].querySelector('[login-email]')),
                    pw = angular.element(elem[0].querySelector('[login-password]'));

                    if(navigator.appVersion.indexOf("Trident") != -1){
                        terminal.addClass('damn-ie');
                    }

                    var config = attrs['piConfig'];
                    scope.init(config || 'default');

                    var mouseover = false;

                    elem.on('mouseover', function(){
                      mouseover = true;
                    });

                    btn.on('click', function(){
                      scope.login(mail.val(), pw.val());
                    })

                    elem.on('mouseleave', function(){
                      mouseover = false;
                    });
              }
            }
          }
    }
  }]);
})();
