import type { LayoutServerLoad } from '$types';

export const load: LayoutServerLoad = ({ locals, url }) => {
	const pathname = url.pathname;
	// http://backend.nguyenlee.com/api/collections/club/records

	if (locals.user) {
		return {
			user: locals.user,
			pathname
		};
	}

	return {
		user: undefined,
		pathname
	};
};
