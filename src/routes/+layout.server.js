import { sites } from '$lib/data.js';

export function load() {
	sites.forEach(function (element, i = 0) {
		i++;
		element.id = i;
	});
	return { sites };
}
