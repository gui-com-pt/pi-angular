(function(){
	'use strict';

	/**
	 * @ng-doc service
	 * @name piHttp
	 *
	 * This service is a wrapper for angular $http service
	 * http://stackoverflow.com/questions/23968129/limiting-http-interceptor-to-specific-domain
	 */
	 angular
	 	.module('pi')
		.provider('piHttp', [
			function () {
				var formatUrl = function(url) {
					return self.baseUrl + url;
				};
				var self = this;
				this.persist = false;

				return  {
					$get: function($http, pi) {

						var s = this;

						// Augments the request configuration object
						// with OAuth specific stuff (e.g. some header)
						function getAugmentedConfig(cfg) {
							var config  = cfg || {};
							config.headers = config.headers || {};
							if(!_.isUndefined(pi.getAppId())) {
								config.headers['X-Pi-Application'] = pi.getAppId();
							}
							//config.headers.someHeaderName = 'some-header-value';
							return config;
						}

						// The service object to be returned (`$http` wrapper)


						// Create wrappers for methods WITHOUT data
						['delete', 'get', 'head', 'jsonp'].forEach(function (method) {
							s[method] = function (url, config) {
							    var config = getAugmentedConfig(config);
							    return $http[method](formatUrl(url), config);
							};
						});

						// Create wrappers for methods WITH data
						['post', 'put'].forEach(function (method) {
							s[method] = function (url, data, config) {
							    var config = getAugmentedConfig(config);
							    return $http[method](formatUrl(url), data, config);
							};
						});

						this.getBaseUrl = function() {
							return self.baseUrl;
						}

						this.isPersist = function() {
							return self.persist;
						}


						function insertQuery(tblName, columns, data) {
							if(!_.isArray(columns) || columns.length === 0) 
								return null;

							var query = 'INSERT INTO ' + tblName + ' (';

							for (var i = 0; i < columns.length; i++) {
								query = query + (i === 0)
									? columns[i] // first column, no comma
									: ',' + columns[i];
							};
							query = query + ') VALUES(';

							for (var i = 0; i < columns.length; i++) {
								for(var j = 0; j < data.length; j++) {
									if(!_.isUndefined(data[columns[i]]) &&
										!_.isUndefined(data[columns[i]['name']]) &&
										!_.isString(data[columns[i]['name']])) {
										
									}
								}
								query = query + (i === 0)
									? '?'
									: ',?';
							};
							query = query + ');';

							return query;
						};

						this.persist = function(schema, data) {
							var query = insertQuery(sch)
						}

						return this;
					},
					baseUrl: '',
					token: null,
					setBaseUrl: function(url) {
						self.baseUrl = url;
					},
					setAuth: function(token) {
						self.token = token;
					},
					setPersist: function(persist) {
						self.persist = persist;
					}
				};
			}
		]);
})();
