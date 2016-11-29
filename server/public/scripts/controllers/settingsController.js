colorBlocks.controller('SettingsController', ['$scope', 'DataFactory', function($scope, DataFactory) {
  console.log("settings controller running");
  $scope.colors = DataFactory.colors;
  $scope.cssColors = DataFactory.css_color_names;
  $scope.newColor = '';

  console.log($scope.colors);

  $scope.addColor = function () {
    console.log($scope.newColor)
    $scope.colors.push($scope.newColor);
  };

}]);
