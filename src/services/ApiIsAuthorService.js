/**
 * @ng-doc service
 * @name ApiIsAuthorService
 *
 * @description
 * This service assumes an Pi based API is being used
 * An entity response from API may contain an author property
 * In such cases you can use this service to verify if a user is author of the entity
 * In the following example, we store the authenticated user id in $rootScope
 *
 * @example
 * var isAuthor = ApiIsAuthorService(response, $rootScope.userId)
 *
 */

(function(){
  "use strict";

  var ApiIsAuthorService = function()
  {
    /**
     * The response object expected may be: (in order of preference for performance)
     * - String with Id
     * - Author DTO, ie: {displayName: 'Jesus', id: 1}
     * - HTTP Response data object, ie: {code: 200, data: { author: { displayName: 'Jesus', id: 1}}}
     * - Object containing an property named author
     * @param entityId THE Id
     * @param res response object
     * @return boolean
     */
    var isAuthor = function(entityId, res){
      if(_.isNull(res)){
        return false;
      } else if(_.isString(res)){
        return entityId == res;
      }
      else if(res.id){
        return entityId == res.id;
      }
      else if(res.data && res.data.author && res.data.author.id)
      {
        return entityId == res.data.author.id;
      }
      else if(res.author && res.author.id) {
        return entityId == res.author.id;
      }

      return false;
    }

    return {
      isAuthor: isAuthor
    }

  };

  angular
    .module('pi')
    .factory('ApiIsAuthorService', ApiIsAuthorService);
})();
