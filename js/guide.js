const input = document.querySelector("#distro-search");
const cards = [...document.querySelectorAll("[data-distro]")];
const status = document.querySelector("#distro-search-status");
const emptyState = document.querySelector("#no-guide-results");
const normalize = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
function filterDistros() {
  const query = normalize(input.value);
  let count = 0;
  cards.forEach((card) => {
    const matches =
      !query ||
      normalize(`${card.dataset.distro} ${card.textContent}`).includes(query);
    card.hidden = !matches;
    if (matches) count += 1;
  });
  emptyState.hidden = count !== 0;
  status.textContent = query
    ? `${count} ${count === 1 ? "distribuição encontrada" : "distribuições encontradas"}.`
    : `${cards.length} distribuições no guia.`;
}
input.addEventListener("input", filterDistros);
filterDistros();
