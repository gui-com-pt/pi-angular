describe('Unit tests for StackedMap factory', function(){
  beforeEach(module('pi'));

  var StackedMap;

  beforeEach(inject(function(_StackedMap_){
    StackedMap = _StackedMap_;
  }));

  it('Should create a new stack', function(){
    var stack = StackedMap.createNew();
    expect(_.isObject(stack)).toBe(true);
    expect(stack.length()).toBe(0);
  });

  it('Should add a new value to stack and get it', function(){
    var stack = StackedMap.createNew();
    stack.add('first', {first: 'JESUS'});
    var e = stack.get('first');
    expect(_.isObject(e.value)).toBe(true);
    expect(e.value.first).toBe('JESUS');
  });

  it('Should add a new value to stack and remove it', function(){
    var stack = StackedMap.createNew();
    stack.add('a', 'a');
    stack.add('b', 'b');
    expect(stack.length()).toBe(2);
    stack.remove('a');
    expect(stack.length()).toBe(1);
    stack.remove('a');
    expect(stack.length()).toBe(1);
  })

})
