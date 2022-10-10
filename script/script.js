var countDown = document.querySelector("#countdown");
var startButton = document.querySelector("#start-button");
var questionSection = document.querySelector(".question-box");
var answerSection = document.querySelector(".answer-section");
var correctSpot = document.querySelector(".correct");
var wrongSpot = document.querySelector(".wrong");
var nextButton = document.querySelector(".next-button");
var pointTracker = document.querySelector(".point-tracker");
var yourScore = document.querySelector(".your-score");
var submitSection = document.querySelector(".submit-section");
var wrongHide = document.querySelector(".wrong-hide");
var submitButton = document.querySelector(".submit-button");
var submitInitials = document.querySelector("#msg");
var playAgain = document.querySelector(".play-again");
var endGameScore = document.querySelector(".endgame-score");
var choiceQuestions;
var secondsLeft = 30;
var correctChoice = 0;
var wrongChoice = 0;
var correctAnswers = ["10", "26", "0"];
var endGameTrigger = ["5", "3", "10"];

var questions = [
  {
    question: "What is 2 x 5?",
    options: ["5", "3", "10"],
  },
  {
    question: "What is -15 + 15?",
    options: ["-30", "169", "0"],
  },
  {
    question: "What is 3 + 23?",
    options: ["36", "26", "74"],
  },
];

startButton.addEventListener("click", startQuiz);
playAgain.addEventListener("click", restartGame);

function restartGame() {
  startQuiz();
}

function startQuiz() {
  setTime();
  startButton.classList.add("hide");
  startQuestion();
  pointTracker.classList.remove("hide");
}

nextButton.addEventListener("click", nextQuestion);
function nextQuestion() {
  resetState();
  fill();
  nextButton.classList.add("hide");
}

function showNext() {
  nextButton.classList.remove("hide");
}

function startQuestion() {
  fill(choiceQuestions);
}

function fill() {
  var choiceQuestions = questions.pop();
  questionSection.innerText = choiceQuestions.question;
  choiceQuestions.options.forEach((answer) => {
    var button = document.createElement("button");
    button.innerText = answer;
    button.classList.add("btn");
    answerSection.appendChild(button);
  });
}

function resetState() {
  while (answerSection.firstChild)
    answerSection.removeChild(answerSection.firstChild);
  while (questionSection.firstChild)
    questionSection.removeChild(questionSection.firstChild);
}

function setTime() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    countDown.textContent = secondsLeft;

    if (secondsLeft === 0 || secondsLeft <= -1) {
      clearInterval(timerInterval);
      resetState();
      endGame();
    }
  }, 1000);
}

answerSection.addEventListener("click", check);

function check(event) {
  var clickTarget = event.target;
  var userChoice = clickTarget.innerText;
  if (correctAnswers.includes(userChoice)) {
    correctChoice++;
  } else {
    wrongChoice++;
    secondsLeft -= 10;
  }
  resetState();
  showNext();
  correctSpot.textContent = correctChoice;
  wrongSpot.textContent = wrongChoice;
  if (endGameTrigger.includes(userChoice)) {
    endGame();
  }

  console.log(userChoice);
}

function endGame() {
  countDown.classList.add("hide");
  nextButton.classList.add("hide");
  yourScore.classList.remove("hide");
  submitSection.classList.remove("hide");
  wrongHide.classList.add("hide");
  console.log(correctChoice);
}

submitButton.addEventListener("click", function (event) {
  event.preventDefault();

  var playerScore = {
    initials: submitInitials.value.trim(),
    score: correctChoice,
  };

  if (!submitInitials.value) {
    window.alert("hello")
  }

  localStorage.setItem("initials", JSON.stringify(playerScore));
  showScore();
});

function showScore() {
  var lastScore = JSON.parse(localStorage.getItem("initials"));
  document.querySelector(".score-display").textContent =
    lastScore.initials + " Scored a " + lastScore.score;
  playAgain.classList.remove("hide");
}
