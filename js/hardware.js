export function collectHardwareNeeds(qs, s) {
  const needs = {},
    alerts = [];
  qs.forEach((q) => {
    const a = s.hardware[q.id];
    if (a === "yes") {
      Object.entries(q.on_yes?.needs || {}).forEach(
        ([id, w]) => (needs[id] = (needs[id] || 0) + w),
      );
      alerts.push(...(q.on_yes?.alerts || []));
    } else if (a === "unknown") alerts.push(...(q.on_unknown?.alerts || []));
  });
  return { needs, alerts };
}
export function hardwareScore(d, needs) {
  const es = Object.entries(needs);
  if (!es.length) return null;
  const total = es.reduce((s, [, w]) => s + w, 0);
  return es.reduce((s, [id, w]) => s + d.hardware[id] * w, 0) / total;
}
export function hardwareWarnings(d, needs, labels) {
  return Object.keys(needs)
    .filter((id) => d.hardware[id] < 65)
    .map(
      (id) =>
        `${labels[id]} merece atenção nesta opção (${d.hardware[id]}/100).`,
    );
}
