describe('Application Provider tests', function () {

    var piAppProvider;

    beforeEach(function () {

        angular
            .module('test', function(){})
            .config(function(_piAppProvider_) {
                piAppProvider = _piAppProvider_;
            });

        module('pi', 'test');

        inject(function(){});

    });

        it('tests the providers internal function', function () {
            // check sanity
            expect(piAppProvider).not.toBeUndefined();
            // configure the provider
            //piAppProvider.mode('local');
            // test an instance of the provider for 
            // the custom configuration changes
            expect(piAppProvider.hasModule('non-existing')).toBe(false);

            var m = 'non-existing';
            piAppProvider.addModule(m);
            expect(piAppProvider.hasModule(m)).toBeTrue();
        });

});