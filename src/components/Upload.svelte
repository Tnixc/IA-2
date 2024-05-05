<script lang="ts">
  import { transcribe } from "../utils";
  import { transcription } from "../store";
  let msg_class = "";
  let msg = "";
  let audioFile: Blob;

  function handleFileInput(e) {
    const file: Blob = e.target.files[0];
    audioFile = file;
  }

  async function passTotranscribe() {
    const log = document.getElementById("log");
    log!.innerHTML = "";
    msg = "[/] Transcribing..";
    msg_class = "text-purple-500";
    const t = await transcribe(audioFile);
    if (t != undefined) {
      transcription.set(JSON.stringify(t));
      localStorage.setItem("transcription", JSON.stringify(t));
    } else {
      msg = "[!] Something went wrong";
    }
  }

  async function handleSubmit() {
    const log = document.getElementById("log");
    log!.innerHTML = "";
    if (!audioFile) {
      msg_class = "text-red-500";
      msg = "[!] Please select a file";
      return;
    }

    msg_class = "text-blue-500";
    msg = "[/] Loading...";

    const audioBuffer = await new AudioContext().decodeAudioData(
      await audioFile.arrayBuffer(),
    );
    const length = audioBuffer.duration;
    const size = audioFile.size;
    const type = audioFile.type;
    const name = audioFile.name;
    const lastModified = audioFile.lastModifiedDate;
    const uid = {
      name,
      length,
      lastModified,
      size,
      type,
    };

    const latest = localStorage.getItem("latest");
    if (latest == JSON.stringify(uid)) {
      const choice_class = "hover:underline";
      msg_class = "text-orange-500";
      msg = "[!] Looks like this is the same as the last file.";
      const accept = document.createElement("button");
      accept.innerText = "> continue anyway";
      accept.className = choice_class;

      const see = document.createElement("button");
      see.innerText = "> see the last transcription";
      see.className = choice_class;

      const stop = document.createElement("button");
      stop.innerText = "> cancel";
      stop.className = choice_class;

      stop.addEventListener("click", () => {
        window.location.reload();
      });

      see.addEventListener("click", () => {
        transcription.set(localStorage.getItem("transcription"));
      });

      accept.addEventListener("click", async () => await passTotranscribe());
      log?.appendChild(accept);
      log?.appendChild(see);
      log?.appendChild(stop);
    }

    if (latest != JSON.stringify(uid)) {
      localStorage.setItem("latest", JSON.stringify(uid));
      await passTotranscribe();
    }
  }
</script>

<main class="p-4">
  <form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-2">
    <input
      class="bg-zinc-50 block w-fit p-3 border"
      type="file"
      accept="audio/*"
      on:change={handleFileInput}
    />
    <button
      type="submit"
      class="w-fit p-3 px-8 border bg-zinc-50 hover:bg-zinc-200">Submit</button
    >
  </form>
  <p class={`py-2 ${msg_class}`}>{msg}</p>
  <pre class="w-fit flex flex-col items-start" id="log"></pre>
</main>
