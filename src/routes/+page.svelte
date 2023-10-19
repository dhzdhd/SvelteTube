<script lang="ts">
	import shaka from 'shaka-player';
	import { onMount } from 'svelte';

	let videoElement: any = null;

	onMount(() => {
		const player = new shaka.Player(videoElement);
		player.load(
			'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
		);
	});
</script>

<video bind:this={videoElement} width="640" controls />
