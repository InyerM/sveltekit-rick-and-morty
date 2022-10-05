<script lang="ts">
  import type { character, episode } from '../../types'
  export let character: character
  export let episodes: episode[]
  export let handleFavorite: () => void

  const favoriteCharacters = JSON.parse(localStorage.getItem('favoriteCharacters') as string) || []
  const favoriteCharacter = favoriteCharacters.find((favoriteCharacter: any) => favoriteCharacter.id === character.id)
  if(favoriteCharacter) {
    character.favorite = true
  }
</script>

<div class="character_card">
  <h1 class="card__title">{character?.name}</h1>
  <img class="card__image" src={character?.image} alt={character?.name} />
  <div class="card__info">
    <p class="card__location"><i class='bx bx-map'></i> Location ~ {character?.location.name}</p>
    <p class="card__location"><i class='bx bx-map'></i> Origin ~ {character?.origin.name}</p>
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
  </div>
  <div class="episodes">
    <h2 class="title">Episodes</h2>
    <ul class="list">
      {#if episodes && episodes.length > 0}
        {#each episodes as episode}
          <li>
            <p class="item">{episode.name}</p>
            <p class="date">Air date ~ {episode.air_date}</p>
          </li>
        {/each}
      {:else}
        <p class="item">No episodes</p>
      {/if}
    </ul>
  </div>
  <button class="favorite" on:click={handleFavorite}>
    {#if character?.favorite}
      <label for="checkbox" class="favorite__label"><i class='bx bxs-heart'></i></label>
    {:else}
      <label for="checkbox" class="favorite__label"><i class='bx bx-heart'></i></label>
    {/if}
  </button>
</div>