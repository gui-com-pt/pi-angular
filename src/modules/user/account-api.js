(function(){
	var svcFn = function($http, $q, $rootScope, piHttp) {

        /**
         * Login
         *
         * @param email
         * @param password
         * @returns {*}
         */
        this.login = function(email, password) {
            return piHttp.post('/login', {
                    email: email,
                    password: password
                })
        };

        /**
         * register new account
         * @param model
         * @returns {*}
         */
		this.register = function(model){
			return piHttp.post('/api/account', model)
		};

        /**
         * Request a recover link to email
         * @param email
         * @returns {*}
         */
        this.recoverFromEmail = function(email) {
            return piHttp.post('/api/account/recover', {
                    email: email
                });
        };

        /**
         * Update account credentials
         * @param email User email or nick handle
         * @param currentPassword Current password
         * @param newPassword New password
         * @param newPasswordConfirm Confirmation of new password
         * @returns {*}
         */
        this.updatePassword = function(email, currentPassword, newPassword, newPasswordConfirm) {
            return piHttp.post('/api/account/password', 
                {
                    email: email,
                    currentPassword: currentPassword,
                    newPassword: newPassword,
                    newPasswordConfirm: newPasswordConfirm
                });
        };

	};

	angular
		.module('pi')
		.service('accountApi', ['$http', '$q', '$rootScope', 'piHttp', svcFn]);
	})();