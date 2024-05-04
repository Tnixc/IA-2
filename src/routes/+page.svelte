<script lang="ts">
  import { transcribe } from "../utils";
  let audioFile: Blob;

  function handleFileInput(e) {
    const file: Blob = e.target.files[0];
    audioFile = file;
  }

  async function handleSubmit() {
    if (!audioFile) {
      return;
    }

    // Read audio file duration
    const audioContext = new AudioContext();
    transcribe(audioFile);
    const audioBuffer = await audioContext.decodeAudioData(
      await audioFile.arrayBuffer(),
    );
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <label>
    Select an audio file:
    <input type="file" accept="audio/*" on:change={handleFileInput} />
  </label>
  <button type="submit">Submit</button>
</form>
