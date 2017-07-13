describe('SEO Validator', function(){
	var SeoValidator;

	beforeEach(module('pi'));

	beforeEach(inject(function(_SeoValidator_) {

		SeoValidator = _SeoValidator_;
	}));

	function randomText(counter)
	{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < counter; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
	}

	it('Should get SEO Validator service', function(){

		expect(SeoValidator).not.toBeUndefined();
	});

	it('Should validate basic object properties', function(){

		var testModel = {
			title: 'P',
			content: '<p>',
			excerpt: '<p>pt</p>',
			url: 'progs'
		},
		result = undefined;

		var validate = function()
		{
			result = SeoValidator.validateObject(testModel);
		};

		validate();
		expect(result.error).toBe(true);
		expect(result.validation.length).toBe(4);

		testModel.title = randomText(20);

		validate();
		expect(result.error).toBe(true);
		expect(result.validation.length).toBe(3);

		testModel.content = randomText(40);
		testModel.excerpt = randomText(30);
		testModel.url = randomText(11);
		validate();
		expect(result).toBe(true);
	});
});
