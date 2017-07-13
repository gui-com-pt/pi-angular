(function(){
  angular
    .module('pi.nav')
    .factory('piNavigationBuilder', [function(){
        function builder(idOrModel) {

          var self = this,
              cfg = {

              };
          if(_.isObject(idOrModel)) {
            cfg['id'] = idOrModel.id;
          } else if(_.isString(idOrModel)) {
            cfg['id'] = idOrModel;
          } else {
            cfg['id'] = 'random-id';
          }

          self.highlighted = false;
          self.hidden = true;
          self.menu = [];
          self.isChild = false;

          this.dispose = function() {
            this.hidden = true;
            self.menu = [];
          }

          this.addState = function(name, model) {
            self.menu.push({
              'name': name,
              'model': model,
              'type': 'link'
            });

          };

          this.remove = function(name) {
            for (var i = 0; i < self.menu.length; i++) {
              if(self.menu[i].name === name) {
                self.menu.splice(i, 1);
                break;
              }
            };
          };

          this.addAction = function(name, callback) {
            self.menu.push({
              'name': name,
              'callback': callback,
              'type': 'callback'
            })
          
          };

          this.hide = function() {
            if(self.hidden) {
              $log.info('The menu ' + cfg['id'] + ' is already hidden. Nothing to be done.');
              return;
            }
            self.hidden = true;
          }

          this.highlight = function() {
            if(self.highlighted) {
              $log.info('The menu ' + cfg['id'] + ' is already highlighted. Nothing to be done.');
              return;
            }
            self.highlighted = true;
          }

          this.show = function() {
            if(!self.hidden) {
              $log.info('The menu ' + cfg['id'] + ' is already visible. Nothing to be done.');
              return;
            }
            self.hidden = false;
          }

          this.id = function() {
            return cfg['id'];
          }

          return self;
        }

        return builder;
      }])
      .provider('piNavigation', [function(){

        return {
          $get: ['$rootScope','$log', 'piNavigationBuilder', 'piStack', '$log',
            function($rootScope, $log, piNavigationBuilder, piStack, $log) {
              var menus = piStack.create(),
                cfg = {
                  icons: {
                    remove: 'icon ion-android-delete',
                    save: 'icon ion-android-delete',
                    add: 'icon ion-android-delete',
                    info: 'icon ion-android-delete'  
                  }
                };

              this.setIcon = function(type, value) {
                if(_.isArray(type)) {
                  if(_.isUndefined(type['type']) || _.isUndefined(type['type'])) {
                    $log.error('Cant add ' + type);
                  }
                  for (var i = 0; i < type.length; i++) {
                    cfg.icons[type[i].type] = type[i].value;
                  };
                }
                cfg.icons[type] = value;
              }

              return {
                create: function(id) {
                  var menu = piNavigationBuilder(id);
                  menus.add(id, menu);
                  return menu;
                },
                close: function(id) {
                  menus.remove(id);
                }
              }
            }]

        }
      }])
      .directive('piNavigationTemplate', ['piNavigationProvider',
        function(piNavigationProvider) {
          return {
            scope: {
              'menu': '@'
            },
            link: function(scope, elem, attrs, ngModel) {
              scope.menu = piNavigationProvider.create();

              scope.close = function() {
                piNavigationProvider.close(scope.menu.id());
              }
            }
          }
        }
      ]);
})();