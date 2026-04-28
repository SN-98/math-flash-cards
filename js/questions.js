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
      q: `2<sup>${n}</sup> = ?`,
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
        base,
        q: `${base} × ${mul} = ?`,
        a: String(v),
      });
      qs.push({
        id: `mul_rev_${base}_${mul}`,
        topic: "multiplication",
        subtopic: "reverse",
        group: `table-${base}`,
        base,
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
      formula: "x<sup>a</sup> · x<sup>b</sup> = x<sup>a+b</sup>",
      explanation: "Same base, multiplied? Add the exponents.",
      example: "2<sup>3</sup> · 2<sup>4</sup> = 2<sup>7</sup> = 128",
    },
    {
      id: "rule_power_of_power",
      title: "Power of a power",
      formula: "(x<sup>a</sup>)<sup>b</sup> = x<sup>ab</sup>",
      explanation:
        "When the base is wrapped in parentheses, multiply the exponents.",
      example: "(2<sup>2</sup>)<sup>3</sup> = 2<sup>6</sup> = 64",
    },
    {
      id: "rule_tower",
      title: "Tower of exponents",
      formula: "x<sup>2<sup>3</sup></sup> = x<sup>8</sup>",
      explanation:
        "Without parentheses, evaluate the top exponent first. Here 2<sup>3</sup> = 8, so the whole expression becomes x<sup>8</sup>.",
      example:
        "x<sup>2<sup>3</sup></sup> = x<sup>8</sup>   (because 2<sup>3</sup> = 8)",
    },
    {
      id: "rule_negative",
      title: "Negative exponent",
      formula: "x<sup>−n</sup> = 1 / x<sup>n</sup>",
      explanation: "A negative exponent flips the base under 1.",
      example:
        "x<sup>−2</sup> = 1 / x<sup>2</sup>   ·   2<sup>−3</sup> = 1/8",
    },
    {
      id: "rule_zero_exp",
      title: "Zero exponent",
      formula: "x<sup>0</sup> = 1",
      explanation: "Anything (except 0) raised to the 0 is 1.",
      example: "7<sup>0</sup> = 1   ·   100<sup>0</sup> = 1",
    },
    {
      id: "rule_one_base",
      title: "Base of 1",
      formula: "1<sup>n</sup> = 1",
      explanation: "1 raised to any power is still 1.",
      example: "1<sup>100</sup> = 1",
    },
    {
      id: "rule_zero_base",
      title: "Base of 0",
      formula: "0<sup>n</sup> = 0   (for n > 0)",
      explanation:
        "0 raised to any positive power is 0. (0<sup>0</sup> is undefined.)",
      example: "0<sup>5</sup> = 0",
    },
    {
      id: "rule_neg_one",
      title: "Negative one base",
      formula: "(−1)<sup>n</sup> = 1 if n even, −1 if n odd",
      explanation:
        "(−1) flips between 1 and −1 depending on whether the exponent is even or odd.",
      example: "(−1)<sup>4</sup> = 1   ·   (−1)<sup>5</sup> = −1",
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

  // -------- Apply-the-rules quiz questions --------
  // All have positive integer answers so the numeric keypad works on mobile.
  function pushRule(id, q, a) {
    qs.push({
      id,
      topic: "rules",
      subtopic: "apply",
      group: "rules-quiz",
      q,
      a: String(a),
    });
  }
  // Product rule: 2^a · 2^b = 2^(a+b)
  for (let a = 1; a <= 5; a++)
    for (let b = 1; b <= 5; b++)
      pushRule(
        `rq_prod_${a}_${b}`,
        `2<sup>${a}</sup> · 2<sup>${b}</sup> = 2<sup>?</sup>`,
        a + b
      );
  // Power of a power: (2^a)^b = 2^(a·b)
  for (let a = 1; a <= 5; a++)
    for (let b = 1; b <= 5; b++)
      pushRule(
        `rq_pop_${a}_${b}`,
        `(2<sup>${a}</sup>)<sup>${b}</sup> = 2<sup>?</sup>`,
        a * b
      );
  // Negative exponent: 2^(-n) = 1 / 2^n
  for (let n = 1; n <= 6; n++)
    pushRule(
      `rq_neg_${n}`,
      `2<sup>−${n}</sup> = 1 / 2<sup>?</sup>`,
      n
    );
  // Zero exponent: x^0 = 1
  for (const x of [3, 7, 12, 99, 100, 1024])
    pushRule(`rq_zero_${x}`, `${x}<sup>0</sup> = ?`, 1);
  // Base of 1: 1^n = 1
  for (const n of [5, 10, 50, 99, 1000])
    pushRule(`rq_one_${n}`, `1<sup>${n}</sup> = ?`, 1);
  // Base of 0: 0^n = 0 (n > 0)
  for (const n of [3, 5, 10, 100])
    pushRule(`rq_zb_${n}`, `0<sup>${n}</sup> = ?`, 0);
  // Tower: x^(a^b) — evaluate top first
  for (const [a, b] of [[2, 2], [2, 3], [3, 2], [2, 4], [3, 3]])
    pushRule(
      `rq_tower_${a}_${b}`,
      `x<sup>${a}<sup>${b}</sup></sup> = x<sup>?</sup>`,
      Math.pow(a, b)
    );
  // (-1)^even = 1
  for (const n of [2, 4, 6, 8, 10, 100])
    pushRule(`rq_negone_e_${n}`, `(−1)<sup>${n}</sup> = ?`, 1);

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
      id: "rules-apply",
      section: "Exponent rules",
      title: "Apply the rules",
      desc: "Practice problems for product, power-of-a-power, negative, zero…",
      filter: (q) => q.group === "rules-quiz",
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
      title: "Forward only (2<sup>n</sup> = ?)",
      desc: 'e.g. "2<sup>9</sup> = ?"',
      filter: (q) => q.topic === "exponents" && q.subtopic === "forward",
    },
    {
      id: "exponents-reverse",
      section: "Exponents of 2",
      title: "Reverse only (X is 2<sup>?</sup>)",
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

  // Per-base focused tables (2..20) — fold under the Times tables section.
  for (let base = 2; base <= 20; base++) {
    window.QUIZ_MODES.push({
      id: `table-${base}`,
      section: "Times tables",
      title: `× ${base} table`,
      desc: `Both directions for the ${base}-times table.`,
      filter: (q) => q.group === `table-${base}`,
    });
  }
})();
