colorBlocks.filter('deCamel', function () {
  return function (word) {
    return word.replace(/(\S)([A-Z])/g, '$1 $2');
  };
})
