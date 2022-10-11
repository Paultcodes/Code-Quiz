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
var subtract = document.querySelector(".subtract");
var completed = document.querySelector(".completed");
var choiceQuestions;
var secondsLeft = 30;
var correctChoice = 0;
var wrongChoice = 0;
var correctAnswers = ["B", "Br", "<img", "No", "<p>"];
var endGameTrigger = ["Bold", "B", "Bl"];

var questions = [
  {
    question: "Choose the correct HTML tag to make text bold?",
    options: ["Bold", "B", "Bl"],
  },
  {
    question: "What is the correct HTML tag for inserting a line break?",
    options: ["Br", "Break", "Lb"],
  },
  {
    question: "What is the correct HTML for inserting an image?",
    options: ["<img", "<input>", "<button>"],
  },
  {
    question: "Is Java and JavaScript the same thing?",
    options: ["Yes", "No"],
  },
  {
    question: "What element represents a paragraph in HTML?",
    options: ["<h1>", "<p>", "<a>"],
  },
];

startButton.addEventListener("click", startQuiz);

function startQuiz() {
  setTime();
  startButton.classList.add("hide");
  startQuestion();
  pointTracker.classList.remove("hide");
}

nextButton.addEventListener("click", nextQuestion);
function nextQuestion() {
  clear();
  fill();
  subtract.classList.add("hide");
  nextButton.classList.add("hide");
}

function showNext() {
  nextButton.classList.remove("hide");
}

function startQuestion() {
  fill(choiceQuestions);
}
//Creates a button for each answer in the object and appends it to the correct location//
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
//Removes the questions and answers after clicking the next button//
function clear() {
  while (answerSection.firstChild)
    answerSection.removeChild(answerSection.firstChild);
  while (questionSection.firstChild)
    questionSection.removeChild(questionSection.firstChild);
}
//Creates the countdown for the quiz//
function setTime() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    countDown.textContent = secondsLeft;

    if (secondsLeft <= 0) {
      clearInterval(timerInterval);

      clear();
      endGame();
    }
  }, 1000);
}

answerSection.addEventListener("click", check);
//Checks if users answer is correct or wrong//
function check(event) {
  var clickTarget = event.target;
  var userChoice = clickTarget.innerText;
  if (correctAnswers.includes(userChoice)) {
    correctChoice++;
  } else {
    subtract.classList.remove("hide");
    wrongChoice++;
    secondsLeft -= 3;
  }
  clear();
  showNext();
  correctSpot.textContent = correctChoice;
  wrongSpot.textContent = wrongChoice;
  if (endGameTrigger.includes(userChoice)) {
    endGame();
  }
}

function endGame() {
  countDown.classList.add("hide");
  nextButton.classList.add("hide");
  yourScore.classList.remove("hide");
  submitSection.classList.remove("hide");
  playAgain.classList.remove("hide");
  subtract.classList.add("hide");
  completed.classList.remove("hide");
}

//Takes the users initials and score and places them into local storage and then retrieves them to print on screen//
submitButton.addEventListener("click", function (event) {
  event.preventDefault();

  var playerScore = {
    initials: submitInitials.value,
    score: correctChoice,
  };

  localStorage.setItem("info", JSON.stringify(playerScore));
  showScore();
});

function showScore() {
  var lastScore = JSON.parse(localStorage.getItem("info"));
  document.querySelector(".score-display").textContent =
    lastScore.initials + " Scored: " + lastScore.score;
}

function alwaysShow() {
  var displayScore = JSON.parse(localStorage.getItem("info"));
  document.querySelector(".score-display").textContent =
    displayScore.initials + " Scored: " + displayScore.score;
}

playAgain.addEventListener("click", restart);
function restart() {
  window.location.reload();
}

alwaysShow();
