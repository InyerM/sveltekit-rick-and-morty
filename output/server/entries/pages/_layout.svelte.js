import { c as create_ssr_component, v as validate_component } from "../../chunks/index.js";
const header = "";
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<header class="${"header"}"><a class="${"header_title"}" href="${"/"}">Rick &amp; Morty</a>
  <nav class="${"header_nav"}"><a href="${"/"}" class="${"header_nav-link"}">Home</a>
    <a href="${"/characters"}" class="${"header_nav-link"}">Characters</a>
    <a href="${"/episodes"}" class="${"header_nav-link"}">Episodes</a>
    <a href="${"/locations"}" class="${"header_nav-link"}">Locations</a></nav></header>`;
});
const globals = "";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Header, "Header").$$render($$result, {}, {}, {})}
${slots.default ? slots.default({}) : `
`}`;
});
export {
  Layout as default
};
