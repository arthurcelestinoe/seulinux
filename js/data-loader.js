const FILES = ["axes", "questions", "distros", "complexity-levels"];
export async function loadData() {
  const pairs = await Promise.all(
    FILES.map(async (n) => {
      const r = await fetch(`data/${n}.json`);
      if (!r.ok)
        throw Error(`Não foi possível carregar data/${n}.json (${r.status}).`);
      return [n.replace("-", "_"), await r.json()];
    }),
  );
  const d = Object.fromEntries(pairs);
  validate(d);
  return d;
}
function validate({ axes, questions, distros, complexity_levels: l }) {
  if (!questions.likert_questions?.length)
    throw Error("O arquivo não contém afirmações.");
  const ai = new Set(axes.axes?.map((a) => a.id)),
    li = new Set(l.levels?.map((x) => x.id)),
    hi = new Set(distros.hardware_dimensions?.map((x) => x.id));
  questions.likert_questions.forEach((q) =>
    Object.keys(q.weights || {}).forEach((id) => {
      if (!ai.has(id))
        throw Error(`A pergunta ${q.id} usa o eixo desconhecido “${id}”.`);
    }),
  );
  distros.distros.forEach((d) => {
    if (!li.has(d.complexity_level))
      throw Error(`${d.name} não possui nível de complexidade válido.`);
    if ([...ai].some((id) => !valid(d.profile?.[id])))
      throw Error(`${d.name} possui perfil incompleto ou inválido.`);
    if ([...hi].some((id) => !valid(d.hardware?.[id])))
      throw Error(`${d.name} possui dados de hardware incompletos.`);
  });
}
const valid = (v) => Number.isFinite(v) && v >= 0 && v <= 100,
  esc = (s) =>
    String(s).replace(
      /[&<>]/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c],
    );
export function renderLoadError(root, e) {
  console.error(e);
  root.innerHTML = `<section class="error-card" role="alert"><p class="section-kicker">Falha ao carregar</p><h1>Os dados não abriram.</h1><p>${esc(e.message)}</p><p>Execute o projeto por um servidor HTTP local.</p><a class="button button-primary" href="index.html">Voltar ao início</a></section>`;
}
