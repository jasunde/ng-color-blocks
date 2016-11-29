colorBlocks.controller('GameController', ['$scope', 'DataFactory', '$timeout', 'Game', function($scope, DataFactory, $timeout, Game) {

console.log('game controller running');
$scope.colors = DataFactory.colors;
$scope.currentColor = '';

if(!DataFactory.user) {
  Game.findUser()
    .then(function() {
      $scope.colors = DataFactory.colors;
      init();
    })
    .catch(function () {
      console.log('Find user failed');
    });
} else {
  init();
}

$scope.messageText = '';
var timeout;


// resets game to the starting state
function init() {
  $scope.currentColor = $scope.colors[randomNumber(0, $scope.colors.length - 1)];
}

function showMessage(message, win) {
  $scope.messageText = message;
  $scope.win = win;
  $timeout.cancel(timeout);
  timeout = $timeout(function () {
    $scope.messageText = '';
  }, 2000);
}

// click handler for guessing colors
$scope.handleInput = function(clickedColor) {
  if(clickedColor === $scope.currentColor) {
    // alert('You got it!\n\nNow try another!');
    showMessage('You got it! Now try another!', true);
    init();
  } else {
    showMessage('Oh no! You guessed wrong!', false);
  }
}

//UTILITY FUNCTIONS
function randomNumber(min, max){
    return Math.floor(Math.random() * (1 + max - min) + min);
}
}]);
