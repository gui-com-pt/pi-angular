describe('Update Builder Test', function(){

    var UpdateBuilder;
    beforeEach(module('pi'));

    beforeEach(inject(function(_UpdateBuilder_) {
    	UpdateBuilder = _UpdateBuilder_;
	}));

    it("Should get service request", function(){
        expect(UpdateBuilder).not.toBeUndefined();
    });

    it("Should set field and value", function(){
    	var builder = new UpdateBuilder();
    	
    	builder
    		.field('displayName').set('gui')
    		.field('id').set('test');

    	var fields = builder.getRequest();
    	expect(fields.displayName).toBe('gui');
    	expect(fields.id).toBe('test');
    });
});