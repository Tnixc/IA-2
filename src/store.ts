import { writable } from "svelte/store";
export const file = writable<Blob>();
export const transcription = writable<string>();
