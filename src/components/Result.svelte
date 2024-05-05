<script>
  import { writable, get } from "svelte/store";
  import { transcription } from "../store";
  import { onMount } from "svelte";
  const segments = writable([]);
  transcription.subscribe((v) => {
    if (v) {
      segments.set(JSON.parse(v).segments);
    }
  });
  let uid = {};
  onMount(() => {
    if (localStorage.getItem("latest") != null) {
      uid = JSON.parse(localStorage.getItem("latest"));
    }
  });
  const terms = writable([]);
  onMount(() => {
    terms.subscribe(() => {
      for (let element of document.getElementsByClassName("text")) {
        element.classList.remove("bg-amber-100/50");
        element.innerHTML = element.innerHTML
          .replaceAll('<span class="bg-amber-500/80">', "")
          .replaceAll("</span>", "");
        for (let term of get(terms)) {
          element.innerHTML = element.innerHTML.replace(
            new RegExp(term, "gi"),
            `<span class="bg-amber-500/80">${term}</span>`,
          );
          if (element.innerHTML.includes(term)) {
            element.classList.add("bg-amber-100/50");
          }
        }
      }
    });
  });
</script>

<div class="flex flex-col gap-2">
  <div class="flex gap-2">
    <button
      class="border p-2 px-10 grid place-items-center"
      on:click={() => window.location.reload()}
    >
      Upload another file
    </button>
    <div class="border p-2">
      <p>Name: {uid.name}</p>
      <p>
        Length: {Math.floor(uid.length / 60) +
          " mins " +
          Math.round(uid.length % 60) +
          " seconds"}
      </p>
      <p>Last Modified: {new Date(uid.lastModified)}</p>
    </div>
  </div>
  <div class="flex gap-2">
    <div class="border p-2 flex-grow">
      {#each $segments as segment}
        <p class="flex hover:bg-zinc-100 p-1">
          <span class=" w-[8ch] block select-none text-gray-500"
            >{Math.floor(segment.start / 60) +
              ":" +
              Math.floor(segment.start % 60)}</span
          >
          <span class="w-full text">{segment.text}</span>
        </p>
      {/each}
    </div>
    <div class="border p-2 flex-grow sticky top-2 h-fit">
      <h1 class="text-2xl w-fit py-4">Keywords</h1>
      <form class="flex gap-1">
        <input
          autocomplete="off"
          type="text"
          class="bg-zinc-100 border p-2 focus:outline-black"
          value=""
          id="term"
        />
        <button
          class="border p-2 px-4 bg-zinc-100 hover:bg-zinc-200 select-none"
          on:click={() => {
            const term = document.getElementById("term").value;
            const included = get(terms).includes(term);
            if (term != "" && !included) {
              terms.update((v) => v.concat(term));
            }
          }}>Add</button
        >
      </form>
      <div class="flex flex-col gap-1 py-2">
        {#each $terms as term}
          <div class="flex gap-1">
            <p class="border p-1 flex-grow px-2">{term}</p>
            <button
              class=" border p-1 aspect-square block px-3 border-red-500/20 text-red-500"
              on:click={() => {
                terms.update((v) => v.filter((t) => t != term));
              }}>x</button
            >
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
