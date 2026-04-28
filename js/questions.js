// Question bank, generated programmatically.
// To add a new concept later: write another builder and push into the array.
//
// Each question has:
//   id        — stable identifier (used as the DB key for progress tracking)
//   topic     — top-level concept ("exponents", "multiplication", ...)
//   subtopic  — direction or variant ("forward", "reverse")
//   group     — finer-grained grouping for picking a focused quiz
//               (e.g. "table-7" for the 7-times table)
//   q         — question text shown to the user
//   a         — accepted answer (string; comparison is normalized)
//   accept    — optional list of additional accepted answers

(function () {
  const qs = [];

  // -------- Exponents of 2 (powers 1..10) --------
  for (let n = 1; n <= 10; n++) {
    const v = Math.pow(2, n);
    qs.push({
      id: `exp_fwd_${n}`,
      topic: "exponents",
      subtopic: "forward",
      group: "exponents-forward",
      q: `2^${n} = ?`,
      a: String(v),
    });
    qs.push({
      id: `exp_rev_${v}`,
      topic: "exponents",
      subtopic: "reverse",
      group: "exponents-reverse",
      q: `${v} is what exponent of 2?`,
      a: String(n),
    });
  }

  // -------- Times tables (2..20, each x 1..12) --------
  for (let base = 2; base <= 20; base++) {
    for (let mul = 1; mul <= 12; mul++) {
      const v = base * mul;
      qs.push({
        id: `mul_fwd_${base}_${mul}`,
        topic: "multiplication",
        subtopic: "forward",
        group: `table-${base}`,
        q: `${base} × ${mul} = ?`,
        a: String(v),
      });
      qs.push({
        id: `mul_rev_${base}_${mul}`,
        topic: "multiplication",
        subtopic: "reverse",
        group: `table-${base}`,
        q: `${v} is what multiple of ${base}?`,
        a: String(mul),
      });
    }
  }

  window.QUESTIONS = qs;

  // Quiz modes: declarative list. Add new entries here to expose new quizzes.
  window.QUIZ_MODES = [
    {
      id: "mixed",
      section: "Mixed",
      title: "Mixed quiz",
      desc: "Random draw across every concept.",
      filter: () => true,
    },
    {
      id: "exponents-all",
      section: "Exponents of 2",
      title: "All exponents",
      desc: "Forward and reverse, powers 1–10.",
      filter: (q) => q.topic === "exponents",
    },
    {
      id: "exponents-forward",
      section: "Exponents of 2",
      title: "Forward only (2^n = ?)",
      desc: 'e.g. "2^9 = ?"',
      filter: (q) => q.topic === "exponents" && q.subtopic === "forward",
    },
    {
      id: "exponents-reverse",
      section: "Exponents of 2",
      title: "Reverse only (X is 2^?)",
      desc: 'e.g. "8 is what exponent of 2?"',
      filter: (q) => q.topic === "exponents" && q.subtopic === "reverse",
    },
    {
      id: "multiplication-all",
      section: "Times tables",
      title: "All times tables (2–20)",
      desc: "Forward and reverse for every base.",
      filter: (q) => q.topic === "multiplication",
    },
    {
      id: "multiplication-forward",
      section: "Times tables",
      title: "Forward only (a × b = ?)",
      desc: 'e.g. "7 × 8 = ?"',
      filter: (q) => q.topic === "multiplication" && q.subtopic === "forward",
    },
    {
      id: "multiplication-reverse",
      section: "Times tables",
      title: "Reverse only (X is what multiple?)",
      desc: 'e.g. "18 is what multiple of 2?"',
      filter: (q) => q.topic === "multiplication" && q.subtopic === "reverse",
    },
  ];

  // Per-base focused tables (2..20)
  for (let base = 2; base <= 20; base++) {
    window.QUIZ_MODES.push({
      id: `table-${base}`,
      section: "Single table",
      title: `× ${base} table`,
      desc: `Both directions for the ${base}-times table.`,
      filter: (q) => q.group === `table-${base}`,
    });
  }
})();
