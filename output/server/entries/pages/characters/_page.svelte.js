import { c as create_ssr_component, v as validate_component, d as add_attribute, e as each, b as escape } from "../../../chunks/index.js";
import { a as getCharacters, L as Loader, C as Card } from "../../../chunks/characterService.js";
const characters = "";
let pages = 42;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let characters2 = [];
  let error;
  let loading = true;
  let page = 1;
  let currentPages = [1, 2, 3, 4, 5];
  async function getAllCharacters() {
    const recentCharacters = await getCharacters(page);
    error = recentCharacters.error;
    characters2 = recentCharacters.characters;
    loading = false;
  }
  function isOnCurrentPages(currentPage) {
    return currentPages.includes(currentPage);
  }
  getAllCharacters();
  return `<main class="${"page"}"><h1>All characters</h1>
  ${loading ? `${validate_component(Loader, "Loader").$$render($$result, { className: "mt" }, {}, {})}` : `${error ? `<p>Something went wrong</p>` : `
    <div class="${"character-pagination"}"><button${add_attribute("class", `${"disabled"}`, 0)} ${"disabled"}><i class="${"bx bxs-chevron-left"}"></i></button>
      ${each(currentPages, (currentPage) => {
    return `<button${add_attribute("class", `${page === currentPage && "active"}`, 0)}>${escape(currentPage)}</button>`;
  })}
      ${!isOnCurrentPages(pages) ? `<p>...</p>
        <button${add_attribute("class", `${pages === page}`, 0)}>${escape(pages)}</button>` : ``}
      <button${add_attribute("class", `${page === pages}`, 0)} ${""}><i class="${"bx bxs-chevron-right"}"></i></button></div>
    <div class="${"cards"}">${each(characters2, (character) => {
    return `${validate_component(Card, "Card").$$render($$result, { character }, {}, {})}`;
  })}</div>`}`}</main>`;
});
export {
  Page as default
};
