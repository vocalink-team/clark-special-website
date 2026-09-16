(() => {
  const STORAGE_KEY = "quiz-language";
  let language = localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "ja";

  const $ = (id) => document.getElementById(id);

  const questions = {
    1: {
      ja: "名古屋校の校長先生の名前を全てひらがなもしくは全て漢字で答えろ。",
      en: "Enter the principal's name of the Nagoya campus using only hiragana or only kanji."
    },
    2: {
      ja: "🐱 + 🐱 + 🐱 = 30<br>🐱 + 🐶 + 🐶 = 20<br>🐶 + 🍎 = 8<br>🍎 = ?",
      en: "🐱 + 🐱 + 🐱 = 30<br>🐱 + 🐶 + 🐶 = 20<br>🐶 + 🍎 = 8<br>🍎 = ?"
    },
    3: {
      ja: "次の画像の「？」に入る数字を選んでください。",
      en: "Choose the number that goes in the \"?\" in the image below."
    }
  };

  function setText(element, value) {
    if (!element || element.textContent === value) return;
    element.textContent = value;
  }

  function setHTML(element, value) {
    if (!element || element.innerHTML === value) return;
    element.innerHTML = value;
  }

  function getResultType(title) {
    if (!title) return "";
    if (title.textContent === "CLEAR!" || title.textContent === "クリア！") return "clear";
    if (title.textContent === "CHALLENGE END" || title.textContent === "チャレンジ終了") return "failed";
    return "";
  }

  function getFailedNumber(message) {
    const match = message?.textContent.match(/QUESTION\s*(\d+)/i) || message?.textContent.match(/第(\d+)問/);
    return match ? Number(match[1]) : null;
  }

  function renderResult() {
    const title = $("result-title");
    const message = $("result-message");
    if (!title || !message) return;

    const resultType = getResultType(title);
    const failedNumber = getFailedNumber(message);

    if (language === "en") {
      if (resultType === "clear") {
        setText(title, "CLEAR!");
        setHTML(message, "You answered every question correctly. Congratulations!<br><br><strong>Please show this screen to the student council.</strong>");
      } else if (resultType === "failed") {
        const questionText = failedNumber && questions[failedNumber]
          ? questions[failedNumber].en
          : "The challenge ended because an answer was incorrect.";
        setText(title, "CHALLENGE END");
        setHTML(message, `Incorrect question<br><br><strong>QUESTION ${failedNumber || "-"}</strong><br>${questionText}<br><br><strong>Please show this screen to the student council.</strong>`);
      }
    } else {
      if (resultType === "clear") {
        setText(title, "CLEAR!");
        setHTML(message, "全ての問題を正解しました。おめでとうございます！<br><br><strong>この画面を生徒会に見せてください。</strong>");
      } else if (resultType === "failed") {
        const questionText = failedNumber && questions[failedNumber]
          ? questions[failedNumber].ja
          : "不正解だったため、チャレンジが終了しました。";
        setText(title, "CHALLENGE END");
        setHTML(message, `不正解だった問題<br><br><strong>QUESTION ${failedNumber || "-"}</strong><br>${questionText}<br><br><strong>この画面を生徒会に見せてください。</strong>`);
      }
    }
  }

  function render() {
    const startPassword = $("start-password");
    const passwordForm = $("password-form");
    const passwordLabel = passwordForm?.querySelector("label");
    const passwordButton = passwordForm?.querySelector("button[type=submit]");
    const passwordError = $("password-error");
    const passwordNote = document.querySelector(".password-note");
    const startLead = document.querySelector(".start-card .lead");
    const startTitle = document.querySelector(".start-card h1");
    const levelLabel = $("level-label");
    const questionCount = $("question-count");
    const questionText = $("question-text");
    const resultEyebrow = document.querySelector(".result-card .eyebrow");
    const langJa = $("lang-ja");
    const langEn = $("lang-en");

    if (language === "en") {
      setText(startTitle, "Quiz Challenge");
      setText(startLead, "Enter the start password to begin the challenge.");
      setText(passwordLabel, "Start Password");
      setText(passwordNote, "Please enter using hiragana only.");
      setText(passwordButton, "Start");
      if (startPassword) startPassword.placeholder = "Enter password";
      setText(passwordError, "The start password is incorrect.");
      setText(resultEyebrow, "CHALLENGE COMPLETE");
    } else {
      setText(startTitle, "クイズチャレンジ");
      setText(startLead, "スタートパスワードを入力して挑戦を開始してください。");
      setText(passwordLabel, "スタートパスワード");
      setText(passwordNote, "入力は全てひらがなで入力してください");
      setText(passwordButton, "スタート");
      if (startPassword) startPassword.placeholder = "パスワードを入力";
      setText(passwordError, "スタートパスワードが正しくありません。");
      setText(resultEyebrow, "CHALLENGE COMPLETE");
    }

    if (questionCount && questionText) {
      const match = questionCount.textContent.match(/(\d+)/);
      const number = match ? Number(match[1]) : null;
      if (number && questions[number]) {
        setHTML(questionText, questions[number][language]);
      }
      setText(questionCount, `QUESTION ${number || 1}`);
      if (levelLabel) setText(levelLabel, `Lv.${number || 1}`);
    }

    if (langJa && langEn) {
      langJa.setAttribute("aria-pressed", language === "ja" ? "true" : "false");
      langEn.setAttribute("aria-pressed", language === "en" ? "true" : "false");
      langJa.classList.toggle("active", language === "ja");
      langEn.classList.toggle("active", language === "en");
    }

    renderResult();
    document.documentElement.lang = language === "en" ? "en" : "ja";
  }

  function setLanguage(next) {
    language = next === "en" ? "en" : "ja";
    localStorage.setItem(STORAGE_KEY, language);
    render();
  }

  document.addEventListener("DOMContentLoaded", () => {
    const switcher = document.createElement("div");
    switcher.className = "language-switcher";
    switcher.setAttribute("aria-label", "Language selector");
    switcher.innerHTML = `
      <button id="lang-ja" type="button" class="language-button" aria-pressed="false">JP</button>
      <button id="lang-en" type="button" class="language-button" aria-pressed="false">EN</button>
    `;
    document.body.prepend(switcher);

    $("lang-ja").addEventListener("click", () => setLanguage("ja"));
    $("lang-en").addEventListener("click", () => setLanguage("en"));

    render();

    const observer = new MutationObserver(() => render());
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  });
})();
