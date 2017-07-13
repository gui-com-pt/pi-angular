(function(){
	'use strict';
	var piCommentResource = function($resource, piHttp) {
		return {
			create: function(namespace, id) {

				return $resource(piHttp.getBaseUrl() + '/comment/' + namespace + '/' + id,
		            {},
		            {
		            'query': {
		                method: 'GET',
		                transformResponse: function(res) {
		                    return angular.fromJson(res).comments || [];
		                },
		                isArray: true
		            }
		        });
			}
		}
	};
	piCommentResource.$inject = ['$resource', 'piHttp'];

	var piCommentWindow = function(piCommentResource) {
		

		var link = function(scope, elem, attrs) {
			
			
			
		}

		var ctrl = function($scope, $q) {
			var resource = piCommentResource.create($scope.namespace, $scope.id);

			$scope.comments = resource.query({});
			
			this.send = function(message) {
                var deferred = $q.defer();
				resource.save({message: message, id: $scope.id}, function(res){
                    $scope.comments.push(res.comment);
                    deferred.resolve(res);
                });
                return deferred.promise;
			}
		};
		return {
			controller: ctrl,
			link: link,
			scope: {
				namespace: '@',
				id: '@'
			},
			templateUrl: 'html/pi/comment-window.html'
		}
	};
	piCommentWindow.$inject = ['piCommentResource', '$q'];

	var piCommentMessage = function() {
		
		return {
			templateUrl: 'html/pi/comment-message.html',
			replace: true,
			scope: {
				'comment': '='
			}
		}
	};

	var piCommentForm = function() {
		var link = function(scope, elem, attrs, piCommentWindow) {
			scope.send = function() {
				piCommentWindow.send(scope.message)
                    .then(function(res){
                        scope.message = '';
                    });
			}
		};

		return {
			templateUrl: 'html/pi/comment-form.html',
			require: '^piCommentWindow',
			link: link
		}
	};

	var piCommentReplyForm = function() {
		return {
			templateUrl: 'html/pi/comment-reply-form.html'
		}
	};

	angular
		.module('pi')
		.factory('piCommentResource', piCommentResource)
		.directive('piCommentWindow', piCommentWindow)
		.directive('piCommentMessage', piCommentMessage)
		.directive('piCommentForm', piCommentForm)
		.directive('piCommentReplyForm', piCommentReplyForm);
})();