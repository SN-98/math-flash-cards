// Quiz engine: deck building, answer checking, localStorage progress.
window.Quiz = (function () {
  function progressKey(username) {
    return `mfc.progress.${username}`;
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function normalize(s) {
    return String(s)
      .trim()
      .toLowerCase()
      .replace(/[−–—]/g, "-")            // normalize Unicode dashes to hyphen
      .replace(/²/g, "^2")                // ² → ^2
      .replace(/³/g, "^3")                // ³ → ^3
      .replace(/⁴/g, "^4")                // ⁴ → ^4
      .replace(/[*×·⋅()$,]/g, "")         // strip mul-signs, parens, $, thousands commas
      .replace(/\s+/g, "");
  }

  function isCorrect(userInput, q) {
    const u = normalize(userInput);
    if (!u) return false;
    if (u === normalize(q.a)) return true;
    if (q.accept) return q.accept.some((x) => normalize(x) === u);
    return false;
  }

  function fetchProgress(username) {
    try {
      return JSON.parse(localStorage.getItem(progressKey(username)) || "{}");
    } catch {
      return {};
    }
  }

  function saveProgress(username, map) {
    localStorage.setItem(progressKey(username), JSON.stringify(map));
  }

  function recordAttempt(username, progressMap, q, correct) {
    const p = (progressMap[q.id] = progressMap[q.id] || {
      question_id: q.id,
      correct_count: 0,
      wrong_count: 0,
    });
    if (correct) p.correct_count++;
    else p.wrong_count++;
    p.last_seen = Date.now();
    saveProgress(username, progressMap);
  }

  // Build the deck for a chosen mode + optional review-only filter.
  function buildDeck(mode, progressMap, opts = {}) {
    const all = window.QUESTIONS.filter((q) => !q.learnOnly).filter(mode.filter);
    let pool = all;
    if (opts.reviewWrongOnly) {
      pool = all.filter((q) => {
        const p = progressMap[q.id];
        return p && p.wrong_count > 0 && p.wrong_count >= p.correct_count;
      });
      if (pool.length === 0) pool = all; // fall back to full mode
    }
    return shuffle(pool);
  }

  return { shuffle, isCorrect, fetchProgress, saveProgress, recordAttempt, buildDeck };
})();
