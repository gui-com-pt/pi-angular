/**
 *
 */
(function(){
	var settings = {};

	var flags = {
		sdk: false,
		ready: false
	};

	var provider = function(){
		
      this.setAppId = function(appId){
      	settings.appId = appId;
      };

      this.getAppId = function(){
      	return appId;
      };

      settings.locale = 'pt_PT';

      this.setLocale = function(locale) {
      	settings.locale = locale;
      };

      this.getLocal = function(){
      	return settings.locale;
      };
    
		settings.status = true;

		this.setStatus = function(status) {
		  settings.status = status;
		};

		this.getStatus = function() {
		  return settings.status;
		};

	settings.version = '2.0';
	this.setSdkVersion = function(version) {
		settings.version = version;
	};

	this.getSdkVersion = function(){
		return settings.version;
	};

	      /*
         * load SDK
         */
        settings.loadSDK = true;

        this.setLoadSDK = function(a) {
          settings.loadSDK = !!a;
        };

        this.getLoadSDK = function() {
          return settings.loadSDK;
        };

        /**
         * Custom option setting
         * key @type {String}
         * value @type {*}
         * @return {*}
         */
        this.setInitCustomOption = function(key, value) {
          if (!angular.isString(key)) {
            return false;
          }

          settings[key] = value;
          return settings[key];
        };

        /**
         * get init option
         * @param  {String} key
         * @return {*}
         */
        this.getInitOption = function(key) {
          // If key is not String or If non existing key return null
          if (!angular.isString(key) || !settings.hasOwnProperty(key)) {
            return false;
          }

          return settings[key];
        };

      this.shareDialog = function(title, content, url) {

      };

      this.like = function(postId) {
      	FB.ui(
		 {
		  method: 'share',
		  href: 'https://developers.facebook.com/docs/'
		}, function(response){});
      };

      this.getComments = function(url) {

      };

      var getFn = function($q, $rootScope, $timeout, $window){

      		/**
      		 * The NgFacebook class is retrieved from Facebook Service request
      		 */
      		function NgFacebook(){
      			this.appId = settings.appId;
      		}

      		NgFacebook.prototype.isReady = function(){
      			return flags.ready;
      		};

      		
      };

      this.$get = [
      	'$q',
      	'$rootScope',
      	'$timeout',
      	'$window', getFn];

	};

	angular
		.module('pi')
		.value('fbSettings', settings)
		.value('fbFlags', flags)

})();