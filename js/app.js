import { loadData, renderLoadError } from "./data-loader.js";
import { initQuestionnaire } from "./questionnaire.js";
import { initResults } from "./results.js";
const root = document.querySelector("#app");
try {
  const d = await loadData();
  document.body.dataset.page === "questionnaire"
    ? initQuestionnaire(root, d)
    : initResults(root, d);
} catch (e) {
  renderLoadError(root, e);
}
