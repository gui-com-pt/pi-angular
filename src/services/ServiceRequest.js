(function(){

	/**
	 * Service Request
	 */

	var PiServiceRequest = function()
	{
		var fn = function()
		{
			/**
			 * Unique identifier for the Service
			 * @type {[type]}
			 */
			this.id = undefined;
			this.externalId = undefined;
			this.attributes = []
		};

		fn.prototype.AddAttribute = function(objectOrArray) {
			if(_.isArray(objectOrArray))
			{
				this.attributes = objectOrArray;
			} 
			else if(_.isObject(objectOrArray))
			{
				this.attributes.push(objectOrArray);
			}
		};

		fn.prototype.Attributes = function() {
			return this.attributes;
		};

		return fn;
	};

	angular
		.module('pi')
		.factory('piServiceRequest)', PiServiceRequest);
})();