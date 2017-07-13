describe('Unit tests for Common Utilities service', function(){
	var commonUtils;

	beforeEach(inject(function(_commonUtils_) {
		commonUtils = _commonUtils_;
	}));

	it('Should capitalize the first letter', function(){
		var text = "first",
			capitalized = commonUtils.capitalizeFirstLetter(text);

		expect(text).toBe("First");

	});
});
