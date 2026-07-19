import { loadState, saveState, clearState } from "./storage.js";
const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
export function initQuestionnaire(root, data) {
  const state = loadState(),
    steps = [
      ...data.questions.sections,
      { id: "hardware", title: "Seu computador" },
    ];
  state.step = Math.min(state.step, steps.length - 1);
  function render() {
    const step = steps[state.step],
      hw = step.id === "hardware",
      qs = hw
        ? data.questions.hardware_questions
        : step.question_ids.map((id) =>
            data.questions.likert_questions.find((q) => q.id === id),
          );
    root.innerHTML = `<section class="quiz-head"><p class="section-kicker">${hw ? "Etapa final" : `Preferências · ${state.step + 1} de ${steps.length - 1}`}</p><h1>${esc(step.title)}</h1><div class="progress-row"><progress value="${state.step + 1}" max="${steps.length}"></progress><span>${Math.round(((state.step + 1) / steps.length) * 100)}%</span></div><p>${hw ? "Estas respostas ajustam a recomendação ao equipamento que você usa." : "Indique quanto cada afirmação combina com você. “Não sei” é uma resposta válida."}</p></section><form novalidate><div class="question-list">${qs.map((q, i) => (hw ? hardware(q, i, state) : likert(q, i, state, data.questions.scale))).join("")}</div><p class="form-error" id="form-error" role="alert" hidden>Responda todas as perguntas desta etapa — “Não sei” é uma opção válida.</p><div class="quiz-actions"><button class="button button-secondary" type="button" id="previous" ${state.step === 0 ? "disabled" : ""}>← Anterior</button><button class="button button-primary" type="submit">${state.step === steps.length - 1 ? "Ver meu resultado →" : "Próximo →"}</button></div></form>`;
    bind(root, qs, hw, state, steps, render);
    root.focus();
  }
  document.querySelector("#restart-button")?.addEventListener("click", () => {
    if (confirm("Apagar todas as respostas e recomeçar?")) {
      clearState();
      location.reload();
    }
  });
  render();
}
function likert(q, i, s, scale) {
  const has = Object.hasOwn(s.likert, q.id),
    cur = s.likert[q.id];
  return `<fieldset class="question-card"><legend><span>${String(i + 1).padStart(2, "0")}</span>${esc(q.text)}</legend><div class="scale-options">${[0, 1, 2, 3, 4, 5].map((v) => `<label title="${esc(scale[v])}"><input type="radio" name="q_${q.id}" value="${v}" ${has && cur === v ? "checked" : ""}><span class="scale-number">${v}</span><span class="scale-label">${esc(scale[v])}</span></label>`).join("")}<label class="unknown-option"><input type="radio" name="q_${q.id}" value="unknown" ${has && cur === null ? "checked" : ""}><span class="scale-number">?</span><span class="scale-label">Não sei</span></label></div></fieldset>`;
}
function hardware(q, i, s) {
  const cur = s.hardware[q.id],
    f = q.on_yes?.follow_up;
  return `<fieldset class="question-card"><legend><span>${String(i + 1).padStart(2, "0")}</span>${esc(q.text)}</legend><div class="yesno-options">${[
    ["yes", "Sim"],
    ["no", "Não"],
    ["unknown", "Não sei"],
  ]
    .map(
      ([v, l]) =>
        `<label><input type="radio" name="q_${q.id}" value="${v}" ${cur === v ? "checked" : ""}><span>${l}</span></label>`,
    )
    .join(
      "",
    )}</div>${f ? `<div class="follow-up" data-follow="${q.id}" ${cur !== "yes" ? "hidden" : ""}><label for="${f.id}">${esc(f.label)}</label><input id="${f.id}" type="text" value="${esc(s.details[f.id] || "")}"></div>` : ""}</fieldset>`;
}
function bind(root, qs, hw, s, steps, render) {
  root.querySelectorAll("input[type=radio]").forEach((el) =>
    el.addEventListener("change", (e) => {
      const id = e.target.name.slice(2);
      if (hw) {
        s.hardware[id] = e.target.value;
        root
          .querySelector(`[data-follow="${id}"]`)
          ?.toggleAttribute("hidden", e.target.value !== "yes");
      } else
        s.likert[id] =
          e.target.value === "unknown" ? null : Number(e.target.value);
      saveState(s);
    }),
  );
  root.querySelectorAll(".follow-up input").forEach((el) =>
    el.addEventListener("input", (e) => {
      s.details[e.target.id] = e.target.value;
      saveState(s);
    }),
  );
  root.querySelector("#previous").onclick = () => {
    s.step--;
    saveState(s);
    render();
  };
  root.querySelector("form").onsubmit = (e) => {
    e.preventDefault();
    const store = hw ? s.hardware : s.likert,
      missing = qs.find((q) => !Object.hasOwn(store, q.id)),
      detailMissing =
        hw &&
        qs.find(
          (q) =>
            q.on_yes?.follow_up &&
            store[q.id] === "yes" &&
            !s.details[q.on_yes.follow_up.id]?.trim(),
        );
    if (missing || detailMissing) {
      root.querySelector("#form-error").hidden = false;
      (missing
        ? root.querySelector(`input[name="q_${missing.id}"]`)
        : root.querySelector(`#${detailMissing.on_yes.follow_up.id}`)
      )?.focus();
      return;
    }
    if (s.step === steps.length - 1) {
      saveState(s);
      location.href = "resultado.html";
    } else {
      s.step++;
      saveState(s);
      render();
    }
  };
}
