// Auth: username + shared-code gate. Per-device, per-username.
// The shared code is hashed (SHA-256) and compared client-side.
// This keeps casual visitors out — it is not a real auth wall.
window.Auth = (function () {
  const SESSION_KEY = "mfc.session";

  async function sha256(text) {
    const buf = new TextEncoder().encode(text);
    const hash = await crypto.subtle.digest("SHA-256", buf);
    return Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  function getSession() {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    } catch {
      return null;
    }
  }
  function setSession(s) {
    if (!s) localStorage.removeItem(SESSION_KEY);
    else localStorage.setItem(SESSION_KEY, JSON.stringify(s));
  }

  async function login(rawUsername, rawCode) {
    const username = (rawUsername || "").trim().toLowerCase();
    const code = (rawCode || "").trim();
    if (username.length < 2) throw new Error("Username too short.");
    if (!/^[a-z0-9_.-]+$/.test(username))
      throw new Error("Username can only contain letters, numbers, . _ -");

    const expected = (window.APP_CONFIG || {}).ACCESS_CODE_SHA256;
    const provided = await sha256(code);
    if (!expected || provided !== expected) throw new Error("Wrong access code.");

    const user = { username };
    setSession(user);
    return user;
  }

  function logout() {
    setSession(null);
  }

  return { getSession, login, logout, sha256 };
})();
