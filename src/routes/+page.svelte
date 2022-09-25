<script lang="ts">
  import '../styles/home.scss'
  import Card from '../components/common/Card.svelte'
	import type { characters } from 'src/types'
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

  getCharacters()
</script>

<main class="page">
  <h1>Most recent characters</h1>
  {#if loading}
    <Loader className='mt'/>
  {:else if error}
    <p>Something went wrong</p>
  {:else}
    <div class="cards">
      {#each characters as character}
        <Card character={character} />
      {/each}
    </div>
  {/if}
</main>