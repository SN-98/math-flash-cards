// Main controller: screen switching, event wiring, session loop.
(function () {
  const $ = (s) => document.querySelector(s);

  const screens = {
    login: $("#screen-login"),
    home: $("#screen-home"),
    quiz: $("#screen-quiz"),
    done: $("#screen-done"),
    learn: $("#screen-learn"),
  };
  function show(name) {
    Object.values(screens).forEach((s) => s.classList.remove("active"));
    screens[name].classList.add("active");
  }

  let session = window.Auth.getSession();
  let progressMap = {};
  let currentMode = null;
  let deck = [];
  let idx = 0;
  let session_correct = 0;
  let session_wrong = 0;
  let wrongInSession = [];

  let homeTab = "quiz"; // "quiz" | "learn"
  let learnDeck = [];
  let learnIdx = 0;

  function refreshProgress() {
    if (!session) return;
    progressMap = window.Quiz.fetchProgress(session.username);
  }

  function setHomeTab(tab) {
    homeTab = tab;
    $("#tab-quiz").classList.toggle("active", tab === "quiz");
    $("#tab-learn").classList.toggle("active", tab === "learn");
    $("#home-heading").textContent = tab === "learn" ? "Pick a topic to learn" : "Pick a quiz";
    $("#home-subhead").textContent =
      tab === "learn"
        ? "Flip through facts at your own pace — no scoring."
        : "Type the answer; we'll re-quiz what you miss.";
    renderHome();
  }

  function renderHome() {
    $("#who").textContent = session ? session.username : "";
    const totalQs = window.QUESTIONS.length;
    let answered = 0,
      correct = 0,
      wrong = 0;
    for (const q of window.QUESTIONS) {
      const p = progressMap[q.id];
      if (p) {
        answered++;
        correct += p.correct_count || 0;
        wrong += p.wrong_count || 0;
      }
    }
    $("#stats-summary").innerHTML = `
      <div class="row"><span>Questions in bank</span><strong>${totalQs}</strong></div>
      <div class="row"><span>Questions seen</span><strong>${answered}</strong></div>
      <div class="row"><span>Total correct</span><strong style="color:var(--good)">${correct}</strong></div>
      <div class="row"><span>Total wrong</span><strong style="color:var(--bad)">${wrong}</strong></div>
    `;

    const modes = window.QUIZ_MODES.slice();
    if (homeTab === "quiz") {
      const reviewable = window.QUESTIONS.some((q) => {
        const p = progressMap[q.id];
        return p && p.wrong_count > 0 && p.wrong_count >= p.correct_count;
      });
      if (reviewable) {
        modes.unshift({
          id: "__review__",
          section: "Personalized",
          title: "Review my wrong answers",
          desc: "Re-quiz only the questions you've missed.",
          filter: () => true,
          review: true,
        });
      }
    }

    const sections = {};
    for (const m of modes) {
      (sections[m.section] = sections[m.section] || []).push(m);
    }

    const list = $("#mode-list");
    list.innerHTML = "";
    for (const [sectionName, items] of Object.entries(sections)) {
      const h = document.createElement("div");
      h.className = "mode-section-title";
      h.textContent = sectionName;
      h.style.gridColumn = "1 / -1";
      list.appendChild(h);
      for (const m of items) {
        const count = countForMode(m);
        const btn = document.createElement("button");
        btn.className = "mode-card";
        btn.innerHTML = `
          <div class="title">${m.title}</div>
          <div class="desc">${m.desc}</div>
          <div class="count">${count} ${homeTab === "learn" ? "facts" : "questions"}</div>
        `;
        btn.onclick = () => {
          if (homeTab === "learn") startLearn(m);
          else startQuiz(m, { reviewWrongOnly: !!m.review });
        };
        list.appendChild(btn);
      }
    }
  }

  function learnPool(mode) {
    // Learn shows canonical facts only — forward direction, in natural order.
    return window.QUESTIONS.filter(
      (q) => mode.filter(q) && q.subtopic === "forward"
    );
  }
  function countForMode(m) {
    if (homeTab === "learn") return learnPool(m).length;
    return window.QUESTIONS.filter(m.filter).length;
  }

  function startLearn(mode) {
    currentMode = mode;
    learnDeck = learnPool(mode);
    if (learnDeck.length === 0) return;
    learnIdx = 0;
    show("learn");
    paintLearn();
  }
  function paintLearn(direction) {
    const card = $("#learn-card");
    if (direction) {
      card.classList.add(direction === "next" ? "slide-left" : "slide-right");
      setTimeout(doPaintLearn, 180);
    } else {
      doPaintLearn();
    }
  }
  function doPaintLearn() {
    const card = $("#learn-card");
    card.classList.remove("slide-left", "slide-right");
    card.classList.add("enter");
    const q = learnDeck[learnIdx];
    if (!q) return;
    $("#learn-topic").textContent = `${q.topic} · ${q.subtopic}`;
    // Show as a fact rather than a question: "2^3 = 8" (strip trailing "= ?")
    const stem = q.q.replace(/\s*=\s*\?\s*$/, "");
    $("#learn-question").textContent = `${stem} =`;
    $("#learn-answer").textContent = q.a;
    $("#learn-progress").textContent = `${learnIdx + 1} / ${learnDeck.length}`;
  }
  function learnNext() {
    if (learnIdx < learnDeck.length - 1) {
      learnIdx++;
      paintLearn("next");
    }
  }
  function learnPrev() {
    if (learnIdx > 0) {
      learnIdx--;
      paintLearn("prev");
    }
  }

  function startQuiz(mode, opts = {}) {
    currentMode = mode;
    deck = window.Quiz.buildDeck(mode, progressMap, opts);
    idx = 0;
    session_correct = 0;
    session_wrong = 0;
    wrongInSession = [];
    show("quiz");
    renderCard();
  }

  function renderCard(direction) {
    const card = $("#quiz-card");
    if (direction === "next") {
      card.classList.add("slide-left");
      setTimeout(paint, 180);
    } else if (direction === "prev") {
      card.classList.add("slide-right");
      setTimeout(paint, 180);
    } else {
      paint();
    }
  }
  function paint() {
    const card = $("#quiz-card");
    card.classList.remove("slide-left", "slide-right");
    card.classList.add("enter");
    if (idx >= deck.length) return finishSession();
    const q = deck[idx];
    $("#quiz-topic").textContent = `${q.topic} · ${q.subtopic}`;
    $("#quiz-question").textContent = q.q;
    $("#answer-input").value = "";
    $("#answer-input").focus();
    $("#feedback").hidden = true;
    $("#feedback").className = "feedback";
    $("#answer-submit").disabled = false;
    $("#quiz-progress").textContent = `${idx + 1} / ${deck.length}  ·  ✓ ${session_correct}  ✗ ${session_wrong}`;
  }

  function next() {
    if (idx < deck.length - 1) {
      idx++;
      renderCard("next");
    } else {
      finishSession();
    }
  }
  function prev() {
    if (idx > 0) {
      idx--;
      renderCard("prev");
    }
  }

  function submitAnswer() {
    const q = deck[idx];
    if (!q) return;
    const val = $("#answer-input").value;
    if (!val.trim()) return;
    const correct = window.Quiz.isCorrect(val, q);
    const fb = $("#feedback");
    const card = $("#quiz-card");
    fb.hidden = false;
    if (correct) {
      fb.className = "feedback good";
      fb.textContent = `✓ Correct — ${q.a}`;
      session_correct++;
      card.classList.remove("wrong-anim", "correct-anim");
      void card.offsetWidth;
      card.classList.add("correct-anim");
      setTimeout(() => card.classList.remove("correct-anim"), 600);
      if (navigator.vibrate) navigator.vibrate(40);
    } else {
      fb.className = "feedback bad";
      fb.textContent = `✗ Not quite — answer is ${q.a}`;
      session_wrong++;
      wrongInSession.push(q);
      const insertAt = Math.min(deck.length, idx + 3);
      deck.splice(insertAt, 0, q);
      card.classList.remove("wrong-anim", "correct-anim");
      void card.offsetWidth;
      card.classList.add("wrong-anim");
      setTimeout(() => card.classList.remove("wrong-anim"), 550);
      if (navigator.vibrate) navigator.vibrate([60, 40, 60, 40, 60]);
    }
    $("#answer-submit").disabled = true;

    window.Quiz.recordAttempt(session.username, progressMap, q, correct);

    $("#quiz-progress").textContent = `${idx + 1} / ${deck.length}  ·  ✓ ${session_correct}  ✗ ${session_wrong}`;
    setTimeout(next, 900);
  }

  function finishSession() {
    show("done");
    const total = session_correct + session_wrong;
    const pct = total ? Math.round((session_correct / total) * 100) : 0;
    $("#done-summary").innerHTML = `
      <p>You answered <strong>${total}</strong> question${total === 1 ? "" : "s"}.</p>
      <div class="stats" style="margin-top:12px">
        <div class="row"><span>Correct</span><strong style="color:var(--good)">${session_correct}</strong></div>
        <div class="row"><span>Wrong</span><strong style="color:var(--bad)">${session_wrong}</strong></div>
        <div class="row"><span>Score</span><strong>${pct}%</strong></div>
      </div>
    `;
    $("#done-review").style.display = wrongInSession.length ? "" : "none";
  }

  $("#login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const err = $("#login-error");
    err.hidden = true;
    try {
      const u = await window.Auth.login(
        $("#login-username").value,
        $("#login-code").value
      );
      session = u;
      refreshProgress();
      renderHome();
      show("home");
    } catch (ex) {
      err.hidden = false;
      err.textContent = ex.message || "Login failed.";
    }
  });

  $("#logout").addEventListener("click", () => {
    window.Auth.logout();
    session = null;
    progressMap = {};
    show("login");
  });

  $("#quiz-back").addEventListener("click", () => {
    renderHome();
    show("home");
  });
  $("#learn-back").addEventListener("click", () => {
    renderHome();
    show("home");
  });
  $("#learn-prev").addEventListener("click", learnPrev);
  $("#learn-next").addEventListener("click", learnNext);

  $("#tab-quiz").addEventListener("click", () => setHomeTab("quiz"));
  $("#tab-learn").addEventListener("click", () => setHomeTab("learn"));

  $("#answer-form").addEventListener("submit", (e) => {
    e.preventDefault();
    submitAnswer();
  });

  $("#prev-btn").addEventListener("click", prev);
  $("#next-btn").addEventListener("click", next);

  $("#done-review").addEventListener("click", () => {
    if (!wrongInSession.length) return;
    const set = new Set(wrongInSession.map((q) => q.id));
    startQuiz(
      { ...currentMode, filter: (q) => set.has(q.id) },
      { reviewWrongOnly: false }
    );
  });
  $("#done-home").addEventListener("click", () => {
    refreshProgress();
    renderHome();
    show("home");
  });

  document.addEventListener("keydown", (e) => {
    if (screens.quiz.classList.contains("active")) {
      if (e.key === "ArrowRight" && document.activeElement !== $("#answer-input")) next();
      if (e.key === "ArrowLeft"  && document.activeElement !== $("#answer-input")) prev();
    } else if (screens.learn.classList.contains("active")) {
      if (e.key === "ArrowRight" || e.key === " ") learnNext();
      if (e.key === "ArrowLeft") learnPrev();
    }
  });

  function attachSwipe(cardEl, onLeft, onRight) {
    let startX = 0,
      startY = 0,
      active = false;
    cardEl.addEventListener("touchstart", (e) => {
      const t = e.touches[0];
      startX = t.clientX;
      startY = t.clientY;
      active = true;
    });
    cardEl.addEventListener("touchend", (e) => {
      if (!active) return;
      active = false;
      const t = e.changedTouches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) onLeft();
        else onRight();
      }
    });
  }
  attachSwipe($("#quiz-card"), next, prev);
  attachSwipe($("#learn-card"), learnNext, learnPrev);

  (function boot() {
    if (session) {
      refreshProgress();
      renderHome();
      show("home");
      return;
    }
    show("login");
  })();
})();
