describe('Unit tests for ApiIsAuthorService', function(){
  var _ApiIsAuthorService_;

    beforeEach(module('pi'));

    beforeEach(inject(function(_ApiIsAuthorService_){
      ApiIsAuthorService = _ApiIsAuthorService_;
    }));

    var id = "123123";

    it("Should return true when dto is the owner id", function(){
        var result = ApiIsAuthorService.isAuthor(id, id);
        expect(result).toBe(true);
    });

    it("Should return true when dto is http object response containing data property", function(){
        var result = ApiIsAuthorService.isAuthor(id, {data: {author: {id: id}}});
        expect(result).toBe(true);
    });

    it("Should return true when dto is object containing author property", function(){
        var result = ApiIsAuthorService.isAuthor(id, {author: {id: id}});
        expect(result).toBe(true);
    });

});
