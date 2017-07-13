(function(){
	var commonUtils = function(){

		this.capitalizeFirstLetter = function(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		};

		this.randomText =  function(counter)
		{
	    var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    for( var i=0; i < counter; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));

	    return text;
		};

		return this;
	};


	angular
		.module('pi')
		.factory('commonUtils', commonUtils);
})();
