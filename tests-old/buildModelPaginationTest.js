describe('Test: Build Model Pagination', function(){
	var queryModelFactory;

	beforeEach(module('pi'));

	beforeEach(inject(function(_queryModelFactory_){
		queryModelFactory = _queryModelFactory_;
	}));

	it("should create a new instance", function(){
		var model = { state: 4 }, // dumb model
			svc = new queryModelFactory(model);

		expect(svc).not.toBe(null);

		svc.build(2, 40);

		expect(svc.get().skip).toBe(2);
		expect(svc.get().take).toBe(40);
	});
	
});