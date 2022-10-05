<script lang="ts">
  import type { character } from '../../types'
  export let character: character
  export let handleFavorite: (character: character) => void

  function handleFavoriteClick() {
    handleFavorite(character)
    character.favorite = !character.favorite
  }

  const favoriteCharacters = JSON.parse(localStorage.getItem('favoriteCharacters') as string) || []
  const favoriteCharacter = favoriteCharacters.find((favoriteCharacter: any) => favoriteCharacter.id === character.id)
  if(favoriteCharacter) {
    character.favorite = true
  }
</script>

<div class="card">
  <h1 class="card__title">{character.name}</h1>
  <img class="card__image" src={character.image} alt={character.name} />
  <a class="card__location" href={character.location.url}><i class='bx bx-map'></i> {character.location.name}</a>
  <p class={`card__gender ${character.gender === 'Female' ? 'gender_pink' : character.gender === 'Male' ? 'gender_blue' : 'gender_gray'}`}>
    {
      #if character.gender === 'Female'
    }
    <i class='bx bx-female-sign'></i>
    {
      :else if character.gender === 'Male'
    }
    <i class='bx bx-male-sign'></i>
    {
      :else
    }<i class='bx bxs-lock-alt'></i>
    {
      /if
    }
    {character.gender}</p>
  <p class={`${character.status === 'Alive' ? 'status_green' : character.status === 'Dead' ? 'status_red' : 'status_gray'} card__status`}>{character.status} - {character.species}</p>
  <a class="card__link" href={`/characters/${character.id}`}>More info</a>
  <button class="favorite" on:click={() => handleFavoriteClick()}>
    {#if character?.favorite}
      <label for="checkbox" class="favorite__label"><i class='bx bxs-heart'></i></label>
    {:else}
      <label for="checkbox" class="favorite__label"><i class='bx bx-heart'></i></label>
    {/if}
  </button>
</div>