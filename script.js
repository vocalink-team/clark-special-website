const START_PASSWORD = "qwasvatriwbdvgiugausbrywaobyo4892324037y98wry53428t230-rugdorewhu";

const Q3_IMAGE = "data:image/jpeg;base64,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";

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
    question: "次の画像の「？」に入る数字を選んでください。",
    image: Q3_IMAGE,
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

  if (item.image) {
    const image = document.createElement("img");
    image.src = item.image;
    image.alt = "第3問の問題画像：青4、赤3、緑5、黄？";
    image.className = "question-image";
    image.loading = "eager";
    choices.appendChild(image);
  }

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
