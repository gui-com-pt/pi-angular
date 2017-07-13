describe('Pi Navigator Test', function() {
  var piNavigationBuilder,
      piNavigation;

  beforeEach(function() {
    module('pi');
  });

  beforeEach(inject(function(_piNavigation_, _piNavigationBuilder_) {
      piNavigation = _piNavigation_;
      piNavigationBuilder = _piNavigationBuilder_;
  }));

  it('create new builder create new stack', function() {
    var menu = piNavigation.create('mocked-test');
    expect(menu.id()).toBe('mocked-test');
  });
});
