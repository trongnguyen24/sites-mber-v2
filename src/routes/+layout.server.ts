import type { LayoutServerLoad } from '$types';

export const load: LayoutServerLoad = ({ locals, url }) => {
	const pathname = url.pathname;

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
