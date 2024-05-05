<script lang="ts">
  import { transcription } from "../store";
  import Upload from "../components/Upload.svelte";
  import Result from "../components/Result.svelte";
  import { onMount } from "svelte";
  onMount(() => {
    transcription.subscribe((value) => {
      document.getElementById("upload")!.style.display = value
        ? "none"
        : "block";
      document.getElementById("result")!.style.display = value
        ? "block"
        : "none";
    });
  });
</script>

<div id="upload">
  <Upload />
</div>
<main id="result" class="hidden p-10"><Result /></main>
