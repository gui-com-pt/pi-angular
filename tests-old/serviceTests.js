describe('Services Test', function(){

    var piServiceRequest;
    beforeEach(module('pi'));

    beforeEach(inject(function(_piService_, _piServiceRequest_) {
    	piService = _piService_;
		piServiceRequest = _piServiceRequest_;
	}));

    it("Should get service request", function(){
        expect(piServiceRequest).not.toBeUndefined();
        expect(piService).not.toBeUndefined();
    });
});