<script lang="ts">
	import Card from "../../components/common/Card.svelte";
	import Loader from "../../components/common/Loader.svelte";
	import type { character, characters } from "../../types";
	import SearchBox from "../../components/common/SearchBox.svelte"
  import { searchCharacters } from "../../services/characterService"
  import '../../styles/home.scss'
  import '../../styles/characters.scss'

  let characters: characters = []
  let error: string
  let loading = true
  let currentPage = 1
  let pages = 42
  let isNextDisabled = false
  let isPrevDisabled = true
  let currentPages = [1, 2]
  let search = ''
  let filter = ['', '', '']
  let count = 0
  let status: number

  async function getAllCharacters() {
    const recentCharacters = await searchCharacters(currentPage, search, filter)
    error = recentCharacters.error
    count = recentCharacters.info?.count
    status = recentCharacters.status
    characters = recentCharacters.characters
    pages = recentCharacters.info?.pages
    if(pages === 1){
      currentPages = [1]
    }
    if(pages === 2){
      currentPages = [1, 2]
    }
    loading = false
  }

  async function handleSearchChange(event: any) {
    search = event.target.value
    loading = true
    currentPage = 1
    currentPages = [1, 2]
    await getAllCharacters()
  }

  async function handleNextPage() {
    currentPage++
    loading = true
    setTimeout(async () => {
      await getAllCharacters();
      if(currentPage === pages) {
        isNextDisabled = true
      }
      if(currentPage > 1) {
        isPrevDisabled = false
      }
      if(isLastOfCurrentPages(currentPage)) {
        currentPages = currentPages.map(page => page + 1)
      }
    }, 500)
  }

  async function handlePreviousPage() {
    currentPage--
    loading = true
    setTimeout(async () => {
      await getAllCharacters();
      if(currentPage === 1) {
        isPrevDisabled = true
      }
      if(currentPage < pages) {
        isNextDisabled = false
      }
      if(isFirstOfCurrentPages(currentPage)){
        currentPages = currentPages.map((page) => page - 1)
      }
    }, 500)
  }

  async function handlePage(page: number) {
    currentPage = page
    loading = true
    setTimeout(async () => {
      await getAllCharacters();
      if(page === 1) {
        isPrevDisabled = true
      } else {
        isPrevDisabled = false
      }
      if(page < pages) {
        isNextDisabled = false
      } else {
        isNextDisabled = true
      }
      if (isLastOfCurrentPages(page)) {
        currentPages = currentPages.map((page) => page + 1)
      }
      if (isFirstOfCurrentPages(page)) {
        currentPages = currentPages.map((page) => page - 1)
      }
      if(page === pages) {
        currentPages = [pages - 1, pages]
      }
      if(page === 1) {
        currentPages = [1, 2, 3, 4, 5]
      }
    }, 500)
  }

  function isLastOfCurrentPages(currentPage: number) {
    return currentPage === currentPages[currentPages.length - 1] && currentPage < pages
  }

  function isFirstOfCurrentPages(currentPage: number) {
    return currentPage + 1 === currentPages[0]
  }

  function isOnCurrentPages(currentPage: number) {
    return currentPages.includes(currentPage)
  }

  async function onReset () {
    search = ''
    loading = true
    currentPage = 1
    currentPages = [1, 2, 3, 4, 5]
    await getAllCharacters()
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

  async function handleFilter (event: any) {
    const { target } = event
    const { value } = target
    loading = true
    
    if(target?.id === 'status') filter[0] = value
    else if(target?.id === 'gender') filter[1] = value
    else if(target?.id === 'species') filter[2] = value

    await getAllCharacters()
  }

  getAllCharacters()
</script>

<head>
  <title>Characters</title>
</head>
<main class="page">
  <h1>Search characters</h1>
  <SearchBox placeholder="Search characters" onChange={handleSearchChange} onReset={onReset}/>
  <div class="filter">
    <div class="filter_status">
      <label for="status">Status</label>
      <select on:input={handleFilter} value={filter[0]} id="status">
        <option value="">All</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
    </div>
    <div class="filter_gender">
      <label for="gender">Gender</label>
      <select on:input={handleFilter} value={filter[1]} id="gender">
        <option value="">All</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="genderless">Genderless</option>
        <option value="unknown">Unknown</option>
      </select>
    </div>
    <div class="filter_species">
      <label for="species">Species</label>
      <select on:input={handleFilter} value={filter[2]} id="species">
        <option value="">All</option>
        <option value="human">Human</option>
        <option value="alien">Alien</option>
        <option value="humanoid">Humanoid</option>
        <option value="poopybutthole">Poopybutthole</option>
        <option value="mythological">Mythological</option>
        <option value="animal">Animal</option>
        <option value="robot">Robot</option>
        <option value="cronenberg">Cronenberg</option>
        <option value="disease">Disease</option>
        <option value="parasite">Parasite</option>
        <option value="unknown">Unknown</option>
      </select>
    </div>
  </div>
  {#if characters}
  <div class="count">
    <span>Showing {count} characters</span>
  </div>
  {/if}
  {#if loading}
    <Loader className="mt" />
  {:else if error}
    {#if status === 404}
      <div class="error">
        <h2>Not found</h2>
        <p>There are no characters with the name {search}</p>
      </div>
    {:else}
      <div class="error">
        <h2>Oops!</h2>
        <p>Something went wrong</p>
      </div>
    {/if}
  {:else}
    <div class="character-pagination">
      <button on:click={handlePreviousPage} class={`${currentPage === 1 && 'disabled'}`} disabled={isPrevDisabled}><i class='bx bxs-chevron-left'></i></button>
      {#if currentPage > 1 && !isOnCurrentPages(1)}
      <button on:click={() => handlePage(1)} class={`${1 === currentPage && 'active'}`}>1</button>
      <p>...</p>
      {/if}
      {#each currentPages as page}
        <button on:click={() => handlePage(page)} class={`${page === currentPage && 'active'}`}>{page}</button>
      {/each}
      {#if currentPage < pages - 1 && !isOnCurrentPages(pages)}
        <p>...</p>
        <button on:click={() => handlePage(pages)} class={`${pages === currentPage && 'active'}`}>{pages}</button>
      {/if}
      <button on:click={handleNextPage} class={`${currentPage === pages && 'disabled'}`} disabled={isNextDisabled}><i class='bx bxs-chevron-right'></i></button>
    </div>
    <div class="cards">
      {#each characters as character}
        <Card character={character} handleFavorite={handleFavorite}/>
      {/each}
    </div>
  {/if}
</main>