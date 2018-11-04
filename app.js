/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

/*
3 Challenges

1. A player loses his ENTIRE score when he rolls two 6s in a row. After that it's the next players turn.
2. Add an input field to the HTML where players can set the winning score (before a game only?)
3. Add another die to the game so there are two dice. The player loses his current score when one of them is a 1.
*/

var scores, roundScore, activePlayer, winningScore, gamePlaying;
var previousRoll = 0;
var diceDOMTop = document.querySelector('.dice-top');
var diceDOMBottom = document.querySelector('.dice-bottom');
var input = document.querySelector('input');

init();

// Roll dice 
document.querySelector('.btn-roll').addEventListener('click', function() { 
  
  if (gamePlaying) {
    
      if (input.value) {
        winningScore = input.value;
      } 
      var diceScoreTop = Math.floor((Math.random() * 6) + 1);
      var diceScoreBottom = Math.floor((Math.random() * 6) + 1);
      var diceScoreTotal = diceScoreTop + diceScoreBottom;

      diceDOMTop.style.display = 'block';
      diceDOMBottom.style.display = 'block';
      diceDOMTop.setAttribute('src', 'dice-' + diceScoreTop + '.png');
      diceDOMBottom.setAttribute('src', 'dice-' + diceScoreBottom + '.png');
    
    if (diceScoreTop !== 1 && diceScoreBottom !== 1) {
      roundScore += diceScoreTotal;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
      
      if (diceScoreTotal === 12 && previousRoll === 12) {
        scores[activePlayer] = 0;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        nextPlayer();
      }
      previousRoll = diceScoreTotal;
    } else {
      nextPlayer();
    }
  }
});

// Hold score
document.querySelector('.btn-hold').addEventListener('click', function() {
  
  if (gamePlaying) {
    scores[activePlayer] += roundScore;
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    
    if (scores[activePlayer] >= winningScore) {
      gamePlaying = false;
      document.getElementById('name-' + activePlayer).textContent = 'Winner!';
      diceDOMTop.style.display = 'none';
      diceDOMBottom.style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    } else {
      nextPlayer();
    }
  }

});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  winningScore = 30;
  input.value = winningScore;
  gamePlaying = true;

  diceDOMTop.style.display = 'none';
  diceDOMBottom.style.display = 'none';
  
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
  
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
  
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
  
    diceDOMTop.style.display = 'none';
    diceDOMBottom.style.display = 'none';
}

