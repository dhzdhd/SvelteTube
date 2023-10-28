<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import '../app.css';
</script>

<Header />
<main class="h-full pt-14">
	<slot />
</main>
