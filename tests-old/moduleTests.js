describe('Primary module tests', function(){
	var module;
	beforeEach(function(){
		module = angular.module('pi');
	});

	it("Should register module", function(){
		expect(module).not.toBe(null);
	});
	
});