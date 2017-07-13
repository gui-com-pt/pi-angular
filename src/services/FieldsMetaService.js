(function(){
	var FieldsMetaService = function()
	{
      var fn = function(defaultMeta)
      {
				metaDefault = _.isArray(defaultMeta) ? defaultMeta : [];

					var meta = [];

					var addMeta = function(value, key)
          {
            meta.push({
              value: value,
              key: key
            });
          };

					var addObj = function(obj)
					{
						meta.push(obj);
					}

          var removeMeta = function(value)
          {

          };

          return {
              add: addMeta,
							addObj: addObj,
              remove: removeMeta,
              meta: meta,
							available: metaDefault
          }
      };

      return fn;
  };

  angular
    .module('pi')
    .factory('FieldsMetaService', FieldsMetaService);
})();
