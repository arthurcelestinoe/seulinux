const searchInput = document.querySelector("#term-search");
const termCards = [...document.querySelectorAll("[data-term]")];
const groups = [...document.querySelectorAll("[data-group]")];
const status = document.querySelector("#search-status");
const emptyState = document.querySelector("#no-term-results");

const normalize = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

function filterTerms() {
  const query = normalize(searchInput.value);
  let visibleCount = 0;

  termCards.forEach((card) => {
    const searchableText = normalize(
      `${card.dataset.term} ${card.textContent}`,
    );
    const matches = !query || searchableText.includes(query);
    card.hidden = !matches;
    if (matches) visibleCount += 1;
  });

  groups.forEach((group) => {
    const hasVisibleTerm = [...group.querySelectorAll("[data-term]")].some(
      (card) => !card.hidden,
    );
    group.hidden = !hasVisibleTerm;
  });

  emptyState.hidden = visibleCount !== 0;
  status.textContent = query
    ? `${visibleCount} ${visibleCount === 1 ? "termo encontrado" : "termos encontrados"}.`
    : `${termCards.length} termos disponíveis.`;
}

searchInput.addEventListener("input", filterTerms);
filterTerms();
