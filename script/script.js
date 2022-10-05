var startButton = document.querySelector(".start-button");
var countDown = document.querySelector(".countdown");
var question = document.querySelector(".question-hide");
var buttonA = document.querySelector(".btn");
var buttonSection = document.querySelector(".buttons");
var firstQuestion = "What is 2+2?";
var firstQuestionA = ["one", "two", "three", "four"];
var buttonss = document.querySelector("#answer-buttons");

startButton.addEventListener("click", startGame);

function startGame() {
  setTime();
  showStuff();
  question.textContent = firstQuestion;
  startButton.classList.add("hide");
}

function showStuff() {
  firstQuestionA.forEach((answer) => {
    var button = document.createElement("button");
    button.innerText = answer;
    button.classList.add("btn");
    buttonss.appendChild(button);
  });
}

function nextQuestion() {}

function setTime() {
  var secondsLeft = 60;
  var timerInterval = setInterval(function () {
    secondsLeft--;
    countDown.textContent = secondsLeft;

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

function subtractTime() {}
