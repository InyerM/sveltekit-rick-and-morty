import { c as create_ssr_component, v as validate_component, e as each } from "../../chunks/index.js";
import { g as getRecentCharacters, L as Loader, C as Card } from "../../chunks/characterService.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let characters = [];
  let error;
  let loading = true;
  async function getCharacters() {
    const recentCharacters = await getRecentCharacters();
    error = recentCharacters.error;
    characters = recentCharacters.characters;
    loading = false;
  }
  getCharacters();
  return `<main class="${"page"}"><h1>Most recent characters</h1>
  ${loading ? `${validate_component(Loader, "Loader").$$render($$result, { className: "mt" }, {}, {})}` : `${error ? `<p>Something went wrong</p>` : `<div class="${"cards"}">${each(characters, (character) => {
    return `${validate_component(Card, "Card").$$render($$result, { character }, {}, {})}`;
  })}</div>`}`}</main>`;
});
export {
  Page as default
};
