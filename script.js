const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Trainer Marking Language",
      "Hyper Text Markup Language",
      "Hyper Text Marketing Language",
      "Hyper Text Markup Leveler"
    ],
    answer: 1
  },
  {
    question: "Which language is used to style web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: 2
  },
  {
    question: "Which is NOT a JavaScript data type?",
    options: ["Undefined", "Number", "Boolean", "Float"],
    answer: 3
  },
  {
    question: "Inside which HTML element do we put JavaScript?",
    options: ["<js>", "<javascript>", "<script>", "<scripting>"],
    answer: 2
  },
  {
    question: "How do you select an element with id 'demo' in JS?",
    options: [
      "document.getElement('demo')",
      "document.getElementById('demo')",
      "document.query('#demo')",
      "document.id('demo')"
    ],
    answer: 1
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const app = document.getElementById('app');

function render() {
  if (currentQuestion >= quizData.length) {
    renderResult();
    return;
  }

  const q = quizData[currentQuestion];
  answered = false;

  app.innerHTML = `
    <h1>🧠 Quiz Time</h1>
    <div class="progress">Question ${currentQuestion + 1} of ${quizData.length} &nbsp;|&nbsp; Score: ${score}</div>
    <div class="question">${q.question}</div>
    <div class="options" id="options"></div>
    <button class="next-btn" id="nextBtn" disabled>Next</button>
  `;

  const optionsDiv = document.getElementById('options');
  q.options.forEach((opt, index) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.onclick = () => selectAnswer(index);
    optionsDiv.appendChild(btn);
  });

  document.getElementById('nextBtn').onclick = nextQuestion;
}

function selectAnswer(index) {
  if (answered) return;
  answered = true;

  const q = quizData[currentQuestion];
  const buttons = document.querySelectorAll('.option-btn');

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.answer) btn.classList.add('correct');
    else if (i === index) btn.classList.add('wrong');
  });

  if (index === q.answer) score++;

  document.getElementById('nextBtn').disabled = false;
}

function nextQuestion() {
  currentQuestion++;
  render();
}

function renderResult() {
  app.innerHTML = `
    <div class="result">
      <h2>Quiz Complete!</h2>
      <div class="score">${score} / ${quizData.length}</div>
      <p>${score === quizData.length ? "Perfect score! 🎉" : score >= quizData.length / 2 ? "Nice work! 👍" : "Keep practicing! 💪"}</p>
      <button class="restart-btn" onclick="restart()">Try Again</button>
    </div>
  `;
}

function restart() {
  currentQuestion = 0;
  score = 0;
  render();
}

render();
