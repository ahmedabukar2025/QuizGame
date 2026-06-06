// ===============================
// QUIZ QUESTIONS (ARRAY)
// ===============================
const questions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Text Machine Language", "Home Tool Markup Language"],
    answer: 0
  },
  {
    question: "Which language runs in the browser?",
    options: ["Python", "JavaScript", "C++"],
    answer: 1
  },
  {
    question: "What does CSS do?",
    options: ["Structure", "Styling", "Database"],
    answer: 1
  },
  {
    question: "Which symbol is used for comments in JS?",
    options: ["//", "<!-- -->", "##"],
    answer: 0
  },
  {
    question: "Which company created JavaScript?",
    options: ["Microsoft", "Netscape", "Google"],
    answer: 1
  }
];

// ===============================
// SCORE OBJECT
// ===============================
let score = {
  player: 0
};

// ===============================
// GAME STATE
// ===============================
let currentQuestion = 0;
let selectedAnswer = null;

// ===============================
// DOM ELEMENTS
// ===============================
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const scoreEl = document.getElementById("score");
const progressEl = document.getElementById("progress");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");
const resetBtn = document.getElementById("resetBtn");

// ===============================
// LOAD QUESTION
// ===============================
function loadQuestion() {

  let q = questions[currentQuestion];

  questionEl.textContent = q.question;
  answersEl.innerHTML = "";

  q.options.forEach((option, index) => {

    let btn = document.createElement("button");
    btn.classList.add("option");
    btn.textContent = option;

    btn.onclick = () => {
      selectedAnswer = index;

      document.querySelectorAll(".option")
        .forEach(b => b.classList.remove("selected"));

      btn.classList.add("selected");
    };

    answersEl.appendChild(btn);
  });

  progressEl.textContent = currentQuestion + 1;
}

// ===============================
// CHECK ANSWER
// ===============================
function checkAnswer() {

  let correct = questions[currentQuestion].answer;

  if (selectedAnswer === correct) {
    score.player++;
    scoreEl.textContent = score.player;
  }
}

// ===============================
// NEXT BUTTON
// ===============================
nextBtn.onclick = () => {

  if (selectedAnswer === null) {
    alert("Please select an answer!");
    return;
  }

  checkAnswer();

  selectedAnswer = null;
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
};

// ===============================
// SHOW RESULT
// ===============================
function showResult() {

  questionEl.style.display = "none";
  answersEl.style.display = "none";
  nextBtn.style.display = "none";

  resetBtn.style.display = "block";

  if (score.player >= 4) {
    resultEl.textContent = `🔥 Excellent! ${score.player}/${questions.length}`;
  } 
  else if (score.player >= 2) {
    resultEl.textContent = `👍 Good job! ${score.player}/${questions.length}`;
  } 
  else {
    resultEl.textContent = `😅 Try again! ${score.player}/${questions.length}`;
  }
}

// ===============================
// RESET GAME
// ===============================
resetBtn.onclick = () => {

  currentQuestion = 0;
  score.player = 0;
  selectedAnswer = null;

  scoreEl.textContent = 0;
  resultEl.textContent = "";

  questionEl.style.display = "block";
  answersEl.style.display = "flex";
  nextBtn.style.display = "block";
  resetBtn.style.display = "none";

  loadQuestion();
};

// ===============================
// START GAME
// ===============================
loadQuestion();