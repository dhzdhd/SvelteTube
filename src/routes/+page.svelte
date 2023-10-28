<script lang="ts">
	import { onMount } from 'svelte';
	import shaka from 'shaka-player';
	import { Innertube, UniversalCache } from 'youtubei.js';
	import { Player, Video, DefaultUi, usePlayerStore } from '@vime/svelte';
	import { yt } from '$lib/youtube';

	let videoElement: any = null;
	let player: shaka.Player | null = null;

	onMount(async () => {
		const url = 'aFANd2l-yVE';
		const endpoint = await yt.resolveURL(url);
		const info = await yt.getInfo(url);
		console.log(info);

		const dash = await info.toDash();
		const uri = 'data:application/dash+xml;charset=utf-8;base64,' + btoa(dash);

		shaka.polyfill.installAll();

		player = new shaka.Player(videoElement);
		videoElement.poster = info.basic_info.thumbnail![0].url;

		player.configure({
			streaming: {
				bufferingGoal: 180,
				rebufferingGoal: 0.02,
				bufferBehind: 300
			}
		});

		player.getNetworkingEngine()?.registerRequestFilter((_type: any, request: any) => {
			const uri = request.uris[0];
			const url = new URL(uri);
			const headers = request.headers;

			if (url.host.endsWith('.googlevideo.com') || headers.Range) {
				url.searchParams.set('__host', url.host);
				url.host = 'localhost:8080';
				url.protocol = 'http';
			}

			request.method = 'POST';

			// protobuf - { 15: 0 }
			request.body = new Uint8Array([120, 0]);

			if (url.pathname === '/') {
				if (headers.Range) {
					request.headers = {};
					url.searchParams.set('range', headers.Range.split('=')[1]);
					url.searchParams.set('alr', 'yes');
				}
			}

			request.uris[0] = url.toString();
		});

		// The UTF-8 characters "h", "t", "t", and "p".
		const HTTP_IN_HEX = 0x68747470;

		const RequestType = shaka.net.NetworkingEngine.RequestType;

		player.getNetworkingEngine()?.registerResponseFilter(async (type: any, response: any) => {
			const dataView = new DataView(response.data);

			if (response.data.byteLength < 4 || dataView.getUint32(0) != HTTP_IN_HEX) {
				// This doesn't start with "http", so it is not an ALR.
				return;
			}

			// Interpret the response data as a URL string.
			const response_as_string = shaka.util.StringUtils.fromUTF8(response.data);

			let retry_parameters;

			if (type == RequestType.MANIFEST) {
				retry_parameters = player!.getConfiguration().manifest.retryParameters;
			} else if (type == RequestType.SEGMENT) {
				retry_parameters = player!.getConfiguration().streaming.retryParameters;
			} else if (type == RequestType.LICENSE) {
				retry_parameters = player!.getConfiguration().drm.retryParameters;
			} else {
				retry_parameters = shaka.net.NetworkingEngine.defaultRetryParameters();
			}

			// Make another request for the redirect URL.
			const uris = [response_as_string];
			const redirect_request = shaka.net.NetworkingEngine.makeRequest(uris, retry_parameters);
			const request_operation = player!.getNetworkingEngine()!.request(type, redirect_request);
			const redirect_response = await request_operation.promise;

			// Modify the original response to contain the results of the redirect
			// response.
			response.data = redirect_response.data;
			response.headers = redirect_response.headers;
			response.uri = redirect_response.uri;
		});

		player.load(uri);
	});
</script>

<video class="w-full max-h-[90%] aspect-video" bind:this={videoElement} controls>
	<track kind="captions" label="English" />
</video>
