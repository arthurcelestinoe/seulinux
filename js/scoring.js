import { collectHardwareNeeds, hardwareScore } from "./hardware.js";
import { readiness, classify } from "./complexity.js";
const clamp = (n) => Math.max(0, Math.min(100, n));
export function axisScores(axes, qs, answers) {
  return Object.fromEntries(
    axes.map((a) => {
      let sum = 0,
        active = 0;
      qs.forEach((q) => {
        const v = answers[q.id],
          w = q.weights?.[a.id];
        if (v !== undefined && v !== null && w !== undefined) {
          sum += ((v - 2.5) / 2.5) * w;
          active += Math.abs(w);
        }
      });
      return [a.id, active ? clamp(50 + (50 * sum) / active) : 50];
    }),
  );
}
export function rankDistros(data, state) {
  const scores = axisScores(
      data.axes.axes,
      data.questions.likert_questions,
      state.likert,
    ),
    ready = readiness(scores),
    { needs, alerts } = collectHardwareNeeds(
      data.questions.hardware_questions,
      state,
    ),
    total = data.axes.axes.reduce((s, a) => s + a.match_importance, 0);
  const ranked = data.distros.distros
    .map((d) => {
      const dist =
          data.axes.axes.reduce(
            (s, a) =>
              s + Math.abs(scores[a.id] - d.profile[a.id]) * a.match_importance,
            0,
          ) / total,
        pref = clamp(100 - dist),
        hw = hardwareScore(d, needs),
        complexity = classify(d, data.complexity_levels.levels, ready),
        base = hw === null ? pref : pref * 0.85 + hw * 0.15;
      return {
        distro: d,
        preferenceScore: pref,
        hardwareScore: hw,
        finalScore: clamp(base - complexity.penalty),
        complexity,
      };
    })
    .sort((a, b) => b.finalScore - a.finalScore);
  return { scores, readiness: ready, needs, alerts, ranked };
}
