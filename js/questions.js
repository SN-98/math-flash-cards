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
    // Additional textbook formulas (Chapter 7)
    {
      id: "rule_quotient",
      title: "Quotient of powers",
      formula: "a<sup>m</sup> / a<sup>n</sup> = a<sup>m−n</sup>",
      explanation: "Same base, divided? Subtract the exponents.",
      example: "2<sup>10</sup> / 2<sup>3</sup> = 2<sup>7</sup> = 128",
    },
    {
      id: "rule_product_bases",
      title: "Power of a product",
      formula: "(ab)<sup>n</sup> = a<sup>n</sup> · b<sup>n</sup>",
      explanation: "A power distributes over multiplication.",
      example: "(2·3)<sup>4</sup> = 2<sup>4</sup>·3<sup>4</sup> = 16·81 = 1296",
    },
    {
      id: "rule_equal_powers",
      title: "Equal powers",
      formula: "a<sup>n</sup> = b<sup>n</sup>  ⇒  a = b (n odd)  ·  a = ±b (n even)",
      explanation:
        "If two equal powers share the same exponent, the bases are equal — but for even exponents the base could also be the negative.",
      example: "x<sup>3</sup> = 27 ⇒ x = 3   ·   x<sup>2</sup> = 9 ⇒ x = ±3",
    },
    {
      id: "rule_principal_root",
      title: "Principal square root",
      formula: "√a ≥ 0",
      explanation:
        "The √ symbol always means the non-negative root. Use ±√ if you want both signs.",
      example: "√4 = 2 only (not ±2)",
    },
    {
      id: "rule_square_nonneg",
      title: "A square is never negative",
      formula: "a<sup>2</sup> ≥ 0",
      explanation:
        "Squaring any real number yields a non-negative value, even when the base is negative.",
      example: "(−4)<sup>2</sup> = 16",
    },
    {
      id: "rule_nth_root",
      title: "N-th root notation",
      formula: "<sup>n</sup>√a = a<sup>1/n</sup>",
      explanation:
        "Taking the n-th root is the same as raising to the 1/n power.",
      example: "<sup>3</sup>√8 = 8<sup>1/3</sup> = 2",
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

  // -------- Algebraic identities (binomial expansions) --------
  const algebraRules = [
    {
      id: "rule_sum_sq",
      title: "Square of a sum",
      formula:
        "(a + b)<sup>2</sup> = a<sup>2</sup> + 2ab + b<sup>2</sup>",
      explanation: "Square each term and add twice the product.",
      example: "(3 + 4)<sup>2</sup> = 9 + 24 + 16 = 49",
    },
    {
      id: "rule_diff_sq",
      title: "Square of a difference",
      formula:
        "(a − b)<sup>2</sup> = a<sup>2</sup> − 2ab + b<sup>2</sup>",
      explanation: "Same shape as the sum, but the middle term is negative.",
      example: "(5 − 2)<sup>2</sup> = 25 − 20 + 4 = 9",
    },
    {
      id: "rule_diff_squares",
      title: "Difference of squares",
      formula:
        "(a + b)(a − b) = a<sup>2</sup> − b<sup>2</sup>",
      explanation:
        "When you multiply (a + b) by (a − b), the cross terms cancel.",
      example: "(7 + 3)(7 − 3) = 49 − 9 = 40",
    },
    {
      id: "rule_sum_cube",
      title: "Cube of a sum",
      formula:
        "(a + b)<sup>3</sup> = a<sup>3</sup> + 3a<sup>2</sup>b + 3ab<sup>2</sup> + b<sup>3</sup>",
      explanation:
        "Coefficients follow Pascal's triangle: 1, 3, 3, 1.",
      example: "(2 + 1)<sup>3</sup> = 8 + 12 + 6 + 1 = 27",
    },
    {
      id: "rule_diff_cube",
      title: "Cube of a difference",
      formula:
        "(a − b)<sup>3</sup> = a<sup>3</sup> − 3a<sup>2</sup>b + 3ab<sup>2</sup> − b<sup>3</sup>",
      explanation:
        "Same expansion as the sum cube; alternate the signs.",
      example: "(3 − 1)<sup>3</sup> = 27 − 27 + 9 − 1 = 8",
    },
  ];
  for (const r of algebraRules) {
    qs.push({
      id: r.id,
      topic: "algebra",
      subtopic: "rule",
      group: "algebra-rules",
      learnOnly: true,
      q: r.title,
      a: r.formula,
      explanation: r.explanation,
      example: r.example,
    });
  }

  // -------- Identity completion quiz (fill in the missing term) --------
  function pushIdent(id, qHtml, ans, accept) {
    qs.push({
      id,
      topic: "algebra",
      subtopic: "identity",
      group: "identities-fill",
      q: qHtml,
      a: ans,
      accept,
    });
  }
  pushIdent(
    "iden_sum_sq",
    "(a + b)<sup>2</sup> = a<sup>2</sup> + ___ + b<sup>2</sup>",
    "2ab",
    ["2ba"]
  );
  pushIdent(
    "iden_diff_sq",
    "(a − b)<sup>2</sup> = a<sup>2</sup> − ___ + b<sup>2</sup>",
    "2ab",
    ["2ba"]
  );
  pushIdent(
    "iden_diff_squares",
    "(a + b)(a − b) = a<sup>2</sup> − ___",
    "b^2",
    ["b2"]
  );
  pushIdent(
    "iden_dsq_factor",
    "a<sup>2</sup> − b<sup>2</sup> = (a + b) · ___",
    "(a-b)",
    ["a-b"]
  );
  pushIdent(
    "iden_sum_cube_a",
    "(a + b)<sup>3</sup> = a<sup>3</sup> + ___ + 3ab<sup>2</sup> + b<sup>3</sup>",
    "3a^2b",
    ["3a2b", "3ba^2", "3ba2"]
  );
  pushIdent(
    "iden_sum_cube_b",
    "(a + b)<sup>3</sup> = a<sup>3</sup> + 3a<sup>2</sup>b + ___ + b<sup>3</sup>",
    "3ab^2",
    ["3ab2", "3b^2a", "3b2a"]
  );
  pushIdent(
    "iden_diff_cube_a",
    "(a − b)<sup>3</sup> = a<sup>3</sup> − ___ + 3ab<sup>2</sup> − b<sup>3</sup>",
    "3a^2b",
    ["3a2b", "3ba^2", "3ba2"]
  );
  pushIdent(
    "iden_diff_cube_b",
    "(a − b)<sup>3</sup> = a<sup>3</sup> − 3a<sup>2</sup>b + ___ − b<sup>3</sup>",
    "3ab^2",
    ["3ab2", "3b^2a", "3b2a"]
  );

  // -------- Solve-with-values quiz (numeric, with step-by-step solve) --------
  function pushSolve(id, qHtml, ans, solve) {
    qs.push({
      id,
      topic: "algebra",
      subtopic: "solve",
      group: "identities-solve",
      q: qHtml,
      a: String(ans),
      solve,
    });
  }
  const dash = "−";
  const sumSqSolve = (a, b) =>
    `<strong>(a + b)<sup>2</sup> = a<sup>2</sup> + 2ab + b<sup>2</sup></strong><br>` +
    `= ${a}<sup>2</sup> + 2·${a}·${b} + ${b}<sup>2</sup><br>` +
    `= ${a * a} + ${2 * a * b} + ${b * b}<br>` +
    `= ${(a + b) * (a + b)}`;
  const diffSqSolve = (a, b) =>
    `<strong>(a ${dash} b)<sup>2</sup> = a<sup>2</sup> ${dash} 2ab + b<sup>2</sup></strong><br>` +
    `= ${a}<sup>2</sup> ${dash} 2·${a}·${b} + ${b}<sup>2</sup><br>` +
    `= ${a * a} ${dash} ${2 * a * b} + ${b * b}<br>` +
    `= ${(a - b) * (a - b)}`;
  const dsqSolve = (a, b) =>
    `<strong>(a + b)(a ${dash} b) = a<sup>2</sup> ${dash} b<sup>2</sup></strong><br>` +
    `= ${a}<sup>2</sup> ${dash} ${b}<sup>2</sup><br>` +
    `= ${a * a} ${dash} ${b * b}<br>` +
    `= ${a * a - b * b}`;
  const sumCubeSolve = (a, b) =>
    `<strong>(a + b)<sup>3</sup> = a<sup>3</sup> + 3a<sup>2</sup>b + 3ab<sup>2</sup> + b<sup>3</sup></strong><br>` +
    `= ${a}<sup>3</sup> + 3·${a}<sup>2</sup>·${b} + 3·${a}·${b}<sup>2</sup> + ${b}<sup>3</sup><br>` +
    `= ${a ** 3} + ${3 * a * a * b} + ${3 * a * b * b} + ${b ** 3}<br>` +
    `= ${(a + b) ** 3}`;
  const diffCubeSolve = (a, b) =>
    `<strong>(a ${dash} b)<sup>3</sup> = a<sup>3</sup> ${dash} 3a<sup>2</sup>b + 3ab<sup>2</sup> ${dash} b<sup>3</sup></strong><br>` +
    `= ${a}<sup>3</sup> ${dash} 3·${a}<sup>2</sup>·${b} + 3·${a}·${b}<sup>2</sup> ${dash} ${b}<sup>3</sup><br>` +
    `= ${a ** 3} ${dash} ${3 * a * a * b} + ${3 * a * b * b} ${dash} ${b ** 3}<br>` +
    `= ${(a - b) ** 3}`;
  for (const [a, b] of [[3, 2], [5, 4], [7, 3], [10, 4]]) {
    pushSolve(
      `solv_sumsq_${a}_${b}`,
      `If a = ${a}, b = ${b}, what is (a + b)<sup>2</sup>?`,
      (a + b) * (a + b),
      sumSqSolve(a, b)
    );
    pushSolve(
      `solv_diffsq_${a}_${b}`,
      `If a = ${a}, b = ${b}, what is (a ${dash} b)<sup>2</sup>?`,
      (a - b) * (a - b),
      diffSqSolve(a, b)
    );
    pushSolve(
      `solv_dsq_${a}_${b}`,
      `If a = ${a}, b = ${b}, what is (a + b)(a ${dash} b)?`,
      a * a - b * b,
      dsqSolve(a, b)
    );
  }
  for (const [a, b] of [[2, 1], [3, 1], [4, 2]]) {
    pushSolve(
      `solv_sumcube_${a}_${b}`,
      `If a = ${a}, b = ${b}, what is (a + b)<sup>3</sup>?`,
      (a + b) ** 3,
      sumCubeSolve(a, b)
    );
    pushSolve(
      `solv_diffcube_${a}_${b}`,
      `If a = ${a}, b = ${b}, what is (a ${dash} b)<sup>3</sup>?`,
      (a - b) ** 3,
      diffCubeSolve(a, b)
    );
  }

  // -------- Practice Set 7.1 (textbook problems with worked solutions) --------
  function pushPS(id, qHtml, ans, accept, solve) {
    qs.push({
      id,
      topic: "exponents",
      subtopic: "practice",
      group: "practice-set-71",
      q: qHtml,
      a: ans,
      accept,
      solve,
    });
  }
  pushPS(
    "ps71_1a",
    "Simplify: 2<sup>10</sup> + 2<sup>11</sup> + 2<sup>12</sup> + 2<sup>13</sup> + 2<sup>14</sup>",
    "31×2^10",
    ["31*2^10", "31x2^10", "31·2^10", "31×2¹⁰"],
    "Take 2<sup>10</sup> common:<br>" +
      "= 2<sup>10</sup>(1 + 2 + 4 + 8 + 16)<br>" +
      "= 2<sup>10</sup> · 31<br>" +
      "= <strong>31 × 2<sup>10</sup></strong>"
  );
  pushPS(
    "ps71_1b",
    "Simplify: 55<sup>5</sup> / 5<sup>55</sup>",
    "11^5/5^50",
    ["11⁵/5⁵⁰"],
    "55<sup>5</sup> = (5·11)<sup>5</sup> = 5<sup>5</sup>·11<sup>5</sup><br>" +
      "= 5<sup>5</sup>·11<sup>5</sup> / 5<sup>55</sup><br>" +
      "= <strong>11<sup>5</sup> / 5<sup>50</sup></strong>"
  );
  pushPS(
    "ps71_1c",
    "Simplify: (7<sup>10</sup> + 7<sup>11</sup>) / 7",
    "8×7^9",
    ["8*7^9", "8x7^9", "8·7^9", "8×7⁹"],
    "Factor 7<sup>10</sup>:<br>" +
      "= 7<sup>10</sup>(1 + 7) / 7<br>" +
      "= 7<sup>10</sup> · 8 / 7<br>" +
      "= <strong>8 × 7<sup>9</sup></strong>"
  );
  pushPS(
    "ps71_1d",
    "Simplify: (2<sup>25</sup> − 2<sup>10</sup>) / 2<sup>9</sup>",
    "2^16-2",
    ["2¹⁶-2", "2^16 − 2"],
    "Factor 2<sup>10</sup>:<br>" +
      "= 2<sup>10</sup>(2<sup>15</sup> − 1) / 2<sup>9</sup><br>" +
      "= 2(2<sup>15</sup> − 1)<br>" +
      "= <strong>2<sup>16</sup> − 2</strong>"
  );
  pushPS(
    "ps71_2_max",
    "Given a<sup>4</sup>=256, b<sup>3</sup>=−27, c<sup>3</sup>=64. What is the greatest value of a + b + c?",
    "5",
    [],
    "a<sup>4</sup> = 256 ⇒ a = ±4<br>" +
      "b<sup>3</sup> = −27 ⇒ b = −3<br>" +
      "c<sup>3</sup> = 64 ⇒ c = 4<br>" +
      "Greatest a + b + c = 4 − 3 + 4 = <strong>5</strong>"
  );
  pushPS(
    "ps71_2_min",
    "Given a<sup>4</sup>=256, b<sup>3</sup>=−27, c<sup>3</sup>=64. What is the least value of a + b + c?",
    "-3",
    ["−3"],
    "a<sup>4</sup> = 256 ⇒ a = ±4<br>" +
      "b<sup>3</sup> = −27 ⇒ b = −3<br>" +
      "c<sup>3</sup> = 64 ⇒ c = 4<br>" +
      "Least a + b + c = −4 − 3 + 4 = <strong>−3</strong>"
  );
  pushPS(
    "ps71_3a",
    "Which is greater: 0.5<sup>6</sup> or 0.5<sup>4</sup>?",
    "0.5^4",
    ["0.5⁴"],
    "0.5<sup>6</sup> = 0.5<sup>4</sup> · 0.5<sup>2</sup> = 0.5<sup>4</sup> · 0.25<br>" +
      "So 0.5<sup>6</sup> = ¼ · 0.5<sup>4</sup>.<br>" +
      "⇒ <strong>0.5<sup>4</sup></strong> is greater."
  );
  pushPS(
    "ps71_3b",
    "Which is greater: 9<sup>1/8</sup> or 8<sup>1/9</sup>?",
    "9^(1/8)",
    ["9^1/8", "9¹⁄⁸"],
    "Raise both to the 72-nd power:<br>" +
      "(9<sup>1/8</sup>)<sup>72</sup> = 9<sup>9</sup><br>" +
      "(8<sup>1/9</sup>)<sup>72</sup> = 8<sup>8</sup><br>" +
      "9<sup>9</sup> > 8<sup>8</sup>, so <strong>9<sup>1/8</sup></strong> is greater."
  );
  pushPS(
    "ps71_3c",
    "Which is greater: √12 + √20 or √16 + √16?",
    "√16+√16",
    ["sqrt16+sqrt16", "sqrt(16)+sqrt(16)", "√16 + √16"],
    "Square both expressions:<br>" +
      "(√12 + √20)<sup>2</sup> = 12 + 20 + 2√240 = 32 + 2√240<br>" +
      "(√16 + √16)<sup>2</sup> = 16 + 16 + 2√256 = 32 + 2√256<br>" +
      "Since 256 > 240, <strong>√16 + √16</strong> is greater."
  );

  // -------- Chapter 1: Equations (Learn rules) --------
  const equationRules = [
    {
      id: "eq_one_unknown",
      title: "Equation in one unknown",
      formula: "Assign · Form · Isolate",
      explanation:
        "Three-step method: name the unknown, write an equation from the wording, then isolate the variable on one side.",
      example:
        "10 yrs later, Peter's age = 2 × present.<br>Let p = present. p + 10 = 2p ⇒ p = 10",
    },
    {
      id: "eq_two_unknowns",
      title: "Two unknowns — elimination",
      formula: "Form 2 eqs · Align coefficients · Subtract to eliminate",
      explanation:
        "Build two equations, multiply one to match a coefficient, then subtract to eliminate that variable.",
      example:
        "Pens $5, pencils $4. 10 items, $44.<br>x + y = 10  ·  5x + 4y = 44<br>×4 first: 4x+4y=40 ⇒ subtract: x = 4",
    },
    {
      id: "eq_smarter_way",
      title: "Smarter way — one unknown",
      formula: "Express the second quantity as (total − first)",
      explanation:
        "Two quantities summing to a known total can be parametrized with one variable: x and (total − x). One equation instead of two.",
      example:
        "Pens = x, pencils = 10 − x.<br>5x + 4(10 − x) = 44 ⇒ x = 4",
    },
    {
      id: "eq_special",
      title: "Special equations (fewer eqs than unknowns)",
      formula: "Find a hidden divisibility or ratio constraint",
      explanation:
        "If you can't solve directly, look for an integer or ratio condition the answer must satisfy.",
      example:
        "Adam = ⅓ more than Peter. Total = 4x/3 + x = 7x/3 ⇒ total must be a multiple of 7.",
    },
    {
      id: "eq_quadratic_factor",
      title: "Quadratic by factoring",
      formula: "ax² + bx + c = 0 · split bx so the two parts multiply to ac",
      explanation:
        "Write in descending powers. Split the middle term so the two pieces' product equals a·c, then factor in pairs.",
      example:
        "x² + 5x + 6 = 0 ⇒ x² + 2x + 3x + 6 = 0<br>⇒ x(x+2) + 3(x+2) = 0 ⇒ (x+2)(x+3) = 0<br>⇒ x = −2 or −3",
    },
    {
      id: "eq_quadratic_formula",
      title: "Quadratic formula",
      formula: "x = [ −b ± √(b² − 4ac) ] / 2a",
      explanation:
        "Solves any ax² + bx + c = 0. Mind the signs when plugging in a, b, c.",
      example:
        "x² + 5x + 6 = 0: a=1, b=5, c=6.<br>x = [−5 ± √(25 − 24)] / 2 = (−5 ± 1) / 2<br>⇒ x = −2 or −3",
    },
    {
      id: "eq_discriminant",
      title: "Discriminant",
      formula: "Δ = b² − 4ac  ·  Δ < 0 ⇒ no real roots",
      explanation:
        "Sign of the discriminant tells you how many real solutions exist. Negative discriminant = no real x on the number line.",
      example: "x² + 2x + 5 = 0:  Δ = 4 − 20 = −16 < 0 ⇒ no real roots",
    },
    {
      id: "eq_sqrt",
      title: "Equations with square root",
      formula: "Isolate the √ · Square both sides · Verify back-substituted",
      explanation:
        "Squaring can introduce extraneous roots. After solving, plug each candidate back into the original equation — both the inside and the result of √ must be non-negative.",
      example: "√(t − 2) = 4 ⇒ t − 2 = 16 ⇒ t = 18 ✓",
    },
  ];
  for (const r of equationRules) {
    qs.push({
      id: r.id,
      topic: "equations",
      subtopic: "rule",
      group: "equation-rules",
      learnOnly: true,
      q: r.title,
      a: r.formula,
      explanation: r.explanation,
      example: r.example,
    });
  }

  // -------- Practice Set 1.1 — Equations in one unknown --------
  function pushEqQ(group, id, qHtml, ans, accept, solve) {
    qs.push({
      id,
      topic: "equations",
      subtopic: "practice",
      group,
      q: qHtml,
      a: ans,
      accept,
      solve,
    });
  }
  pushEqQ(
    "ps-1-1",
    "ps11_1",
    "Solve for x:  7x + 23 = 2(x + 4)",
    "-3",
    ["−3"],
    "7x + 23 = 2x + 8<br>⇒ 5x = −15<br>⇒ <strong>x = −3</strong>"
  );
  pushEqQ(
    "ps-1-1",
    "ps11_2",
    "Solve for x:  2(5x − 2) = 3[ 2(x + 1) + 14 ]",
    "13",
    [],
    "10x − 4 = 3[2x + 16] = 6x + 48<br>⇒ 4x = 52<br>⇒ <strong>x = 13</strong>"
  );
  pushEqQ(
    "ps-1-1",
    "ps11_3",
    "15 years from now, Harry's age will be three times his age 5 years ago. Harry's present age (in years)?",
    "15",
    [],
    "Let h = present age.<br>h + 15 = 3(h − 5)<br>⇒ h + 15 = 3h − 15<br>⇒ 2h = 30<br>⇒ <strong>h = 15</strong>"
  );
  pushEqQ(
    "ps-1-1",
    "ps11_4",
    "Adam had $17.10. He bought 3 apples at $1.50, 2 mangoes at $1.35, and spent the rest on 9 guavas. What is the cost of 2 apples and 1 guava (in dollars)?",
    "4.10",
    ["4.1", "$4.10", "$4.1"],
    "Apples: 3 × 1.50 = 4.50<br>Mangoes: 2 × 1.35 = 2.70<br>9g = 17.10 − 4.50 − 2.70 = 9.90 ⇒ g = 1.10<br>2 apples + 1 guava = 2(1.50) + 1.10 = <strong>$4.10</strong>"
  );
  pushEqQ(
    "ps-1-1",
    "ps11_5",
    "A tank is initially ⅜ full. After 3 gallons are added it is half full. Capacity (in gallons)?",
    "24",
    [],
    "Let capacity = x.<br>(3/8)x + 3 = (1/2)x<br>⇒ (1/2 − 3/8)x = 3<br>⇒ (1/8)x = 3<br>⇒ <strong>x = 24</strong>"
  );
  pushEqQ(
    "ps-1-1",
    "ps11_6",
    "Betty's Jan–June income was $15,000 more than her July–Sep income (same year). She earns the same every month. What is her annual income (in dollars)?",
    "60000",
    ["$60000", "60,000", "$60,000"],
    "Let monthly = x.<br>6x = 3x + 15000<br>⇒ 3x = 15000 ⇒ x = 5000<br>Annual = 12 × 5000 = <strong>$60,000</strong>"
  );

  // -------- Practice Set 1.2 — Equations in two unknowns --------
  pushEqQ(
    "ps-1-2",
    "ps12_1",
    "A store sells textbooks at $5 and notebooks at $4. Barrett buys 7 books for $31. How many textbooks?",
    "3",
    [],
    "Let textbooks = x, notebooks = 7 − x.<br>5x + 4(7 − x) = 31<br>⇒ x + 28 = 31<br>⇒ <strong>x = 3</strong>"
  );
  pushEqQ(
    "ps-1-2",
    "ps12_2",
    "Peter is 10 years older than Adam. Five years ago Peter was twice Adam's age. Peter's age now?",
    "25",
    [],
    "Let Adam = x. Then Peter = x + 10.<br>5 yrs ago: x + 5 = 2(x − 5) ⇒ x = 15<br>Peter = 15 + 10 = <strong>25</strong>"
  );
  pushEqQ(
    "ps-1-2",
    "ps12_3",
    "Peter and John together weigh 75 lbs. Peter weighs 15 lbs less than twice John's weight. Peter's weight (lbs)?",
    "45",
    [],
    "Let John = J. Peter = 2J − 15.<br>P + J = 75 ⇒ (2J − 15) + J = 75<br>⇒ 3J = 90 ⇒ J = 30<br>Peter = <strong>45</strong>"
  );
  pushEqQ(
    "ps-1-2",
    "ps12_4",
    "Nick spends $200 on 125 sandwiches: singles ($1) and doubles ($2). How many doubles?",
    "75",
    [],
    "Let doubles = x, singles = 125 − x.<br>2x + (125 − x) = 200<br>⇒ x + 125 = 200<br>⇒ <strong>x = 75</strong>"
  );
  pushEqQ(
    "ps-1-2",
    "ps12_5",
    "Victoria has 50 chocolates split into 5-piece and 10-piece packs. She has 4 more 5-piece packs than 10-piece. How many 10-piece packs?",
    "2",
    [],
    "Let 10-piece = x, 5-piece = x + 4.<br>10x + 5(x + 4) = 50<br>⇒ 15x + 20 = 50 ⇒ <strong>x = 2</strong>"
  );
  pushEqQ(
    "ps-1-2",
    "ps12_6",
    "Ronan cuts a 50-inch rope so the longer piece is 5 inches more than the shorter. Length of the longer piece (inches)?",
    "27.5",
    [],
    "Let shorter = x, longer = x + 5.<br>x + (x + 5) = 50 ⇒ x = 22.5<br>Longer = <strong>27.5″</strong>"
  );
  pushEqQ(
    "ps-1-2",
    "ps12_7",
    "Smith has equal numbers of nickels and quarters totaling $9. Total number of coins?",
    "60",
    [],
    "Let count of each = x.<br>0.05x + 0.25x = 9<br>⇒ 0.30x = 9 ⇒ x = 30<br>Total coins = 2x = <strong>60</strong>"
  );

  // -------- Practice Set 1.3 — Special equations --------
  pushEqQ(
    "ps-1-3",
    "ps13_1",
    "If a + b = 15, b + c = 10, and a + c = 10, what is a + b + c?",
    "17.5",
    [],
    "Add the three equations:<br>2(a + b + c) = 15 + 10 + 10 = 35<br>⇒ <strong>a + b + c = 17.5</strong>"
  );
  pushEqQ(
    "ps-1-3",
    "ps13_2",
    "If x + y = 5y, find (x + 3y) / y.",
    "7",
    [],
    "x + y = 5y ⇒ x = 4y<br>(x + 3y)/y = (4y + 3y)/y = 7y/y = <strong>7</strong>"
  );
  pushEqQ(
    "ps-1-3",
    "ps13_3",
    "Andy has half as many books as Bill, who has one third as many books as Charlie. Of {30, 60, 90, 120, 150}, which can be the total they have together?",
    "90",
    [],
    "Let Andy = a. Bill = 2a. Charlie = 3·Bill = 6a.<br>Total = a + 2a + 6a = 9a ⇒ multiple of 9<br>Only <strong>90</strong> in the set is divisible by 9."
  );

  // -------- Practice Set 1.4 — Quadratic equations (single-answer subset) --------
  pushEqQ(
    "ps-1-4",
    "ps14_2",
    "If x = 4 is a root of x² + kx − 8 = 0, find k.",
    "-2",
    ["−2"],
    "Substitute x = 4:<br>16 + 4k − 8 = 0<br>⇒ 4k = −8 ⇒ <strong>k = −2</strong>"
  );
  pushEqQ(
    "ps-1-4",
    "ps14_3",
    "Which equation has 4 and 2 as its roots? Type the constant term (x² + bx + c = 0).",
    "8",
    [],
    "(x − 4)(x − 2) = 0 ⇒ x² − 6x + 8 = 0<br>Constant term <strong>c = 8</strong>"
  );
  pushEqQ(
    "ps-1-4",
    "ps14_4",
    "If x² + a = b and x is an integer, what could be the value of b − a? (3, 4, 5, 6, 7)",
    "4",
    [],
    "b − a = x² for integer x.<br>Of the choices, only <strong>4</strong> is a perfect square (= 2²)."
  );

  // -------- Practice Set 1.5 — Equations with square root --------
  pushEqQ(
    "ps-1-5",
    "ps15_1a",
    "Solve for x:  √(x − 8) = 6",
    "44",
    [],
    "Square both sides:<br>x − 8 = 36 ⇒ <strong>x = 44</strong>"
  );
  pushEqQ(
    "ps-1-5",
    "ps15_1b",
    "Solve for x (positive root only):  √(x² + 21) = 5",
    "2",
    [],
    "Square both sides: x² + 21 = 25<br>⇒ x² = 4 ⇒ x = ±2<br>Positive root: <strong>x = 2</strong>"
  );
  pushEqQ(
    "ps-1-5",
    "ps15_1c",
    "Solve for x:  √x = 2 / √(x − 3)",
    "4",
    [],
    "Cross-multiply: √(x(x−3)) = 2<br>Square: x² − 3x = 4 ⇒ x² − 3x − 4 = 0<br>(x − 4)(x + 1) = 0 ⇒ x = 4 or −1<br>x = −1 fails the original (negative under √).<br>⇒ <strong>x = 4</strong>"
  );
  pushEqQ(
    "ps-1-5",
    "ps15_1d",
    "Solve for x:  √(x² − 2) = √x",
    "2",
    [],
    "Square both sides: x² − 2 = x<br>⇒ x² − x − 2 = 0 ⇒ (x − 2)(x + 1) = 0<br>x = 2 or −1. x = −1 fails original.<br>⇒ <strong>x = 2</strong>"
  );
  pushEqQ(
    "ps-1-5",
    "ps15_2",
    "If x = 9 satisfies √x + k·√(x − 8) = 0, find k.",
    "-3",
    ["−3"],
    "Substitute x = 9:<br>√9 + k√1 = 0<br>⇒ 3 + k = 0 ⇒ <strong>k = −3</strong>"
  );

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
      id: "practice-set-71",
      section: "Exponent rules",
      title: "Practice Set 7.1",
      desc: "Textbook practice problems — full worked solution shown on misses.",
      filter: (q) => q.group === "practice-set-71",
    },
    {
      id: "algebra-rules",
      section: "Algebra rules",
      title: "The rules",
      desc: "Square of a sum, difference of squares, cubes — with examples.",
      filter: () => false,
      learnOnly: true,
      learnFilter: (q) =>
        q.subtopic === "rule" && q.group === "algebra-rules",
    },
    {
      id: "identities-fill",
      section: "Algebra rules",
      title: "Complete the identity",
      desc: 'Fill in the missing term — e.g. "(a+b)² = a² + ___ + b²"',
      filter: (q) => q.group === "identities-fill",
    },
    {
      id: "identities-solve",
      section: "Algebra rules",
      title: "Solve with values",
      desc: "Plug in numbers and compute. Step-by-step walkthrough on misses.",
      filter: (q) => q.group === "identities-solve",
    },
    {
      id: "equation-rules",
      section: "Equations",
      title: "The methods",
      desc: "1-unknown, 2-unknowns, special equations, quadratic, square root.",
      filter: () => false,
      learnOnly: true,
      learnFilter: (q) =>
        q.subtopic === "rule" && q.group === "equation-rules",
    },
    {
      id: "ps-1-1",
      section: "Equations",
      title: "Practice Set 1.1 — One unknown",
      desc: "Word problems solvable with one variable.",
      filter: (q) => q.group === "ps-1-1",
    },
    {
      id: "ps-1-2",
      section: "Equations",
      title: "Practice Set 1.2 — Two unknowns",
      desc: "Use elimination or the smarter one-variable shortcut.",
      filter: (q) => q.group === "ps-1-2",
    },
    {
      id: "ps-1-3",
      section: "Equations",
      title: "Practice Set 1.3 — Special equations",
      desc: "Fewer equations than unknowns — find the constraint.",
      filter: (q) => q.group === "ps-1-3",
    },
    {
      id: "ps-1-4",
      section: "Equations",
      title: "Practice Set 1.4 — Quadratics",
      desc: "Factoring + quadratic formula.",
      filter: (q) => q.group === "ps-1-4",
    },
    {
      id: "ps-1-5",
      section: "Equations",
      title: "Practice Set 1.5 — Square root equations",
      desc: "Square both sides, then verify.",
      filter: (q) => q.group === "ps-1-5",
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
