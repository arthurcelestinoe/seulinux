export const readiness = (s) =>
  0.5 * s.technical_autonomy +
  0.3 * s.learning_interest +
  0.2 * (100 - s.low_maintenance);
export function classify(d, levels, r) {
  const l = levels.find((x) => x.id === d.complexity_level),
    pen =
      Math.max(0, l.primary_min_readiness - r) *
      l.below_primary_penalty_per_point;
  if (r >= l.primary_min_readiness)
    return { status: "primary", level: l, penalty: 0 };
  if (r >= l.alternative_min_readiness)
    return { status: "alternative", level: l, penalty: pen };
  if (r >= l.future_route_min_readiness)
    return { status: "future", level: l, penalty: pen };
  return { status: "hidden", level: l, penalty: pen };
}
