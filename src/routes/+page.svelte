<script lang="ts">
	import { onMount } from 'svelte';
	import shaka from 'shaka-player?client';
	import { Innertube, UniversalCache } from 'youtubei.js';

	let videoElement: any = null;
	let player: any = null;

	onMount(() => {
		player = new shaka.Player(videoElement);
		player.load(
			'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
		);
	});
</script>

<video bind:this={videoElement} width="640" controls />
