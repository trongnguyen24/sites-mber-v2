<script>
	import { createEventDispatcher } from 'svelte';
	import { getImageURL } from '$lib/utils';
	import { scale } from 'svelte/transition';

	export let club;
	const dispatch = createEventDispatcher();
	function addItemToBookmark() {
		dispatch('addItemToBookmark', {
			idClub: club.id
		});
	}
</script>

<article
	class=" bg-[#F6FAFE] group overflow-hidden border-t border-l relative border-white rounded-2xl shadow-soft hover:shadow-3xl dark:hover:bg-[#24242c] transition-shadow duration-300 dark:hover:shadow-3xl-dark dark:bg-[#1D1D23] dark:border-gray-800"
>
	<div
		class="w-6 flex opacity-100 group-hover:opacity-100 transition-all flex-col gap-1 absolute right-2 top-2"
	>
		<!-- <button on:click={addItemToBookmark} class="w-6 h-6 relative">
			{#if club.bookmarked === true}
				<svg
					in:scale={{ duration: 350, delay: 50, opacity: 0, start: 0.7 }}
					out:scale={{ duration: 350, delay: 50, opacity: 0, start: 0.7 }}
					id={club.id}
					class="stroke-red-500 top-0 absolute fill-red-500 hover:stroke-red-500 transition-colors dark:stroke-red-500 dark:hover:stroke-red-500"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M21 8.25C21 5.765 18.901 3.75 16.312 3.75C14.377 3.75 12.715 4.876 12 6.483C11.285 4.876 9.623 3.75 7.687 3.75C5.1 3.75 3 5.765 3 8.25C3 15.47 12 20.25 12 20.25C12 20.25 21 15.47 21 8.25Z"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			{:else}
				<svg
					in:scale={{ duration: 350, delay: 50, opacity: 0, start: 0.5 }}
					out:scale={{ duration: 350, delay: 50, opacity: 0, start: 1.5 }}
					id={club.id}
					class="stroke-slate-300 top-0 absolute fill-transparent hover:stroke-red-500 transition-colors dark:stroke-slate-600 dark:hover:stroke-red-400"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M21 8.25C21 5.765 18.901 3.75 16.312 3.75C14.377 3.75 12.715 4.876 12 6.483C11.285 4.876 9.623 3.75 7.687 3.75C5.1 3.75 3 5.765 3 8.25C3 15.47 12 20.25 12 20.25C12 20.25 21 15.47 21 8.25Z"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			{/if}
		</button> -->
	</div>
	<div
		class="flex items-center gap-4 flex-row h-16 justify-left px-6 py-3 bg-white dark:bg-gray-800 dark:bg-opacity-10"
	>
		<picture class="w-12 h-12">
			<img
				src={club?.sIcon
					? getImageURL(club.sIcon)
					: `https://via.placeholder.com/80/4506CB/FFFFFF/?text=${club.sName}`}
				alt="club thumbnail"
				loading="lazy"
				width="48"
				height="48"
			/>
		</picture>
		<h2 class="text-sm font-medium text-slate-800 dark:text-slate-200">
			<span class="text-gray-500">{club.id}.</span>
			{club.sName}
		</h2>
	</div>
	<div class="flex flex-col gap-2 p-4 border-t border-slate-100 dark:border-gray-900">
		<div class="flex flex-col gap-2">
			<a rel="noreferrer" target="_blank" href={club.sUrl}>
				<div
					class="flex items-center h-6 overflow-hidden text-xs transition-all border divide-x rounded divide-sky-500 font-code border-slate-200 dark:hover:border-slate-600 hover:border-slate-400 dark:border-gray-800"
				>
					<div class="w-10 pl-2 text-slate-700 shrink-0 dark:text-slate-100 select-none">Dev</div>

					<div class="h-6 max-w-full pl-2 leading-6 whitespace-nowrap text-slate-400">
						{club.sUrl}
					</div>
				</div>
			</a>
			<a rel="noreferrer" target="_blank" href={club.sLive}>
				<div
					class="flex items-center h-6 overflow-hidden text-xs transition-all border divide-x rounded divide-lime-500 font-code border-slate-200 dark:hover:border-slate-600 hover:border-slate-400 dark:border-gray-800"
				>
					<div class="w-10 pl-2 text-slate-700 shrink-0 dark:text-slate-100 select-none">Live</div>
					<div class="h-6 max-w-full pl-2 leading-6 whitespace-nowrap text-slate-400">
						{club.sLive}
					</div>
				</div>
			</a>
		</div>
	</div>
</article>
