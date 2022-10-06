<script lang="ts">
  export let placeholder = "Search"
  export let onChange: (event: any) => Promise<void>
  export let onReset = () => {}
  import '../../styles/searchbox.scss'
</script>

<form class="form">
  <button>
    <i class='bx bx-search'></i>
  </button>
  <input class="input" placeholder={placeholder} type="text" on:input={onChange}>
  <button class="reset" type="reset" on:click={onReset}>
    <i class='bx bx-x'></i>
  </button>
</form>