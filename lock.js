(() => {
  const LOCK_KEY = "quiz-challenge-completed";

  function $(id) {
    return document.getElementById(id);
  }

  function saveResult() {
    const result = $("result-screen");
    if (!result || !result.classList.contains("active")) return;

    const title = $("result-title");
    const message = $("result-message");
    if (!title || !message) return;

    localStorage.setItem(LOCK_KEY, JSON.stringify({
      title: title.textContent,
      message: message.innerHTML
    }));
  }

  function restoreResult() {
    const raw = localStorage.getItem(LOCK_KEY);
    if (!raw) return;

    try {
      const saved = JSON.parse(raw);
      const start = $("start-screen");
      const quiz = $("quiz-screen");
      const result = $("result-screen");
      const title = $("result-title");
      const message = $("result-message");

      if (!start || !quiz || !result || !title || !message) return;

      start.classList.remove("active");
      quiz.classList.remove("active");
      result.classList.add("active");
      title.textContent = saved.title || "CHALLENGE END";
      message.innerHTML = saved.message || "This challenge has already been completed.";
    } catch {
      localStorage.removeItem(LOCK_KEY);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    restoreResult();

    const result = $("result-screen");
    if (!result) return;

    const observer = new MutationObserver(() => saveResult());
    observer.observe(result, {
      attributes: true,
      attributeFilter: ["class"],
      childList: true,
      subtree: true,
      characterData: true
    });

    saveResult();
  });
})();
