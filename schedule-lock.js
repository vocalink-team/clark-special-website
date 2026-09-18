(() => {
  // クイズ開始可能日時（日本時間）
  // 開催日時が決まったら、この日時を変更してください。
  const UNLOCK_AT = "1970-01-01T00:00:00+09:00";

  function updateScheduleLock() {
    const startScreen = document.getElementById("start-screen");
    const passwordForm = document.getElementById("password-form");
    const lead = startScreen?.querySelector(".lead");
    const note = startScreen?.querySelector(".password-note");

    if (!startScreen || !passwordForm || !lead || !note) return;
    if (!startScreen.classList.contains("active")) return;

    // 開催前はパスワード入力を絶対に表示・開始させない
    const unlockTime = new Date(UNLOCK_AT).getTime();
    const unlocked = Date.now() >= unlockTime;

    let lockedMessage = document.getElementById("schedule-lock-message");



    if (unlocked) {
      passwordForm.hidden = false;
      lead.hidden = false;
      note.hidden = false;
      if (lockedMessage) lockedMessage.remove();
      return;
    }

    passwordForm.hidden = true;
    lead.hidden = true;
    note.hidden = true;

    if (!lockedMessage) {
      lockedMessage = document.createElement("div");
      lockedMessage.id = "schedule-lock-message";
      lockedMessage.className = "schedule-lock-message";
      lockedMessage.innerHTML = `
        <p class="schedule-lock-icon" aria-hidden="true">🔒</p>
        <h2>クイズはまだ開始できません</h2>
        <p>開催日時までお待ちください。</p>
        <p class="schedule-lock-date">開催日時：2026年9月25日</p>
      `;
      passwordForm.parentNode.insertBefore(lockedMessage, passwordForm);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    updateScheduleLock();
    setInterval(updateScheduleLock, 1000);

    const startScreen = document.getElementById("start-screen");
    if (startScreen) {
      const observer = new MutationObserver(updateScheduleLock);
      observer.observe(startScreen, { attributes: true, attributeFilter: ["class"] });
    }
  });
})();
