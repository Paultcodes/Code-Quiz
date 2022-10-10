var countDown = document.querySelector("#countdown");
var startButton = document.querySelector("#start-button");
var questionSection = document.querySelector(".question-box");
var answerSection = document.querySelector(".answer-section");
var correctSpot = document.querySelector(".correct");
var wrongSpot = document.querySelector(".wrong");
var nextButton = document.querySelector(".next-button");
var pointTracker = document.querySelector(".point-tracker")
var yourScore = document.querySelector(".your-score")
var choiceQuestions
var secondsLeft = 90;
var correctChoice = 0;
var wrongChoice = 0;
var correctAnswers = ["Paul", "26"];
var alertA = "-3 Seconds";
var endGameTrigger = ["Paul", "Jake", "Joe"]

var questions = [
  {
    question: "What is my name?",
    options: ["Paul", "Joe", "Jake"],
  },
  {
    question: "What is my age?",
    options: ["23", "40", "26"],
  },
  {
    question: "What is Java?",
    options: ["Good", "Bad", "Ok"],
  },
];

startButton.addEventListener("click", startQuiz);

function startQuiz() {
  setTime();
  startButton.classList.add("hide");
  startQuestion();
  pointTracker.classList.remove("hide")
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

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      window.alert("Quiz Over!");
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
    secondsLeft--;
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
  window.alert("Quiz Over!")
  countDown.classList.add("hide")
  nextButton.classList.add("hide");
  yourScore.classList.remove("hide")

}
