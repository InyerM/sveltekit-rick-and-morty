import { c as create_ssr_component, b as escape, d as add_attribute } from "./index.js";
import axios from "axios";
const home = "";
const Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { character } = $$props;
  if ($$props.character === void 0 && $$bindings.character && character !== void 0)
    $$bindings.character(character);
  return `<div class="${"card"}"><h1 class="${"card__title"}">${escape(character.name)}</h1>
  <img class="${"card__image"}"${add_attribute("src", character.image, 0)}${add_attribute("alt", character.name, 0)}>
  <a class="${"card__location"}"${add_attribute("href", character.location.url, 0)}><i class="${"bx bx-map"}"></i> ${escape(character.location.name)}</a>
  <p${add_attribute(
    "class",
    `card__gender ${character.gender === "Female" ? "gender_pink" : character.gender === "Male" ? "gender_blue" : "gender_gray"}`,
    0
  )}>${character.gender === "Female" ? `<i class="${"bx bx-female-sign"}"></i>` : `${character.gender === "Male" ? `<i class="${"bx bx-male-sign"}"></i>` : `<i class="${"bx bxs-lock-alt"}"></i>`}`}
    ${escape(character.gender)}</p>
  <p${add_attribute(
    "class",
    `${character.status === "Alive" ? "status_green" : character.status === "Dead" ? "status_red" : "status_gray"} card__status`,
    0
  )}>${escape(character.status)} - ${escape(character.species)}</p>
  <a class="${"card__link"}"${add_attribute("href", character.url, 0)}>More info</a></div>`;
});
const loader = "";
const Loader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  return `<div${add_attribute("class", `loader ${className}`, 0)}><div class="${"circle"}"></div></div>`;
});
const baseUrl = "https://rickandmortyapi.com/api";
const getRecentCharacters = async () => {
  var _a;
  let error, characters;
  try {
    const { data } = await axios.get(`${baseUrl}/character?page=42`);
    characters = (_a = data.results) == null ? void 0 : _a.slice(0, 10);
  } catch (err) {
    error = err.message || "Something went wrong";
  }
  return {
    characters,
    error
  };
};
const getCharacters = async (page) => {
  let error, characters;
  try {
    const { data } = await axios.get(`${baseUrl}/character?page=${page}`);
    characters = data.results;
  } catch (err) {
    error = err.message || "Something went wrong";
  }
  return {
    characters,
    error
  };
};
export {
  Card as C,
  Loader as L,
  getCharacters as a,
  getRecentCharacters as g
};
