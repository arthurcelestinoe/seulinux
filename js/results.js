import { loadState, clearState } from "./storage.js";
import { rankDistros } from "./scoring.js";
import { hardwareWarnings } from "./hardware.js";
const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
export function initResults(root, data) {
  const state = loadState();
  if (
    Object.keys(state.likert).length < 50 ||
    Object.keys(state.hardware).length < 10
  ) {
    root.innerHTML = `<section class="error-card"><p class="section-kicker">Resultado incompleto</p><h1>Termine o teste primeiro.</h1><a class="button button-primary" href="teste.html">Continuar o teste</a></section>`;
    return;
  }
  const r = rankDistros(data, state),
    main = r.ranked.find((x) => x.complexity.status === "primary");
  if (!main) {
    root.innerHTML =
      '<section class="error-card"><h1>Nenhuma opção segura encontrada.</h1></section>';
    return;
  }
  const alternatives = diversify(
      r.ranked.filter(
        (x) =>
          x.distro.id !== main.distro.id &&
          ["primary", "alternative"].includes(x.complexity.status),
      ),
      main,
      4,
    ),
    future = r.ranked.find((x) => x.complexity.status === "future"),
    labels = Object.fromEntries(
      data.distros.hardware_dimensions.map((x) => [x.id, x.label]),
    ),
    warnings = [...r.alerts, ...hardwareWarnings(main.distro, r.needs, labels)];
  root.innerHTML = `<section class="result-hero"><p class="section-kicker">Seu perfil</p><h1>${summary(r.scores)}</h1><p>Prontidão para sistemas mais complexos: <strong>${Math.round(r.readiness)}/100</strong>.</p></section><section><p class="section-kicker">Recomendação principal</p>${mainCard(main, r, data)}</section><section class="axes-section"><div><p class="section-kicker">Como chegamos aqui</p><h2>Seu perfil em 17 eixos</h2><p>50 é o ponto neutro.</p></div><div class="axis-grid">${data.axes.axes.map((a) => `<div class="axis"><div><span>${esc(a.label)}</span><strong>${Math.round(r.scores[a.id])}</strong></div><progress value="${r.scores[a.id]}" max="100"></progress></div>`).join("")}</div></section><section><p class="section-kicker">Outros bons caminhos</p><h2>Alternativas com propostas diferentes</h2><div class="alternative-grid">${alternatives.map((x) => altCard(x, main)).join("")}</div></section>${future ? futureCard(future, r) : ""}${warnings.length ? `<section class="alerts"><p class="section-kicker">Antes de instalar</p><h2>Verificações importantes</h2><ul>${warnings.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></section>` : ""}<section class="result-actions"><a class="button button-secondary" href="teste.html">Rever respostas</a><button class="button button-ghost" id="reset-result">Apagar e recomeçar</button></section>`;
  root.querySelector("#reset-result").onclick = () => {
    if (confirm("Apagar todas as respostas?")) {
      clearState();
      location.href = "teste.html";
    }
  };
  root.focus();
}
function diversify(items, main, n) {
  const out = [],
    dist = new Set([main.distro.distribution]),
    fam = new Set();
  for (const x of items) {
    if (dist.has(x.distro.distribution) && out.length < 3) continue;
    if (!fam.has(x.distro.family) || out.length >= 2) {
      out.push(x);
      dist.add(x.distro.distribution);
      fam.add(x.distro.family);
    }
    if (out.length === n) break;
  }
  for (const x of items) {
    if (out.length === n) break;
    if (!out.includes(x)) out.push(x);
  }
  return out;
}
function mainCard(x, r, data) {
  const d = x.distro,
    reasons = [...data.axes.axes]
      .sort(
        (a, b) =>
          Math.abs(r.scores[a.id] - d.profile[a.id]) -
          Math.abs(r.scores[b.id] - d.profile[b.id]),
      )
      .slice(0, 3)
      .map((a) => a.label.toLowerCase());
  return `<article class="main-result"><div class="score-badge"><strong>${Math.round(x.finalScore)}%</strong><span>compatibilidade</span></div><div class="main-title"><span class="complexity-pill">${esc(x.complexity.level.label)}</span><h2>${esc(d.name)}</h2><p>${esc(d.distribution)} · ${esc(d.desktop)}</p></div><div class="recommendation-copy"><h3>Por que combina</h3><p>Seu perfil se aproxima desta opção em ${reasons.join(", ")}. Ela equilibra suas prioridades sem pedir autonomia além do que você indicou.</p></div><div class="pros-cons"><div><h3>Pontos fortes</h3><ul>${d.strengths.map((v) => `<li>${esc(v)}</li>`).join("")}</ul></div><div><h3>Concessões</h3><ul>${d.tradeoffs.map((v) => `<li>${esc(v)}</li>`).join("")}</ul></div></div><a class="button button-primary" href="${esc(d.official_url)}" target="_blank" rel="noopener">Visitar site oficial ↗</a></article>`;
}
function altCard(x, m) {
  const d = x.distro,
    type =
      d.complexity_level < m.distro.complexity_level
        ? "Mais simples"
        : d.release_model.includes("rolling")
          ? "Mais atual"
          : d.profile.stability > m.distro.profile.stability + 5
            ? "Mais conservadora"
            : d.profile.freshness > m.distro.profile.freshness + 5
              ? "Mais atual"
              : "Equilibrada";
  return `<article class="alternative-card"><div><span class="category-tag">${type}</span><span class="mini-score">${Math.round(x.finalScore)}%</span></div><h3>${esc(d.name)}</h3><p>${esc(d.distribution)} · ${esc(d.desktop)}</p><dl><dt>Vantagem</dt><dd>${esc(d.strengths[0])}</dd><dt>Concessão</dt><dd>${esc(d.tradeoffs[0])}</dd></dl><p class="score-diff">${Math.max(0, Math.round(m.finalScore - x.finalScore))} pontos abaixo da principal</p><a href="${esc(d.official_url)}" target="_blank" rel="noopener">Site oficial ↗</a></article>`;
}
function futureCard(x, r) {
  return `<section class="future-route"><div><p class="section-kicker">Rota futura</p><h2>${esc(x.distro.name)}</h2><p>Combina com parte do seu perfil, mas exige mais autonomia e manutenção do que suas respostas indicam hoje. Não é uma recomendação imediata.</p></div><div class="score-badge small"><strong>${Math.round(x.finalScore)}%</strong><span>potencial</span></div></section>`;
}
function summary(s) {
  const p = [];
  if (s.stability > 65) p.push("valoriza previsibilidade");
  if (s.freshness > 65) p.push("quer software recente");
  if (s.low_maintenance > 65) p.push("prefere pouca manutenção");
  if (s.traditional_desktop > 65) p.push("gosta de uma interface tradicional");
  else if (s.workflow_novelty > 65) p.push("aceita um fluxo diferente");
  if (s.desktop_customization > 65) p.push("quer personalizar a interface");
  if (!p.length)
    return "Você busca um sistema equilibrado, sem preferências extremas.";
  const last = p.pop();
  return `Você ${p.length ? p.join(", ") + " e " : ""}${last}.`;
}
