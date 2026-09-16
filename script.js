const START_PASSWORD = "1234";

const questions = [
  {
    level: 1,
    type: "text",
    question: "名古屋校の校長先生の名前を全てひらがなもしくは全て漢字で答えろ。",
    answer: ["横山栄悟", "よこやまえいご"]
  },
  {
    level: 2,
    type: "choice",
    question: "🐱 + 🐱 + 🐱 = 30</br>🐱 + 🐶 + 🐶 = 20</br>🐶 + 🍎 = 8</br>🍎 = ?",
    choices: ["2", "3", "4", "5"],
    answer: 1
  },
  {
    level: 3,
    type: "choice",
    question: "この法則に当てはまる「？」の数字は？\n青 blue → 4\n赤 red → 3\n緑 green → 5\n黄 yellow → ?",
    choices: ["1", "4", "6", "9"],
    answer: 2
  }
];

const screens = {
  start: document.getElementById("start-screen"),
  quiz: document.getElementById("quiz-screen"),
  result: document.getElementById("result-screen")
};

const passwordForm = document.getElementById("password-form");
const passwordInput = document.getElementById("start-password");
const passwordError = document.getElementById("password-error");
const levelLabel = document.getElementById("level-label");
const questionCount = document.getElementById("question-count");
const questionText = document.getElementById("question-text");
const choices = document.getElementById("choices");
const quizMessage = document.getElementById("quiz-message");
const resultTitle = document.getElementById("result-title");
const resultMessage = document.getElementById("result-message");

let currentQuestion = 0;
let finished = false;

function showScreen(name) {
  Object.values(screens).forEach(screen => screen.classList.remove("active"));
  screens[name].classList.add("active");
}

passwordForm.addEventListener("submit", (event) => {
  event.preventDefault();
  passwordError.hidden = true;

  if (passwordInput.value !== START_PASSWORD) {
    passwordError.hidden = false;
    passwordInput.select();
    return;
  }

  currentQuestion = 0;
  finished = false;
  showQuestion();
  showScreen("quiz");
});

function showQuestion() {
  const item = questions[currentQuestion];
  levelLabel.textContent = `Lv.${item.level}`;
  questionCount.textContent = `QUESTION ${currentQuestion + 1}`;
  questionText.innerHTML = item.question;
  choices.innerHTML = "";
  quizMessage.hidden = true;
  quizMessage.className = "message";

  if (item.type === "text") {
    const input = document.createElement("input");
    input.type = "text";
    input.id = "text-answer";
    input.className = "text-answer";
    input.placeholder = "ひらがなまたは漢字で入力";
    input.autocomplete = "off";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "submit-answer";
    button.textContent = "回答する";
    button.addEventListener("click", () => answerQuestion(input.value));

    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") answerQuestion(input.value);
    });

    choices.appendChild(input);
    choices.appendChild(button);
    input.focus();
    return;
  }

  item.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice";
    button.textContent = choice;
    button.addEventListener("click", () => answerQuestion(index));
    choices.appendChild(button);
  });
}

function normalizeAnswer(value) {
  return String(value).trim().replace(/\s+/g, "");
}

function showFailedQuestion(questionNumber, item) {
  resultTitle.textContent = "CHALLENGE END";
  resultMessage.replaceChildren();

  const heading = document.createElement("strong");
  heading.textContent = "不正解だった問題";

  const info = document.createElement("div");
  info.textContent = `QUESTION ${questionNumber} / Lv.${item.level}`;
  info.className = "failed-question-info";

  const question = document.createElement("div");
  question.textContent = item.question;
  question.className = "failed-question-text";

  const notice = document.createElement("div");
  notice.textContent = "この画面を生徒会に見せてください。";
  notice.className = "result-notice";

  resultMessage.appendChild(heading);
  resultMessage.appendChild(info);
  resultMessage.appendChild(question);
  resultMessage.appendChild(notice);
}

function showClearResult() {
  resultTitle.textContent = "CLEAR!";
  resultMessage.replaceChildren();

  const message = document.createElement("div");
  message.textContent = "全ての問題を正解しました。おめでとうございます！";

  const notice = document.createElement("div");
  notice.textContent = "この画面を生徒会に見せてください。";
  notice.className = "result-notice";

  resultMessage.appendChild(message);
  resultMessage.appendChild(notice);
}

function answerQuestion(selected) {
  if (finished) return;
  finished = true;

  const item = questions[currentQuestion];
  const questionNumber = currentQuestion + 1;
  const buttons = [...choices.querySelectorAll("button")];
  buttons.forEach(button => button.disabled = true);

  const isCorrect = item.type === "text"
    ? item.answer.some(answer => normalizeAnswer(selected) === normalizeAnswer(answer))
    : selected === item.answer;

  if (isCorrect) {
    if (item.type === "choice" && buttons[selected]) {
      buttons[selected].classList.add("correct");
    }

    quizMessage.textContent = "正解！次の問題へ進みます。";
    quizMessage.className = "message success";
    quizMessage.hidden = false;

    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion >= questions.length) {
        showClearResult();
        showScreen("result");
      } else {
        finished = false;
        showQuestion();
      }
    }, 900);
  } else {
    if (item.type === "choice" && buttons[selected]) {
      buttons[selected].classList.add("wrong");
    }

    quizMessage.textContent = "不正解。この挑戦は終了です。";
    quizMessage.className = "message error";
    quizMessage.hidden = false;

    setTimeout(() => {
      showFailedQuestion(questionNumber, item);
      showScreen("result");
    }, 1000);
  }
}
