async function apiTranslate({ text, direction, password }) {
  const url = window.APP_CONFIG?.GAS_URL;

  if (!url || url.includes("PASTE_YOUR_GAS_EXEC_URL_HERE")) {
    throw new Error("Не задан GAS_URL (js/config.js).");
  }

  const res = await fetch(url, {
    method: "POST",
    // ВАЖНО: text/plain => нет preflight => меньше CORS боли
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ text, direction, password })
  });

  const data = await res.json().catch(() => null);

  if (!res.ok || !data) throw new Error("Bad response (" + res.status + ")");
  if (!data.ok) throw new Error(data.error || "Ошибка");

  return data; // { ok:true, translation, explain }
}
