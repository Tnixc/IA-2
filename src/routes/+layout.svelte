<script>
import "../app.css";

import { onNavigate } from "$app/navigation";
onNavigate((nav) => {
	if (!document.startViewTransition) {
		return;
	}
	return new Promise((resolve) => {
		document.startViewTransition(async () => {
			resolve();
			await nav.complete;
		});
	});
});
</script>

<svelte:head>
  <title>IA</title>
</svelte:head>

<slot />

