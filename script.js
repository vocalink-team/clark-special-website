const START_PASSWORD = "1234";

const questions = [
  {
    level: 1,
    type: "text",
    question: "名古屋校の校長先生の名前を漢字でフルネームで書いてください。",
    answer: "横山栄悟"
  },
  {
    level: 1,
    type: "choice",
    question: "ここに第2問の問題文を入れてください。",
    choices: ["選択肢A", "選択肢B", "選択肢C", "選択肢D"],
    answer: 1
  },
  {
    level: 2,
    type: "choice",
    question: "ここに第3問の問題文を入れてください。",
    choices: ["選択肢A", "選択肢B", "選択肢C", "選択肢D"],
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
  questionText.textContent = item.question;
  choices.innerHTML = "";
  quizMessage.hidden = true;
  quizMessage.className = "message";

  if (item.type === "text") {
    const input = document.createElement("input");
    input.type = "text";
    input.id = "text-answer";
    input.className = "text-answer";
    input.placeholder = "漢字でフルネームを入力";
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

  resultMessage.appendChild(heading);
  resultMessage.appendChild(info);
  resultMessage.appendChild(question);
}

function answerQuestion(selected) {
  if (finished) return;
  finished = true;

  const item = questions[currentQuestion];
  const questionNumber = currentQuestion + 1;
  const buttons = [...choices.querySelectorAll("button")];
  buttons.forEach(button => button.disabled = true);

  const isCorrect = item.type === "text"
    ? normalizeAnswer(selected) === normalizeAnswer(item.answer)
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
        resultTitle.textContent = "CLEAR!";
        resultMessage.textContent = "全ての問題を正解しました。おめでとうございます！";
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
