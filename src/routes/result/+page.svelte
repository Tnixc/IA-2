<script>
  import { onMount } from "svelte";
  onMount(() => {
    const t = localStorage.getItem("transcription");
    console.log(t);
  });
</script>

<h1>res</h1>
