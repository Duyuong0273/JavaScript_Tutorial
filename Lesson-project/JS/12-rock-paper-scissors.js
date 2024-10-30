const score = JSON.parse(localStorage.getItem("score")) || {
  win: 0,
  lose: 0,
  tie: 0,
};

document.querySelector(
  ".js-score"
).innerHTML = ` Win: ${score.win}, Lose: ${score.lose}, Tie: ${score.tie}`;

updateScoreElement();

// if (!score) {
//   score = {
//     win: 0,
//     lose: 0,
//     tie: 0,
//   };
// }

let isAutoPlaying = false;
let intervalId;

// const autoPlay = () => {

// };

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector("js-rock-button").addEventListener("click", () => {
  playGame("rock");
});

document.querySelector("js-paper-button").addEventListener("click", () => {
  playGame("paper");
});

document.querySelector("js-scissors-button").addEventListener("click", () => {
  playGame("scissors");
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("rock");
  } else if (event.key === "p") {
    playGame("paper");
  } else if (event.key === "s") {
    playGame("scissors");
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = "";

  if (playerMove === "Scissors") {
    if (computerMove === "Rock") {
      result = "You lose.";
    } else if (computerMove === "Paper") {
      result = "You win.";
    } else if (computerMove === "Scissors") {
      result = "Tie.";
    }
  } else if (playerMove === "Paper") {
    if (computerMove === "Paper") {
      result = "Tie.";
    } else if (computerMove === "Rock") {
      result = "You win.";
    } else if (computerMove === "Scissors") {
      result = "You lose.";
    }
  } else if (playerMove === "Rock") {
    if (computerMove === "Rock") {
      result = "Tie.";
    } else if (computerMove === "Paper") {
      result = "You lose.";
    } else if (computerMove === "Scissors") {
      result = "You win.";
    }
  }

  if (result === "You win.") {
    score.win += 1;
  } else if (result === "You lose.") {
    score.lose += 1;
  } else if (result === "Tie.") {
    score.tie += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(".js-moves").innerHTML = `You
      <img class="move-icon" src="./img/${playerMove}.png" />
      <img class="move-icon" src="./img/${computerMove}.png" />
      Computer`;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = ` Win: ${score.win}, Lose: ${score.lose}, Tie: ${score.tie}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "Scissors";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "Paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "Rock";
  }
  return computerMove;
}
