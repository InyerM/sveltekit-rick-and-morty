<script lang="ts">
  import { page } from '$app/stores'
	import CharacterCard from '../../../components/common/CharacterCard.svelte';
	import Loader from '../../../components/common/Loader.svelte';
	import type { character, episode } from 'src/types';
  import { getCharacter } from '../../../services/characterService'
  import '../../../styles/home.scss'

  let character: character
  let episodes: episode[] = []
  let error: string
  let loading = true

  async function getCharacterData() {
    const characterData = await getCharacter(Number($page.params.slug))
    error = characterData.error
    character = characterData.character
    loading = false
    episodes = characterData.episodes
  }

  async function handleFavorite() {
    character.favorite = !character.favorite
    const favoriteCharacters = JSON.parse(localStorage.getItem('favoriteCharacters') as string) || []
    if(character.favorite) {
      favoriteCharacters.push(character)
    } else {
      const index = favoriteCharacters.findIndex((favoriteCharacter: any) => favoriteCharacter.id === character.id)
      favoriteCharacters.splice(index, 1)
    }
    localStorage.setItem('favoriteCharacters', JSON.stringify(favoriteCharacters))
  }

  getCharacterData()
</script>

<head>
  <title>{character?.name}</title>
</head>
<main class="page">
  {#if loading}
    <Loader className='mt'/>
  {:else if error}
    <p>Something went wrong</p>
    <span>{error}</span>
  {:else}
    <CharacterCard character={character} episodes={episodes} handleFavorite={handleFavorite}/>
  {/if}
</main>
