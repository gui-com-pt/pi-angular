(function(){

    /**
     * @name Partition Filter
     *
     * @description
     * Published at StackOveflow 
     * http://stackoverflow.com/questions/21644493/how-to-split-the-ng-repeat-data-with-three-columns-using-bootstrap
     */
    var Partition = function() {
    var cache = {}; // holds old arrays for difference repeat scopes
    var filter = function(newArr, size, scope) {
      var i,
        oldLength = 0,
        newLength = 0,
        arr = [],
        id = scope.$id,
        currentArr = cache[id];
      if (!newArr) return;

      if (currentArr) {
        for (i = 0; i < currentArr.length; i++) {
          oldLength += currentArr[i].length;
        }
      }
      if (newArr.length == oldLength) {
        return currentArr; // so we keep the old object and prevent rebuild (it blurs inputs)
      } else {
        for (i = 0; i < newArr.length; i += size) {
          arr.push(newArr.slice(i, i + size));
        }
        cache[id] = arr;
        return arr;
      }
    };
    return filter;
  }; 

  angular
    .module('pi')
    .filter('partition', Partition);
})();