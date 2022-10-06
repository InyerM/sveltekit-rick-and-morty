<script lang="ts">
  import '../styles/home.scss'
  import Card from '../components/common/Card.svelte'
	import type { character, characters } from 'src/types'
	import Loader from '../components/common/Loader.svelte'
  import { getRecentCharacters } from '../services/characterService'
  
  let characters: characters = []
  let error: string
  let loading = true

  async function getCharacters() {
    const recentCharacters = await getRecentCharacters()
    error = recentCharacters.error
    characters = recentCharacters.characters
    loading = false
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

  getCharacters()
</script>

<head>
  <title>Home</title>
</head>
<main class="page">
  <h1>Most recent characters</h1>
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