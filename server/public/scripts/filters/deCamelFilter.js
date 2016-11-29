colorBlocks.filter('deCamel', function () {
  return function (word) {
    return word.replace(/(\S)([A-Z])/, '$1 $2');
  };
})
