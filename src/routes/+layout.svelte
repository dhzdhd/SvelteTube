<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import '../app.css';
</script>

<Header />
<main class="h-full pt-10">
	<slot />
</main>
