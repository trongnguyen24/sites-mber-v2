<script>
	import { getImageURL } from '$lib/utils';
	import { scale } from 'svelte/transition';

	export let club;
</script>

<article
	in:scale
	out:scale
	data-id={club.id}
	class=" bg-[#F6FAFE] group overflow-hidden border-l border-t relative border-white relative rounded-lg shadow dark:bg-[#1D1D23] dark:border-gray-800"
>
	<div
		class="flex items-center h-12 justify-left px-8 py-4 bg-white dark:bg-gray-800 dark:bg-opacity-10"
	>
		<!-- <picture class="w-8 h-8">
			<img
				src={club?.thumbnail
					? getImageURL(club.collectionId, club.id, club.thumbnail, '100x100')
					: `https://via.placeholder.com/80/4506CB/FFFFFF/?text=${club.name}`}
				alt="club thumbnail"
				loading="lazy"
				width="32"
				height="32"
			/>
		</picture> -->
		<p class="text-sm w-full text-center font-bold text-slate-600 dark:text-slate-100">
			{club.name}
		</p>
	</div>
	<div class="flex flex-col gap-4 border-t border-slate-100 dark:border-gray-900">
		<div class="flex font-code text-center text-xs divide-x divide-slate-200 dark:divide-slate-900">
			<a rel="noreferrer" class="w-full" target="_blank" href="https://{club.dev}/page"
				><div
					class=" py-2 px-2 bg-slate-50 text-slate-500 dark:text-slate-400 border-slate-300 dark:border-slate-600 dark:bg-slate-700 group-hover:hover:text-sky-500 group-hover:text-slate-600 group-hover:bg-white dark:bg-opacity-30 dark:hover:bg-opacity-60 dark:group-hover:hover:text-sky-500 dark:group-hover:bg-slate-800 dark:group-hover:text-slate-300 transition-colors duration-150"
				>
					Dev
				</div></a
			>
			<a rel="noreferrer" class="w-full" target="_blank" href="https://{club.test}/page"
				><div
					class=" py-2 px-2 bg-slate-50 text-slate-500 dark:text-slate-400 border-slate-300 dark:border-slate-600 dark:bg-slate-700 group-hover:hover:text-purple-500 group-hover:text-slate-600 group-hover:bg-white dark:bg-opacity-30 dark:hover:bg-opacity-60 dark:group-hover:bg-slate-800 dark:group-hover:hover:text-purple-500 dark:group-hover:text-slate-300 transition-colors duration-150"
				>
					Test
				</div></a
			>
			<a rel="noreferrer" class="w-full" target="_blank" href="https://{club.uat}/page"
				><div
					class=" py-2 px-2 bg-slate-50 text-slate-500 dark:text-slate-400 border-slate-300 dark:border-slate-600 dark:bg-slate-700 group-hover:hover:text-emerald-500 group-hover:text-slate-600 group-hover:bg-white dark:bg-opacity-30 dark:hover:bg-opacity-60 dark:group-hover:bg-slate-800 dark:group-hover:hover:text-emerald-500 dark:group-hover:text-slate-300 transition-colors duration-150"
				>
					Uat
				</div></a
			>
			<a rel="noreferrer" class="w-full" target="_blank" href="https://{club.sandbox}/page"
				><div
					class=" py-2 px-2 bg-slate-50 text-slate-500 dark:text-slate-400 border-slate-300 dark:border-slate-600 dark:bg-slate-700 group-hover:hover:text-fuchsia-500 group-hover:text-slate-600 group-hover:bg-white dark:bg-opacity-30 dark:hover:bg-opacity-60 dark:group-hover:bg-slate-800 dark:group-hover:hover:text-fuchsia-500 dark:group-hover:text-slate-300 transition-colors duration-150"
				>
					Sand
				</div></a
			>
			<a rel="noreferrer" class="w-full" target="_blank" href="https://{club.live}/page"
				><div
					class=" py-2 px-2 bg-slate-50 text-slate-500 dark:text-slate-400 border-slate-300 dark:border-slate-600 dark:bg-slate-700 group-hover:hover:text-lime-500 group-hover:text-slate-600 group-hover:bg-white dark:bg-opacity-30 dark:hover:bg-opacity-60 dark:group-hover:bg-slate-800 dark:group-hover:hover:text-lime-500 dark:group-hover:text-slate-300 transition-colors duration-150"
				>
					Live
				</div></a
			>
		</div>
	</div>
</article>
