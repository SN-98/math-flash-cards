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

  // -------- Exponent rules (Learn-only cards) --------
  const rules = [
    {
      id: "rule_product",
      title: "Product of powers",
      formula: "xᵃ · xᵇ = xᵃ⁺ᵇ",
      explanation: "Same base, multiplied? Add the exponents.",
      example: "2³ · 2⁴ = 2⁷ = 128",
    },
    {
      id: "rule_power_of_power",
      title: "Power of a power",
      formula: "(xᵃ)ᵇ = xᵃᵇ",
      explanation: "Raising a power to a power? Multiply the exponents.",
      example: "(2²)³ = 2⁶ = 64",
    },
    {
      id: "rule_tower",
      title: "Tower of exponents",
      formula: "x^(aᵇ)  ≠  (xᵃ)ᵇ",
      explanation:
        "Without parentheses, exponents stack right-to-left — evaluate the topmost first.",
      example: "x^(2³) = x⁸   ·   but (x²)³ = x⁶",
    },
    {
      id: "rule_negative",
      title: "Negative exponent",
      formula: "x⁻ⁿ = 1 / xⁿ",
      explanation: "A negative exponent flips the base under 1.",
      example: "2⁻³ = 1 / 2³ = 1/8",
    },
    {
      id: "rule_zero_exp",
      title: "Zero exponent",
      formula: "x⁰ = 1",
      explanation: "Anything (except 0) raised to the 0 is 1.",
      example: "7⁰ = 1   ·   100⁰ = 1",
    },
    {
      id: "rule_one_base",
      title: "Base of 1",
      formula: "1ⁿ = 1",
      explanation: "1 raised to any power is still 1.",
      example: "1¹⁰⁰ = 1",
    },
    {
      id: "rule_zero_base",
      title: "Base of 0",
      formula: "0ⁿ = 0   (for n > 0)",
      explanation: "0 raised to any positive power is 0. (0⁰ is undefined.)",
      example: "0⁵ = 0",
    },
    {
      id: "rule_neg_one",
      title: "Negative one base",
      formula: "(–1)ⁿ = 1 if n even, –1 if n odd",
      explanation: "(–1) flips between 1 and –1 depending on whether the exponent is even or odd.",
      example: "(–1)⁴ = 1   ·   (–1)⁵ = –1",
    },
  ];
  for (const r of rules) {
    qs.push({
      id: r.id,
      topic: "exponents",
      subtopic: "rule",
      group: "exponent-rules",
      learnOnly: true,
      q: r.title,
      a: r.formula,
      explanation: r.explanation,
      example: r.example,
    });
  }

  window.QUESTIONS = qs;

  // Quiz modes: declarative list. Add new entries here to expose new quizzes.
  // - filter: which questions belong to this mode in Quiz tab
  // - learnFilter: optional override for what shows up in Learn tab
  // - learnOnly: mode is hidden from Quiz tab entirely
  window.QUIZ_MODES = [
    {
      id: "exponent-rules",
      section: "Exponent rules",
      title: "The rules",
      desc: "Product, power-of-a-power, zero, negative — with examples.",
      filter: () => false,
      learnOnly: true,
      learnFilter: (q) => q.subtopic === "rule" && q.group === "exponent-rules",
    },
    {
      id: "mixed",
      section: "Mixed",
      title: "Mixed quiz",
      desc: "Random draw across every concept.",
      filter: (q) => !q.learnOnly,
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
