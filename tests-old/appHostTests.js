(function(){
	describe('Application Host tests', function(){

		beforeEach(module('pi'));

		var testAppHost,
			testService;;

		beforeEach(inject(function(_TestAppHost_, _TestService_){
			testAppHost = _TestAppHost_;
			testService = _TestService_;
		}));

		it('Should get Test application host', function(){
			expect(testAppHost).not.toBeUndefined();
		});

		it('Configurations should be setted ang getted', function(){
			testAppHost.setConfigs({
				appName: 'random',
				mode: 'debug'
			});

			var configs = testAppHost.getConfigs();

			expect(configs.appName).toBe('random');
			expect(configs.mode).toBe('debug');
		});

		it('Should register and resolve services', function(){
			testAppHost.registerService(testService);
		});
	});
})();