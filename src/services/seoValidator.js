/**
 * @author Gui <guilhermecardoso@volupio.com>
 * @ng-doc service
 * @name SEO Validator
 *
 * @description
 * Helper class to validate SEO
 * Functions started with "validate" will be used agains validateObject() with common properties array
 */
 var seoValidationResult = {
 	message: '',
 	error: false
 };

(function(){
	var SeoValidator = function(commonUtils, $log){
		var self = this,
			commonProperties = ['title', 'content', 'url', 'excerpt'];

    var createError = function(property, message)
    {
      return {
        key: property,
        value: message
      };

    };

    var validators = {
        validateTitle: function(title) {
    			if(title.length < 10 || title.length > 70) {
            return createError('title', 'Title length should be between 30 and 70');
    			}
          return true;
    		},
        validateContent: function(content) {

          if(content.length < 30 || content.length > 70) {
            return createError('content', 'Title length should be between 30 and 70');
          }
          return true;
    		},
        validateExcerpt: function(excerpt){
          if(excerpt.length < 10 || excerpt.length > 50) {
            return createError('excerpt', 'Title length should be between 30 and 70');
          }
          return true;
    		},
        validateUrl: function(url){
          if(url.length < 10 || url.length > 70) {
            return createError('url', 'Title length should be between 30 and 70');
          }
          return true;
    		}
    };
    this.validateTitle = validators.validateTitle;
    this.validateContext = validators.validateContent;
    this.validateExcerpt = validators.validateExcerpts;
    this.validateUrl = validators.validateUrl;
		/*
		 * Runs all the validation functions of the service agains the object
		 * The existence of the properties is checked, and the object must have the regular properties: title, content, url, etc
		 */
		this.validateObject = function(obj) {
			var results = [];

      angular.forEach(commonProperties, function(prop, key) {
				if(prop in obj) {
					/*var fnName = String('validate' + commonUtils.capitalizeFirstLetter(prop)),
            obj[prop],
            validators[fnName](val);

          if(!_.isUndefined(res) && res === 'true');
          {
            results.push(res);
          }*/
				}
			});

      if(results.length >= 0)
      {
        return {
          error: true,
          validation: results
        }
      }

      return true;
		};

    return this;
	};

  SeoValidator.$inject = ['commonUtils', '$log'];

	angular
		.module('pi')
		.factory('SeoValidator', SeoValidator);
})();
