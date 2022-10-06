<script lang="ts">
	import Card from '../../components/common/Card.svelte'
	import Loader from '../../components/common/Loader.svelte'
	import type { character, characters } from 'src/types'
  import '../../styles/home.scss'

  let loading = true, error: string, characters: characters = []

  if (typeof window !== 'undefined') {
    const favoriteCharacters = JSON.parse(localStorage.getItem('favoriteCharacters') as string) || []
    if(favoriteCharacters.length === 0) {
      loading = false
      error = 'No characters found'
    } else {
      loading = false
      characters = favoriteCharacters
    }
  }

  async function handleFavorite (character: character){
    const favoriteCharacters = JSON.parse(localStorage.getItem('favoriteCharacters') as string) || []
    const isFavorite = favoriteCharacters.find((favoriteCharacter: character) => favoriteCharacter.id === character.id)
    if(isFavorite) {
      const newFavoriteCharacters = favoriteCharacters.filter((favoriteCharacter: character) => favoriteCharacter.id !== character.id)
      localStorage.setItem('favoriteCharacters', JSON.stringify(newFavoriteCharacters))
    } else {
      favoriteCharacters.push(character)
      localStorage.setItem('favoriteCharacters', JSON.stringify(favoriteCharacters))
    }
  }
</script>

<head>
  <title>Favorites</title>
</head>
<main class="page">
  <h1>Favorites</h1>
  {#if loading}
    <Loader className='mt'/>
  {:else if error}
    <p>Something went wrong</p>
  {:else}
    <div class="cards">
      {#each characters as character}
        <Card character={character} handleFavorite={handleFavorite}/>
      {/each}
    </div>
  {/if}
</main>