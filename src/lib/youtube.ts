/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Innertube, UniversalCache } from 'youtubei.js';

export const yt = await Innertube.create({
	generate_session_locally: true,
	// @ts-ignore
	fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
		const url =
			typeof input === 'string'
				? new URL(input)
				: input instanceof URL
				? input
				: new URL(input.url);

		// Transform the url for use with our proxy.
		url.searchParams.set('__host', url.host);
		url.host = 'localhost:8080';
		url.protocol = 'http';

		const headers = init?.headers
			? new Headers(init.headers)
			: input instanceof Request
			? input.headers
			: new Headers();

		// Now serialize the headers.
		url.searchParams.set('__headers', JSON.stringify([...headers]));

		if (input instanceof Request) {
			// @ts-ignore
			input.duplex = 'half';
		}

		// Copy over the request.
		const request = new Request(url, input instanceof Request ? input : undefined);

		headers.delete('user-agent');

		return fetch(
			request,
			init
				? {
						...init,
						headers
				  }
				: {
						headers
				  }
		);
	},
	cache: new UniversalCache(false)
});
