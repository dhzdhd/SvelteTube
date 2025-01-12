import { browser } from '$app/environment';
import type { PageLoad } from './$types';

export const ssr = false;

export const load: PageLoad = async ({ url }) => {
	if (browser) {
		try {
			const id = url.searchParams.get('id');
			console.log(id);
		} catch (e) {
			console.log(e);
		}
	}
};
