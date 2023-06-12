import type { LayoutServerLoad } from '$types';
import { serializeNonPOJOs } from '$lib/utils';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	const pathname = url.pathname;
	// http://backend.nguyenlee.com/api/collections/club/records

	// const clubs = serializeNonPOJOs(
	// 	await locals.pb.collection('club').getFullList({
	// 		sort: '-created'
	// 	})
	// );

	if (locals.user) {
		return {
			user: locals.user,
			pathname
			// clubs
		};
	}

	return {
		user: undefined,
		pathname
		// clubs
	};
};
