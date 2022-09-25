<script lang="ts">
  import '../../styles/loader.scss'
  export let className: string
</script>

<div class={`loader ${className}`}>
  <div class="circle"></div>
</div>