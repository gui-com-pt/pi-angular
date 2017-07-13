(function(){
  var PiMetaDirective = function(FieldsMetaService, $parse)
  {
      return {
        templateUrl: '/html/pi/meta.html',
        scope: {
          'piConfig': '=piConfig',
          'piMeta': '=piMeta'
        },
        link: function(scope, elem, attrs)
        {
          scope.viewEdit = false;
          scope.viewAdd = false;
          scope.viewAddAvailable = false;
          scope.metaAddCurrent = {};
          scope.metaSelectAddCurrent = {};
          scope.metaSelectCurrent = [];
          scope.metaSelectEditCurrent = {};
          scope.metaAdd = [];
          scope.metaType = '';
          var service = undefined;
          var config = {};

          if(!_.isUndefined(scope.piConfig))
          {
            config = scope.piConfig;
            if(_.isArray(config.defaults))
            {
              service = new FieldsMetaService(config.defaults);
            } else {
              service = new FieldsMetaService();
            }
          } else {
            service = new FieldsMetaService();
            config = {};
          }

          scope.meta = service.meta;
          scope.available = service.available;

          scope.addModel = {};

          scope.viewEditNewSelect = false;
          scope.viewEditSelect = false;

          scope.piMeta = service.meta;
          scope.metaEdit = scope.piMeta[0];

          scope.getPlaceholderText = function(obj, defaultPlaceholder){
            if(!_.isUndefined(obj.placeholder)){
              return obj.placeholder;
            }
            return defaultPlaceholder;
          }

          scope.addEntry = function()
          {
            var model = scope.metaAddCurrent;
            if(scope.metaType != '')
              model.metaType = scope.metaType;

              service.addObj(angular.copy(model));
              scope.metaAddCurrent = {};
              scope.viewAdd = false;
              scope.metaType = '';
          }

          scope.editSelectOpt = function(item)
          {
            scope.metaSelectEditCurrent = {
              displayNisplay:item.displayName,
              value: item.value
            };
            scope.viewEditNewSelect = true;
          };

          scope.editSelectEntry = function()
          {

          };

          scope.cancelEditSelect = function()
          {
            scope.viewEditNewSelect = false;
            scope.metaSelectEditCurrent = {};
          }

          scope.addSelectEntry = function()
          {
            scope.metaSelectCurrent.push(scope.metaSelectAddCurrent);
            scope.metaSelectAddCurrent = {};
          }

          scope.addSelect = function()
          {
            service.addObj({metaType: 'select', values: scope.metaSelectCurrent, key: scope.metaSelectCurrentKey, displayName: scope.metaSelectCurrentKey});
            scope.viewEditNewSelect = false;
            scope.metaSelectCurrent = [];
            scope.metaType = '';
            scope.metaSelectCurrentKey = '';
          }

          scope.change = function(item, model) {
            scope.metaEdit = angular.extend({}, item);
            scope.viewEdit = true;
          }

          scope.add = function(item, model){
            scope.viewEdit = false;
            scope.viewAdd = true;
            scope.metaAddCurrent = angular.copy(item);
            scope.metaType = item.metaType || '';
          }

          scope.goAdd = function()
          {
            scope.viewEdit = false;
            scope.viewAdd = true;
            scope.metaType = '';
          }

          scope.cancelAdd = function()
          {
            scope.viewAdd = false;
            scope.metaType = '';
          }

          scope.saveMeta = function() {
            angular.forEach(scope.piMeta, function(value, key) {
              if(value.key == scope.metaEdit.key) {
                scope.piMeta[key] = angular.extend({}, scope.metaEdit);
              }
            });
            scope.viewEdit = false;
          }

          scope.removeMeta = function(metaKey){
            if(_.isUndefined(metaKey))
            metaKey = scope.metaEdit.key;

            angular.forEach(scope.piMeta, function(value, key) {
              if(value.key == metaKey) {
                scope.piMeta.splice(key, 1);
              }
            });
            scope.viewEdit = {};
            scope.viewEdit = false;
            scope.metaEdit = {};
          };

          scope.cancelEdit = function(){
            scope.viewEdit = false;
            scope.metaEdit = {};
          }
        }
      }
  };
  PiMetaDirective.$inject = ['FieldsMetaService', '$parse'];

  angular
      .module('pi')
      .directive('piMeta', PiMetaDirective);
})();
