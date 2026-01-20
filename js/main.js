(() => {
  let direction = "RU2DE";

  function setDirection(next) {
    direction = next;
    UI.setDirectionText(direction);
  }

  async function onTranslate() {
    const text = UI.nodes.text.value.trim();
    const password = UI.nodes.password.value;

    if (!password) return UI.setStatus("Введи пароль.", "err");
    if (!text) return UI.setStatus("Введи текст.", "err");

    UI.setStatus("Перевожу...", "");
    UI.nodes.resultPanel.style.display = "none";

    try {
      const data = await apiTranslate({ text, direction, password });
      UI.showResult(data);
      UI.setStatus("Готово ✅", "ok");
    } catch (e) {
      console.error(e);
      UI.setStatus("Ошибка: " + (e?.message || String(e)), "err");
    }
  }

  // кнопки
  UI.nodes.swapBtn.addEventListener("click", () => {
    setDirection(direction === "RU2DE" ? "DE2RU" : "RU2DE");
  });

  UI.nodes.clearBtn.addEventListener("click", () => UI.clear());
  UI.nodes.goBtn.addEventListener("click", onTranslate);

  UI.nodes.copyBtn.addEventListener("click", async () => {
    try { await UI.copyTranslation(); }
    catch { UI.setStatus("Не получилось скопировать (браузер блокнул).", "err"); }
  });

  // Enter = перевод (если фокус не в textarea)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && document.activeElement !== UI.nodes.text) {
      e.preventDefault();
      onTranslate();
    }
  });

  // старт
  setDirection("RU2DE");
})();
