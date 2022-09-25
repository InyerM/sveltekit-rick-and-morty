<script lang="ts">
  import '../../styles/home.scss'
  import '../../styles/characters.scss'
  import Card from '../../components/common/Card.svelte'
	import type { characters } from 'src/types'
	import Loader from '../../components/common/Loader.svelte'
  import { getCharacters } from '../../services/characterService'
  
  let characters: characters = []
  let error: string
  let loading = true
  let page = 1
  let pages = 42
  let isNextDisabled = false
  let isPrevDisabled = true
  let currentPages = [1, 2, 3, 4, 5]

  async function getAllCharacters() {
    const recentCharacters = await getCharacters(page)
    error = recentCharacters.error
    characters = recentCharacters.characters
    loading = false
  }

  async function handleNextPage() {
    page++
    loading = true
    setTimeout(async () => {
      await getAllCharacters();
      if(page === pages) {
        isNextDisabled = true
      }
      if(page > 1) {
        isPrevDisabled = false
      }
      if(isLastOfCurrentPages(page)) {
        currentPages = currentPages.map(page => page + 1)
      }
    }, 500)
  }

  async function handlePreviousPage() {
    page--
    loading = true
    setTimeout(async () => {
      await getAllCharacters();
      if(page === 1) {
        isPrevDisabled = true
      }
      if(page < pages) {
        isNextDisabled = false
      }
      if(isFirstOfCurrentPages(page)){
        currentPages = currentPages.map((page) => page - 1)
      }
    }, 500)
  }

  async function handlePage(currentPage: number) {
    page = currentPage
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
        currentPages = [pages - 4, pages - 3, pages - 2, pages - 1, pages]
      }
    }, 500)
  }

  function isLastOfCurrentPages(currentPage: number) {
    return currentPage === currentPages[currentPages.length - 1] && currentPage < pages
  }

  function isFirstOfCurrentPages(currentPage: number) {
    return currentPage + 1 === currentPages[0] && currentPage !== 1
  }

  function isOnCurrentPages(currentPage: number) {
    return currentPages.includes(currentPage)
  }

  getAllCharacters()
</script>

<main class="page">
  <h1>All characters</h1>
  {#if loading}
    <Loader className='mt'/>
  {:else if error}
    <p>Something went wrong</p>
  {:else}
    <!-- <div class="pagination">
      <button on:click={handlePreviousPage} class={`${page === 1 && 'disabled'}`} disabled={isPrevDisabled}>⬅️ Previous</button>
      <button on:click={handleNextPage} class={`${page === pages && 'disabled'}`} disabled={isNextDisabled}>Next ➡️</button>
    </div> -->
    <div class="character-pagination">
      <button on:click={handlePreviousPage} class={`${page === 1 && 'disabled'}`} disabled={isPrevDisabled}><i class='bx bxs-chevron-left'></i></button>
      {#each currentPages as currentPage}
        <button on:click={() => handlePage(currentPage)} class={`${page === currentPage && 'active'}`}>{currentPage}</button>
      {/each}
      {#if page < pages - 1 && !isOnCurrentPages(pages)}
        <p>...</p>
        <button on:click={() => handlePage(pages)} class={`${pages === page && 'active'}`}>{pages}</button>
      {/if}
      <button on:click={handleNextPage} class={`${page === pages && 'disabled'}`} disabled={isNextDisabled}><i class='bx bxs-chevron-right'></i></button>
    </div>
    <div class="cards">
      {#each characters as character}
        <Card character={character} />
      {/each}
    </div>
  {/if}
</main>