
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  loses: 0,
  ties: 0
};

updateScoreElement();

/* if(!score) {
  // !score is the same thing that score === null comparation
  score = {
    wins: 0,
    loses: 0,
    ties: 0
  }
} */

let isAutoPlaying = false;
let intervalId;

let autoPlayInput = document.querySelector('.js-auto-play-button')


function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    autoPlayInput.innerHTML = 'Stop Play'

  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    autoPlayInput.innerHTML = 'Auto Play'
  }

}


let result = '';
function playGame(playerMove) {
  const computerMove = pickComputerMove();

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose'
    } else if (computerMove === 'paper') {
      result = 'You win'
    } else if (computerMove === 'scissors') {
      result = 'Tie'
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win'
    } else if (computerMove === 'paper') {
      result = 'Tie'
    } else if (computerMove === 'scissors') {
      result = 'You lose'
    }

  } else if (playerMove === 'rock') {
    if (computerMove === playerMove) {
      result = 'Tie'
    } else if (computerMove === 'paper') {
      result = 'You lose'
    } else if (computerMove === 'scissors') {
      result = 'You win'
    }
  }

  if (result === 'You win') {
    score.wins += 1
  } else if (result === 'You lose') {
    score.loses += 1
  } else if (result === 'Tie') {
    score.ties += 1
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();
  showResult();
  document.querySelector('.js-moves').innerHTML = `  You
  <img src="./assets/${playerMove}-emoji.png" class="move-icon">
  <img src="./assets/${computerMove}-emoji.png" class="move-icon">
  Computer`

}

const rockButton = document.querySelector('.js-rock-button');

const scissorButton = document.querySelector('.js-scissor-button');

const paperButton = document.querySelector('.js-paper-button');

rockButton.addEventListener('click', () => {
  playGame('rock');
})


paperButton.addEventListener('click', () => {
  playGame('paper');
});


scissorButton.addEventListener('click', () => {
  playGame('scissors');
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  } else if (event.key === 'a') {
    autoPlay();
  } else if (event.key === 'Backspace') {
    showQuestion();
  }
});


document.querySelector('.js-auto-play-button')
  .addEventListener('click', autoPlay)

document.querySelector('.js-reset-score-button')
  .addEventListener('click', showQuestion)


function showQuestion() {
  questionElement.style.visibility = "visible"
}

const questionElement = document.querySelector('.js-question-paragraph');
questionElement.style.visibility = "hidden"
const yesButton = document.querySelector('.js-yes-button');
const noButton = document.querySelector('.js-no-button');

yesButton.addEventListener('click', resetScore);
noButton.addEventListener('click', hideQuestion);


function hideQuestion() {
  questionElement.style.visibility = "hidden"
}


function resetScore() {
  hideQuestion()
  score.wins = 0
  score.loses = 0
  score.ties = 0
  localStorage.removeItem('score');
  updateScoreElement();
  cleanResult();
}

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.loses}, Ties: ${score.ties}`
}

function showResult() {
  document.querySelector('.js-result').innerHTML = `${result}.`

}

function cleanResult() {
  document.querySelector('.js-result').innerHTML = '';
}

let randomNumber = Math.random();

userChoise = ''


function pickComputerMove() {
  randomNumber = Math.random();
  let computerMove = ''

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock'
  } else if (randomNumber > 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper'
  } else if (randomNumber > 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors'
  }

  return computerMove;
}






