import { yt } from '$lib/youtube';
import type { PageLoad } from './$types';

export const ssr = false;

export const load: PageLoad = async () => {
	try {
		const feed = await yt.getHomeFeed();
		return {
			data: feed.videos
		};
	} catch (e) {
		console.log('heih');

		console.log(e);
	}
};
