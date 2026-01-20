const UI = (() => {
  const el = (id) => document.getElementById(id);

  const nodes = {
    dirText: el("dirText"),
    swapBtn: el("swapBtn"),
    clearBtn: el("clearBtn"),
    goBtn: el("goBtn"),
    copyBtn: el("copyBtn"),

    password: el("password"),
    text: el("text"),

    status: el("status"),

    resultPanel: el("resultPanel"),
    translatedWord: el("translatedWord"),
    article: el("article"),
    plural: el("plural"),
    explainRu: el("explainRu"),
    exDe: el("exDe"),
    exRu: el("exRu"),
  };

  function setStatus(msg, type = "") {
    nodes.status.className = "status " + (type || "");
    nodes.status.textContent = msg || "";
  }

  function setDirectionText(direction) {
    nodes.dirText.textContent = direction === "RU2DE" ? "RU → DE" : "DE → RU";
  }

  function clear() {
    nodes.text.value = "";
    nodes.resultPanel.style.display = "none";
    setStatus("");
  }

  function showResult(data) {
    const ex = data.explain || {};

    nodes.translatedWord.textContent = data.translation || "—";
    nodes.article.textContent = ex.article || "—";
    nodes.plural.textContent = ex.plural || "—";
    nodes.explainRu.textContent = ex.explanation_ru || "—";
    nodes.exDe.textContent = ex.example_de || "—";
    nodes.exRu.textContent = ex.example_ru || "—";

    nodes.resultPanel.style.display = "block";
  }

  async function copyTranslation() {
    const t = nodes.translatedWord.textContent || "";
    if (!t || t === "—") return setStatus("Нечего копировать.", "err");
    await navigator.clipboard.writeText(t);
    setStatus("Скопировано ✅", "ok");
  }

  return {
    nodes,
    setStatus,
    setDirectionText,
    clear,
    showResult,
    copyTranslation,
  };
})();
