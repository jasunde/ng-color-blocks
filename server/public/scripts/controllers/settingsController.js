colorBlocks.controller('SettingsController', ['$scope', 'DataFactory', 'Game', function($scope, DataFactory, Game) {
  console.log("settings controller running");
  $scope.colors = DataFactory.colors;
  $scope.cssColors = DataFactory.css_color_names;
  $scope.newColor = '';

  if(!DataFactory.user) {
    Game.findUser()
      .then(function() {
        $scope.colors = DataFactory.colors;
      })
      .catch(function () {
        console.log('Find user failed');
      });
  }

  $scope.addColor = function () {
    $scope.colors.push($scope.newColor);
    Game.updateSettings(DataFactory.user, $scope.colors)
      .then(function (result) {
        console.log(result);
        DataFactory.colors = $scope.colors;
      })
      .catch(function (err) {
        console.log('UPDATE settings error:', err);
      });
  };

}]);
