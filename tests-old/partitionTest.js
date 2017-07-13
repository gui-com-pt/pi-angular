describe('Partition array filter tests', function(){
	
	var filter;

	beforeEach(module('pi'));

	beforeEach(inject(function(_$filter_){
		filter = _$filter_;
	}));

	it("should split array in chuncks", function(){
		
		var partitionBy = 4;
		var array = [];
		for(i = 0; i <= 10; i++) {
			array.push('nova-entrada');
		}
		expect(array.length).toBe(11);
	});
	
});