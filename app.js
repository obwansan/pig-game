/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer, winningScore, gameOver;

scores = [0,0];
roundScore = 0;
activePlayer = 0;
winningScore = 20;
gameOver = false;

document.querySelector('.dice').style.display = 'none';

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

var diceDOM = document.querySelector('.dice');

//var currentPlayer = document.querySelector('#current-' + activePlayer);

// Roll dice 
document.querySelector('.btn-roll').addEventListener('click', function() {
  
  // Get a random number between 1 and 6
  var dice = Math.floor((Math.random() * 6) + 1);
  
  // Display the dice
  diceDOM.style.display = 'block';
  //  diceDOM.src = 'dice-' + dice + '.png'; // Can use .src or .setAttribute
  diceDOM.setAttribute('src', 'dice-' + dice + '.png');
  
  // Update the round score ONLY IF the round score was not a 1
  if (dice !== 1) {
    // Increment players score
    roundScore += dice;
    // Have to select this here rather than assign it to a variable outside the function.
    // If you do that, the Id is set at that point and is unaffected by the change of 
    // activePlayer in the else statement.
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
    // currentPlayer.textContent = roundScore;
  } else {
    nextPlayer();
  }  
});

// Hold score
document.querySelector('.btn-hold').addEventListener('click', function() {
  // Add CURRENT score to GLOBAL score
  scores[activePlayer] += roundScore;
  // Update the UI
  document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
  // Check if player won the game
  if (scores[activePlayer] >= winningScore) {
    document.getElementById('name-' + activePlayer).textContent = 'You Won!';
    diceDOM.style.display = 'none';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
  } else {
    nextPlayer();
  }
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
  
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
  
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
  
    diceDOM.style.display = 'none';
}


//document.querySelector('#current-' + activePlayer).textContent = dice;