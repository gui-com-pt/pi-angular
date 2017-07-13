describe('articleSerie', function(){
	var injector,
		httpBackend,
		serieSvc;

	beforeEach(module('pi'));

	beforeEach(inject(function(_$httpBackend_){
		injector = angular.injector(['pi']);
	    httpBackend = _$httpBackend_;
		serieSvc = injector.get('pi.core.article.articleSerieSvc')
	}));

	it('Should', function(){

		httpBackend.when('POST', '/article-serie')
                            .respond({serie: [{id: 1, name: 'hi'}]});

		articleSerieSvc.post({name: 'hi'})
			.then(function(res){
				httpBackend.flush();
				expect(res.data.serie.name).toBe('hi');
			});
	});
})