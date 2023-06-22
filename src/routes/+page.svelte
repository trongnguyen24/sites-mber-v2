<script lang="ts">
	import { createMenu } from 'svelte-headlessui';
	import Transition from 'svelte-transition';
	import autoAnimate from '@formkit/auto-animate';
	import { flip } from 'svelte/animate';
	import { fade, scale, slide } from 'svelte/transition';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import Cardclub from '$lib/components/cardclub.svelte';
	import { Cardclubmini, Cardclubpin } from '$lib/components';
	import { clubs, club2s } from '$lib/Store.js';
	import { page } from '$app/stores';

	let ready = false;

	console.log($page.url.search);

	let pin = [];
	let clubscache;
	let clubscache2;
	let sortname;
	let bookmark = [];
	let viewmode;
	let bookmarkShow = false;

	function toggleBookmark() {
		bookmarkShow = !bookmarkShow;
		if (bookmarkShow) {
			localStorage.setItem('bookmarkShow', 'true');
		} else {
			localStorage.setItem('bookmarkShow', 'false');
		}
	}

	clubs.subscribe((dataclub) => {
		clubscache = dataclub;
	});

	club2s.subscribe((dataclub2) => {
		clubscache2 = dataclub2;
	});

	clubscache2.forEach(function (element) {
		element.bookmarked = false;
	});

	function clubid(event, item, bookmarkTemp) {
		if (localStorage.getItem('bookmarkStore')) {
			pin = JSON.parse(localStorage.getItem('bookmarkStore'));
		}

		item = event.detail.idClub;

		bookmarkTemp = clubscache.find(({ id }) => id === item);
		if (pin.find(({ id }) => id === item)) {
			pin = pin.filter(function (e) {
				return e.id !== item;
			});
			clubscache.find(({ id }) => id === item).bookmarked = false;
			clubscache2.find(({ id }) => id === item).bookmarked = false;

			clubscache = clubscache;
			clubscache2 = clubscache2;

			localStorage.bookmarkStore = JSON.stringify(pin);
			bookmark = JSON.parse(localStorage.getItem('bookmarkStore'));
		} else {
			pin = [...pin, bookmarkTemp];
			localStorage.bookmarkStore = JSON.stringify(pin);
			clubscache.find(({ id }) => id === item).bookmarked = true;
			clubscache2.find(({ id }) => id === item).bookmarked = true;
			bookmarkShow = true;

			clubscache = clubscache;
			clubscache2 = clubscache2;

			bookmark = JSON.parse(localStorage.getItem('bookmarkStore'));
		}
	}

	function removeBM(event, item, bookmarkTemp) {
		pin = JSON.parse(localStorage.getItem('bookmarkStore'));
		item = event.detail.idClub;
		bookmarkTemp = clubscache.find(({ id }) => id === item);
		clubscache.find(({ id }) => id === item).bookmarked = false;
		clubscache2.find(({ id }) => id === item).bookmarked = false;

		clubscache = clubscache;
		clubscache2 = clubscache2;
		if (pin.find(({ id }) => id === item)) {
			pin = pin.filter(function (e) {
				return e.id !== item;
			});
			localStorage.bookmarkStore = JSON.stringify(pin);
			bookmark = JSON.parse(localStorage.getItem('bookmarkStore'));
		}
	}

	function setnew() {
		localStorage.setItem('sortname', '0');
		sortname = 0;
	}
	function setname() {
		localStorage.setItem('sortname', '1');
		sortname = 1;
	}

	function viewdetail() {
		localStorage.setItem('viewmode', '0');
		viewmode = 0;
	}
	function viewcompact() {
		localStorage.setItem('viewmode', '1');
		viewmode = 1;
	}

	const viewmenu = createMenu({ label: 'viewmenu' });
	const sortmenu = createMenu({ label: 'sortmenu' });
	function onSelect(e: Event) {
		console.log('select', (e as CustomEvent).detail);
	}

	onMount(() => {
		ready = true;
	});
	if (browser) {
		if (localStorage.sortname == 1) {
			setname();
		} else {
			setnew();
		}
		if (localStorage.viewmode == 1) {
			viewcompact();
		} else {
			viewdetail();
		}
		if (localStorage.bookmarkShow === 'true') {
			toggleBookmark();
		}

		if (localStorage.getItem('bookmarkStore')) {
			bookmark = JSON.parse(localStorage.getItem('bookmarkStore'));
			clubscache.forEach(function (element, i) {
				i = bookmark.find(({ id }) => id === element.id);
				console.log(i);
				if (i !== undefined) {
					element.bookmarked = true;
				}
			});
			clubscache2.forEach(function (element, i) {
				i = bookmark.find(({ id }) => id === element.id);
				console.log(i);
				if (i !== undefined) {
					element.bookmarked = true;
				}
			});
		} else {
			localStorage.setItem('bookmarkStore', '');
		}

		if ($page.url.search == '?update') {
			clubs.subscribe((dataclub) => {
				clubscache = dataclub;
			});

			club2s.subscribe((dataclub2) => {
				clubscache2 = dataclub2;
			});
		}
	}

	export let data;
