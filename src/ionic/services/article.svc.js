/*
window.sqlitePlugin = {};
window.sqlitePlugin.openDatabase = function() {
	return window.openDatabase('pi', '1.0', 'pidb', 10000000);
}

(function(){
	
	angular
		.module('pi.ionic.article')
		.factory('pi.ionic.db', ['$log', function($log) {

			this.processQueries = function(db, queries, dbName) {
				db.transaction(function(tx) {
					for (var i = 0; i < queries.length; i++) {
						tx.executeSql(queries[i], [], 
							function() {
								$log.debug(queries.length + ' queries processed.');
							}, function(tx, err) {
								$log.debug('failed to process queries');
							});
					};
				})
			}

			return this;
		}])
		.factory('pi.ionic.article.articleSvc', ['piHttp', '$ionicPlatform', '$cordovaSQLite', function(piHttp, $ionicPlatform, $cordovaSQLite){

			var db;

			window.document.addEventListener('deviceready', function(){
				db = $cordovaSQLite.openDB({
					name: 'pi',
					bgType: 1
				});
			}, false);


			this.post = function(id, name, headline, articleBody, dateCreated, datePublished, state){
				var query = 'INSERT INTO article (id, name, headline, articleBody, dateCreated, datePublished, state) VALUES (?, ?, ?, ?, ?, ?, ?)',
					args = [id, name, headline, articleBody, dateCreated, datePublished, state],
					promise = $cordovaSQLite.execute(db, query, args)
						.then(function(res){
							return res;
						});
				
				return promise;
			}

			this.remove = function(id) {
				return piHttp.post('/article-remove/' + id);
			}

			this.put = function(id, model) {
				return piHttp.post('/article/' + id, model);
			}

			this.get = function(id, model) {
				return piHttp.get('/article/' + id, model);
			}

			this.find = function(model) {
				var query = 'SELECT * FROM article',
					promise = $cordovaSQLite.execute(db, query, [])
						.then(function(res){
							return res.rows;
						});

				return promise;
			};
			return this;
		}]);
})();

*/