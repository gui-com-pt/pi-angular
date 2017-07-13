(function(){
	'use strict';

	var chat = function(){
		var appKey = '',
			appSecret = '',
			appId = '',
			inbox = [];

		var receiveMessage = function(sender, message, datetime){

		}

		var sendMessage = function(sender, message){

		}

		return {
			setAppKey: function(value){
				appKey = value;
			},
			setAppSecret: function(value){
				appSecret = value;
			},
			setAppId: function(value){
				appId = value;
			},
			$get: function(){

				return {

				}
			}
		}
	}

	var chatWindow = function(){
		var controller = function(){

		};

		return {
			templateUrl: '/html/pi/chat-window.html',
			controller: controller,
			controllerAs: 'chatWindowCtrl'
		}
	}

	var chatMessage = function(){
		return {
			templateUrl: '/html/pi/chat-message.html',
		}
	}

	var chatMessagePreview = function(){
		return {
			templateUrl: '/html/pi/chat-message-preview.html'
		}
	}

	angular
		.module('pi.chat')
		.directive
})();