(function(){
	var settings = {

	};
	var configFn = function($httpProvider){

		$httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
	};

	configFn.$inject = ['$httpProvider'];

	angular
		.module('pi', ['ngResource', 'pi.core', 'pi.core.app', 'pi.core.place', 'pi.core.question', 'pi.core.article', 'pi.core.payment', 'pi.core.chat', 'pi.core.likes', 'pi.core.product'])
		.config(configFn)
		.provider('pi', [function(){
			var appId,
				appSecret;

			this.setAppId = function(value) {
				appId = value;
			}

			this.$get = [function(){
				return {
					getAppId: function() {
						return appId;
					},
					setAppId: function(value) {
						appId = value;
					}
				}
			}];
		}]);
})();
(function(){
	'use strict';

	angular
		.module('pi.ui-router', ['pi', 'ui.router']);

	angular
		.module('pi.core', ['pi']);

	angular
		.module('pi.gallery', []);

	angular
		.module('pi.adsense', ['pi']);

	angular
		.module('pi.core.user', ['pi.core']);

	angular
		.module('pi.core.file', ['pi.core']);

	angular
		.module('pi.core.likes', ['pi.core']);

	angular
		.module('pi.core.product', ['pi.core']);

	angular
		.module('pi.core.article', ['pi.core']);

	angular
		.module('pi.core.question', ['pi.core']);

	angular
		.module('pi.core.place', ['pi.core']);

	angular
		.module('pi.ionic', ['pi.core']);

})();
function getCookie(cname) {
   var name = cname + "=",
       ca = document.cookie.split(';'),
       i,
       c,
       ca_length = ca.length;
   for (i = 0; i < ca_length; i += 1) {
       c = ca[i];
       while (c.charAt(0) === ' ') {
           c = c.substring(1);
       }
       if (c.indexOf(name) !== -1) {
           return c.substring(name.length, c.length);
       }
   }
   return "";
}

function setCookie(variable, value, expires_seconds) {
   var d = new Date();
   d = new Date(d.getTime() + 1000 * expires_seconds);
   document.cookie = variable + '=' + value + '; expires=' + d.toGMTString() + ';';
}
