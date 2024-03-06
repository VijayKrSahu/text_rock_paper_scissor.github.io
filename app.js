// Prevent animation on load
setTimeout(() => {
  document.body.classList.remove("preload");
}, 500);

// DOM
const btnRules = document.querySelector(".rules-btn");
const btnClose = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");

const btnNext = document.querySelector(".next-btn");
const modalVectorPage = document.querySelector(".vector-page");

const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];
const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");

const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");
const resultTextEx = document.querySelector(".results__text__ex");

const playAgainBtn = document.querySelector(".play-again");
const victorPlayAgainBtn = document.querySelector(".victor-play-again");

const scoreNumberPlayer = document.querySelector(".score__number__player");
let scorePlayer = 0;
const scoreNumberPc = document.querySelector(".score__number__pc");
let scorePc = 0;

// Game Logic
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

function choose(choice) {
  const aichoice = aiChoose();
  displayResults([choice, aichoice]);
  displayWinner([choice, aichoice]);
}

function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
        <div class="choice ${results[idx].name}">
          <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
        </div>
      `;
    }, idx * 1000);
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse());

    if (userWins) {
      resultText.innerText = "YOU WIN";
      resultTextEx.innerText = "AGAINST PC";
      resultDivs[0].classList.toggle("winner");
      playAgainBtn.innerText = "PLAY-AGAIN";
      btnNext.classList.toggle("show-next");
      keepScore(1);
    } else if (aiWins) {
      resultText.innerText = "YOU LOSE";
      resultTextEx.innerText = "AGAINST PC";
      resultDivs[1].classList.toggle("winner");
      playAgainBtn.innerText = "PLAY-AGAIN";
      keepScore(-1);
    } else {
      resultText.innerText = "TIE UP";
      resultTextEx.innerText = "";
      playAgainBtn.innerText = "REPLAY"
    }
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
  }, 1000);
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}

function keepScore(point) {
  if(point === 1) {
    scorePlayer++;
    scoreNumberPlayer.innerText = scorePlayer;
  }
  else if(point === -1) {
    scorePc++;
    scoreNumberPc.innerText = scorePc
  }
}

// Play Again
playAgainBtn.addEventListener("click", () => {
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
 
  if(btnNext.opacity === 1 ) btnNext.classList.toggle("hide-next");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
});

victorPlayAgainBtn.addEventListener("click", () => {
  modalVectorPage.classList.toggle("hide-victor");
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
});

// Show/Hide Rules
btnRules.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
btnClose.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});



// Show/Hide Rules
btnNext.addEventListener("click", () => {
    modalVectorPage.classList.toggle("show-victor");
    btnNext.classList.toggle("hide-next");
    });