colorBlocks.controller('GameController', ['$scope', 'DataFactory', '$timeout', function($scope, DataFactory, $timeout) {

console.log('game controller running');

$scope.colors = DataFactory.colors;
$scope.messageText = '';
var timeout;

// start game
init();

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