</script>

<svelte:head>
	<title>Mber+® Sites</title>
	<meta name="description" content="" />
</svelte:head>

<section
	in:scale={{ duration: 700, delay: 0, opacity: 0, start: 0.97 }}
	class="container max-w-screen-2xl"
>
	{#if bookmarkShow}
		<div
			use:autoAnimate={{ duration: 1000 }}
			in:slide={{ duration: 300, delay: 100 }}
			out:slide={{ duration: 300, delay: 50 }}
		>
			<h1 class=" text-xl mb-6 font-bold text-gray-800 dark:text-gray-200 flex">Bookmarks</h1>

			<main
				out:scale={{ duration: 250, delay: 0, opacity: 0, start: 1.01 }}
				use:autoAnimate
				class="grid relative transition-all w-full gap-6 pb-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6"
			>
				{#each bookmark as club (club.id)}
					<div>
						<Cardclubpin {club} on:removeBookmark={removeBM} />
					</div>
				{:else}
					<div class=" w-full gap-6">
						<div
							class="p-4 h-[82px] justify-center items-center flex gap-2 text-slate-300 border-2 border-dashed border-slate-300 dark:border-slate-600 dark:text-slate-600 rounded-lg text-sm"
						>
							<span class="animate-bounce inline-flex items-baseline">
								<svg
									class="stroke-slate-300 fill-transparent dark:stroke-slate-600 self-center"
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
							</span> Click head icon to Bookmarks project .
						</div>
					</div>
				{/each}
			</main>
		</div>
	{/if}
	{#if ready}
		<div class="flex justify-between flex-col gap-4 sm:flex-row">
			<h1
				class="text-xl justify-center font-bold text-gray-800 dark:text-gray-200 flex text-center"
			>
				Mber+® sites url
			</h1>
			<div class="flex gap-6 justify-center">
				<div class="relative z-10 inline-block">
					<button
						on:click={toggleBookmark}
						type="button"
						class="inline-flex items-center gap-2 justify-center font-medium text-gray-500 group hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-50"
					>
						<div class="relative w-6 h-6">
							{#if bookmarkShow}
								<svg
									in:slide={{ duration: 300, delay: 100 }}
									out:slide={{ duration: 300, delay: 100 }}
									class="absolute top-1 left-1.5 stroke-red-500 fill-red-500 dark:fill-red-500 group-hover:stroke-red-500 dark:stroke-red-500 dark:group-hover:stroke-red-400"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
									/>
								</svg>
							{:else}
								<svg
									in:slide={{ duration: 300, delay: 100 }}
									out:slide={{ duration: 300, delay: 100 }}
									class="absolute top-1 left-1.5 stroke-gray-500 group-hover:stroke-gray-700 dark:stroke-gray-300 dark:group-hover:stroke-gray-50"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
									/>
								</svg>
							{/if}
						</div>

						Bookmarks
					</button>
				</div>
				<div class="relative z-10 inline-block">
					<button
						use:viewmenu.button
						on:select={onSelect}
						type="button"
						class="inline-flex items-center gap-2 justify-center font-medium text-gray-500 group hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-50"
					>
						<svg
							class=" stroke-gray-500 group-hover:stroke-gray-700 dark:stroke-gray-300 dark:group-hover:stroke-gray-50"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M3.75 6C3.75 5.40326 3.98705 4.83097 4.40901 4.40901C4.83097 3.98705 5.40326 3.75 6 3.75H8.25C8.84674 3.75 9.41903 3.98705 9.84099 4.40901C10.2629 4.83097 10.5 5.40326 10.5 6V8.25C10.5 8.84674 10.2629 9.41903 9.84099 9.84099C9.41903 10.2629 8.84674 10.5 8.25 10.5H6C5.40326 10.5 4.83097 10.2629 4.40901 9.84099C3.98705 9.41903 3.75 8.84674 3.75 8.25V6ZM3.75 15.75C3.75 15.1533 3.98705 14.581 4.40901 14.159C4.83097 13.7371 5.40326 13.5 6 13.5H8.25C8.84674 13.5 9.41903 13.7371 9.84099 14.159C10.2629 14.581 10.5 15.1533 10.5 15.75V18C10.5 18.5967 10.2629 19.169 9.84099 19.591C9.41903 20.0129 8.84674 20.25 8.25 20.25H6C5.40326 20.25 4.83097 20.0129 4.40901 19.591C3.98705 19.169 3.75 18.5967 3.75 18V15.75ZM13.5 6C13.5 5.40326 13.7371 4.83097 14.159 4.40901C14.581 3.98705 15.1533 3.75 15.75 3.75H18C18.5967 3.75 19.169 3.98705 19.591 4.40901C20.0129 4.83097 20.25 5.40326 20.25 6V8.25C20.25 8.84674 20.0129 9.41903 19.591 9.84099C19.169 10.2629 18.5967 10.5 18 10.5H15.75C15.1533 10.5 14.581 10.2629 14.159 9.84099C13.7371 9.41903 13.5 8.84674 13.5 8.25V6ZM13.5 15.75C13.5 15.1533 13.7371 14.581 14.159 14.159C14.581 13.7371 15.1533 13.5 15.75 13.5H18C18.5967 13.5 19.169 13.7371 19.591 14.159C20.0129 14.581 20.25 15.1533 20.25 15.75V18C20.25 18.5967 20.0129 19.169 19.591 19.591C19.169 20.0129 18.5967 20.25 18 20.25H15.75C15.1533 20.25 14.581 20.0129 14.159 19.591C13.7371 19.169 13.5 18.5967 13.5 18V15.75Z"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>

						View
					</button>

					<Transition
						show={$viewmenu.expanded}
						enter="transition ease-out duration-150"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-90"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<div
							use:viewmenu.items
							class="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-gray-200 focus:outline-none dark:ring-gray-700 dark:bg-gray-800"
						>
							{#if viewmode === 0}
								<span class="absolute flex top-[1.25rem] left-3.5 h-2 w-2">
									<span
										class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"
									/>
									<span class="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
								</span>
							{:else}
								<span class="absolute flex top-[3.5rem] left-3.5 h-2 w-2">
									<span
										class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"
									/>
									<span class="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
								</span>
							{/if}
							<div class="p-1.5">
								<button
									use:viewmenu.item
									on:click={viewdetail}
									class="flex items-center w-full px-6 py-2 rounded text-sm text-gray-700 dark:text-gray-400 group dark:hover:bg-gray-700 hover:bg-slate-100"
								>
									Details
								</button>
								<button
									use:viewmenu.item
									on:click={viewcompact}
									class="flex items-center w-full px-6 py-2 rounded text-sm text-gray-700 dark:text-gray-400 group dark:hover:bg-gray-700 hover:bg-slate-100"
								>
									Compact
								</button>
							</div>
						</div>
					</Transition>
				</div>

				<div class="relative z-10 inline-block">
					<button
						use:sortmenu.button
						on:select={onSelect}
						type="button"
						class="inline-flex items-center gap-2 justify-center font-medium text-gray-500 group hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-50"
					>
						<svg
							class=" stroke-gray-500 group-hover:stroke-gray-700 dark:stroke-gray-300 dark:group-hover:stroke-gray-50"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M3 7.5L7.5 3M7.5 3L12 7.5M7.5 3V16.5M21 16.5L16.5 21M16.5 21L12 16.5M16.5 21V7.5"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						Sort
					</button>

					<Transition
						show={$sortmenu.expanded}
						enter="transition ease-out duration-150"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-90"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<div
							use:sortmenu.items
							class="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-gray-200 focus:outline-none dark:ring-gray-700 dark:bg-gray-800"
						>
							{#if sortname === 0}
								<span class="absolute flex top-[1.25rem] left-3.5 h-2 w-2">
									<span
										class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"
									/>
									<span class="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
								</span>
							{:else}
								<span class="absolute flex top-[3.5rem] left-3.5 h-2 w-2">
									<span
										class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"
									/>
									<span class="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
								</span>
							{/if}
							<div class="p-1.5">
								<button
									use:sortmenu.item
									on:click={setnew}
									class="flex items-center w-full px-6 py-2 rounded text-sm text-gray-700 dark:text-gray-400 group dark:hover:bg-gray-700 hover:bg-slate-100"
								>
									Newest
								</button>
								<button
									use:sortmenu.item
									on:click={setname}
									class="flex items-center w-full px-6 py-2 rounded text-sm text-gray-700 dark:text-gray-400 group dark:hover:bg-gray-700 hover:bg-slate-100"
								>
									Name Alphabetically
								</button>
							</div>
						</div>
					</Transition>
				</div>
			</div>
		</div>
	{/if}
	<div class="relative">
		{#if sortname === 0 && viewmode === 0}
			<main
				in:scale={{ duration: 700, delay: 200, opacity: 0, start: 0.97 }}
				out:scale={{ duration: 250, delay: 0, opacity: 0, start: 1.01 }}
				class="grid absolute pt-6 w-full gap-10 pb-40 grid-cols-[repeat(auto-fit,minmax(280px,_1fr))]"
			>
				{#each clubscache as club (club.id)}
					<Cardclub {club} logincheck={data.user} on:addItemToBookmark={clubid} />
				{/each}
			</main>
		{/if}
		{#if sortname === 1 && viewmode === 0}
			<main
				in:scale={{ duration: 700, delay: 200, opacity: 0, start: 0.97 }}
				out:scale={{ duration: 250, delay: 0, opacity: 0, start: 1.01 }}
				class="grid absolute w-full pt-6 gap-10 pb-40 grid-cols-[repeat(auto-fit,minmax(280px,_1fr))]"
			>
				{#each clubscache2 as club}
					<Cardclub {club} logincheck={data.user} on:addItemToBookmark={clubid} />
				{/each}
			</main>
		{/if}
		{#if sortname === 0 && viewmode === 1}
			<main
				in:scale={{ duration: 700, delay: 200, opacity: 0, start: 0.97 }}
				out:scale={{ duration: 250, delay: 0, opacity: 0, start: 1.01 }}
				class="grid absolute w-full pt-6 gap-10 pb-40 grid-cols-[repeat(auto-fit,minmax(280px,_1fr))]"
			>
				{#each clubscache as club}
					<Cardclubmini {club} logincheck={data.user} on:addItemToBookmark={clubid} />
				{/each}
			</main>
		{/if}
		{#if sortname === 1 && viewmode === 1}
			<main
				in:scale={{ duration: 700, delay: 200, opacity: 0, start: 0.97 }}
				out:scale={{ duration: 250, delay: 0, opacity: 0, start: 1.01 }}
				class="grid absolute w-full pt-6 gap-10 pb-40 grid-cols-[repeat(auto-fit,minmax(280px,_1fr))]"
			>
				{#each clubscache2 as club}
					<Cardclubmini {club} logincheck={data.user} on:addItemToBookmark={clubid} />
				{/each}
			</main>
		{/if}
	</div>
</section>
