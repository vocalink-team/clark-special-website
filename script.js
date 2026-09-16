const START_PASSWORD = "1234";
const CHALLENGE_USED_KEY = "quizChallengeUsed";

const questions = [
  {
    level: 1,
    question: "ここに第1問の問題文を入れてください。",
    choices: ["選択肢A", "選択肢B", "選択肢C", "選択肢D"],
    answer: 0
  },
  {
    level: 1,
    question: "ここに第2問の問題文を入れてください。",
    choices: ["選択肢A", "選択肢B", "選択肢C", "選択肢D"],
    answer: 1
  },
  {
    level: 2,
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

function showAlreadyUsed() {
  resultTitle.textContent = "CHALLENGE END";
  resultMessage.textContent = "この端末では、すでに挑戦済みです。再挑戦はできません。";
  showScreen("result");
}

// ページを閉じたり再読み込みしても、挑戦済み状態を維持する
if (localStorage.getItem(CHALLENGE_USED_KEY) === "true") {
  showAlreadyUsed();
}

passwordForm.addEventListener("submit", (event) => {
  event.preventDefault();
  passwordError.hidden = true;

  // すでに挑戦済みなら再スタートさせない
  if (localStorage.getItem(CHALLENGE_USED_KEY) === "true") {
    showAlreadyUsed();
    return;
  }

  if (passwordInput.value !== START_PASSWORD) {
    passwordError.hidden = false;
    passwordInput.select();
    return;
  }

  // 正しいパスワードを入力して開始した時点で「1回使用済み」にする
  localStorage.setItem(CHALLENGE_USED_KEY, "true");

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

  item.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice";
    button.textContent = choice;
    button.addEventListener("click", () => answerQuestion(index));
    choices.appendChild(button);
  });
}

function answerQuestion(selected) {
  if (finished) return;
  finished = true;

  const item = questions[currentQuestion];
  const buttons = [...choices.querySelectorAll("button")];
  buttons.forEach(button => button.disabled = true);

  if (selected === item.answer) {
    buttons[selected].classList.add("correct");
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
    buttons[selected].classList.add("wrong");
    quizMessage.textContent = "不正解。この挑戦は終了です。";
    quizMessage.className = "message error";
    quizMessage.hidden = false;

    setTimeout(() => {
      resultTitle.textContent = "CHALLENGE END";
      resultMessage.textContent = "残念！今回はここで終了です。";
      showScreen("result");
    }, 1000);
  }
}
