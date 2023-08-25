<script lang="ts">
	// @ts-nocheck
	import Menu from '$lib/components/Menu.svelte';
	import { page } from '$app/stores';
	import Transition from 'svelte-transition';
	import { getImageURL } from '$lib/utils';
	import { scale } from 'svelte/transition';
	import { createDialog } from 'svelte-headlessui';
	import { createMenu } from 'svelte-headlessui';
	import Theme from '$lib/components/Theme.svelte';
	import { club2s } from '$lib/Store.js';

	let datasearch;

	const accmenu = createMenu({ label: 'accmenu' });
	function onSelect(e: Event) {
		console.log('select', (e as CustomEvent).detail);
	}

	let searchTerm = '';
	let filteredBooks = [];

	club2s.subscribe((dataclub) => {
		datasearch = dataclub;
	});

	const searchProducts = datasearch.map((datasearch) => ({
		...datasearch,
		searchTerms: `${datasearch.name} ${datasearch.shortname}`
	}));

	const searchBooks = () => {
		return (filteredBooks = searchProducts.filter((searchProducts) => {
			let datasearchTitle = searchProducts.searchTerms.toLowerCase();
			return datasearchTitle.includes(searchTerm.toLowerCase());
		}));
	};
	searchBooks();

	const dialogmenu = createDialog({ label: 'Menu' });
	const dialogsearch = createDialog({ label: 'Search' });
	const dialogacc = createDialog({ label: 'Account' });

	let scrolly;
</script>

<svelte:window bind:scrollY={scrolly} />
<header class="relative z-20">
	<nav
		class="fixed w-full transition-colors duration-300 {scrolly > 40
			? 'backdrop-blur border-b bg-white/70 border-b-slate-600/10 dark:bg-zinc-900/90'
			: 'backdrop-blur-none border-b bg-white/30 border-b-slate-400/10 dark:bg-zinc-900/20'}
			"
	>
		<!-- Mobile header -->
		<div class=" w-full flex px-6 h-[3.75rem] justify-between items-center lg:hidden">
			<button class="block" on:click={dialogsearch.open}>
				<svg
					class="stroke-slate-400 dark:stroke-slate-500"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M20.0001 20L15.803 15.803M15.803 15.803C17.2096 14.3964 17.9998 12.4887 17.9998 10.4995C17.9998 8.51029 17.2096 6.60256 15.803 5.19599C14.3965 3.78941 12.4887 2.99921 10.4995 2.99921C8.51035 2.99921 6.60262 3.78941 5.19605 5.19599C3.78947 6.60256 2.99927 8.51029 2.99927 10.4995C2.99927 12.4887 3.78947 14.3964 5.19605 15.803C6.60262 17.2096 8.51035 17.9998 10.4995 17.9998C12.4887 17.9998 14.3965 17.2096 15.803 15.803Z"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>

			<div class="order-2">
				<svg
					width="50"
					height="28"
					viewBox="0 0 50 28"
					class="fill-lime-500 dark:fill-mber"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M46.7379 5.95014C46.4408 5.78005 46.1932 5.53405 46.0201 5.23687C45.8476 4.93834 45.7567 4.59896 45.7567 4.2534C45.7567 3.90784 45.8476 3.56846 46.0201 3.26993C46.1933 2.9729 46.4408 2.72707 46.7379 2.55715C47.0437 2.38426 47.3883 2.29346 47.7387 2.29346C48.0892 2.29346 48.4338 2.38426 48.7395 2.55715C49.0368 2.72712 49.2844 2.97292 49.4578 3.26993C49.6305 3.5684 49.7215 3.9078 49.7215 4.2534C49.7215 4.59901 49.6305 4.9384 49.4578 5.23687C49.2839 5.53443 49.0353 5.78046 48.7371 5.95014C48.4315 6.12277 48.0872 6.21342 47.737 6.21342C47.3868 6.21342 47.0425 6.12277 46.737 5.95014H46.7379ZM48.5863 5.7249C48.84 5.58043 49.0508 5.37015 49.1968 5.11585C49.344 4.85194 49.4213 4.55424 49.4213 4.25143C49.4213 3.94861 49.344 3.65091 49.1968 3.387C49.0515 3.13214 48.8405 2.9217 48.5863 2.77795C48.3271 2.63298 48.0356 2.55691 47.7392 2.55691C47.4428 2.55691 47.1514 2.63298 46.8922 2.77795C46.6376 2.92182 46.4262 3.13221 46.2801 3.387C46.1324 3.65071 46.0547 3.94849 46.0547 4.25143C46.0547 4.55436 46.1324 4.85214 46.2801 5.11585C46.4266 5.3698 46.638 5.57944 46.8922 5.72293C47.1512 5.86848 47.4427 5.94488 47.7392 5.94488C48.0357 5.94488 48.3273 5.86848 48.5863 5.72293V5.7249ZM47.8861 3.11779C48.0108 3.11647 48.1335 3.14834 48.2421 3.21016C48.3492 3.27058 48.4384 3.35894 48.5001 3.46599C48.5619 3.57304 48.594 3.69486 48.5931 3.81871C48.595 3.9552 48.5557 4.08905 48.4805 4.20252C48.4085 4.3135 48.3047 4.39967 48.1828 4.4495L48.6348 5.36333H48.3287L47.913 4.51075C47.8782 4.51437 47.8433 4.51586 47.8083 4.5152H47.2961V5.36333H47.0067V3.11878L47.8861 3.11779ZM48.0893 4.21832C48.1562 4.17756 48.2111 4.1196 48.2484 4.05038C48.2873 3.9793 48.3073 3.89936 48.3067 3.81822C48.3069 3.73802 48.2864 3.65917 48.247 3.58952C48.2088 3.51981 48.1535 3.46114 48.0864 3.41911C48.02 3.37686 47.943 3.35474 47.8646 3.35539H47.2961V4.27958H47.867C47.9453 4.28029 48.0222 4.25907 48.0893 4.21832Z"
					/>
					<path
						d="M23.6382 8.61814V6.4635H21.5029V8.61814H19.3672V10.7728H21.5029V12.9284H23.6382V10.7738H25.7739V8.61914L23.6382 8.61814Z"
					/>
					<path
						d="M17.2303 10.7727V8.61804H15.0946V10.7727H12.9594V12.9293H15.0946V15.0839H17.2303V12.9293H19.3656V10.7747L17.2303 10.7727Z"
					/>
					<path
						d="M17.2303 2.15464V0H15.0946V2.15464H12.9594V4.30929H15.0946V6.46393H17.2303V4.30929H19.3656V2.15464H17.2303Z"
					/>
					<path
						d="M10.6101 13.1422V11.4188H8.9013V13.1422H7.19299V14.8657H8.9013V16.5891H10.6101V14.8657H12.3184V13.1422H10.6101Z"
					/>
					<path
						d="M8.47446 6.67923V4.95532H6.76617V6.67873H5.05737V8.40216H6.76617V10.1256H8.47446V8.40216H10.1832V6.67923H8.47446Z"
					/>
					<path
						d="M19.3657 17.2356V15.0809H17.2305V17.2356H15.0947V19.3902H17.2305V21.5449H19.3657V19.3902H21.5014V17.2356H19.3657Z"
					/>
					<path d="M21.5008 4.3092H19.3656V6.46385H21.5008V4.3092Z" />
					<path d="M23.6367 2.15515H21.501V4.3098H23.6367V2.15515Z" />
					<path d="M23.6367 15.0809H21.501V17.2356H23.6367V15.0809Z" />
					<path
						d="M6.03163 11.2982V10.1952H4.94025V11.2982H3.84692V12.4012H4.94025V13.5042H6.03358V12.4012H7.12692V11.2982H6.03163Z"
					/>
					<path
						d="M2.18666 9.14354V8.04053H1.09333V9.14354H0V10.2465H1.09333V11.3496H2.18666V10.2465H3.27999V9.14354H2.18666Z"
					/>
					<path
						d="M25.7729 8.61762H23.6372V6.46298H21.501V4.69659L11.072 18.1392C10.7362 18.5708 10.5158 19.0822 10.4319 19.6243C10.3481 20.1664 10.4035 20.7212 10.593 21.2355C10.7824 21.7499 11.0995 22.2065 11.5139 22.5619C11.9284 22.9172 12.4263 23.1593 12.96 23.265V21.544H10.8242V19.3894H12.96V17.2352H15.0952V19.3894H17.2309V20.6183L19.8553 17.2352H19.3657V15.0806H17.2305V12.9259H19.3657V10.7713H21.501V12.9259H23.1975L23.6382 12.3604V10.7718H25.7739L25.7729 8.61762ZM21.501 15.1137L21.5259 15.0811H21.501V15.1137ZM23.6362 2.67531C23.0327 2.97266 22.5039 3.40417 22.0895 3.93738L21.8016 4.30883H23.6357L23.6362 2.67531ZM27.9077 10.7723H30.0361V7.46571V6.70256C30.0373 5.5445 29.5938 4.43099 28.7987 3.5958C28.0035 2.76061 26.9185 2.2687 25.7715 2.22335V4.30933H27.9067V6.46348H25.7715V8.61812H27.9067L27.9077 10.7723ZM30.0361 16.886V12.9264H27.9077V15.0806H25.7724V12.9264H23.6724V20.4618C23.6719 21.1307 23.8787 21.7831 24.2639 22.3276C24.649 22.8721 25.1933 23.2815 25.8205 23.4985C26.4477 23.7156 27.1264 23.7294 27.7618 23.538C28.3971 23.3466 28.9573 22.9596 29.3638 22.4312C29.4728 22.327 29.5744 22.2152 29.6679 22.0968L31.8908 19.2318C31.3643 19.1101 30.8943 18.8119 30.5576 18.3859C30.2208 17.96 30.0371 17.4314 30.0366 16.8865L30.0361 16.886ZM15.0947 22.9404C15.4785 22.7311 15.8152 22.444 16.0838 22.0972L16.5127 21.5445H15.0928L15.0947 22.9404ZM42.8074 10.2625C42.2865 9.85308 41.6258 9.66912 40.9705 9.7511C40.3152 9.83308 39.719 10.1743 39.313 10.6997L37.2566 13.3522V20.4622C37.2566 21.3138 37.5919 22.1304 38.1887 22.7326C38.7856 23.3347 39.5951 23.673 40.4391 23.673C41.2832 23.673 42.0927 23.3347 42.6895 22.7326C43.2864 22.1304 43.6217 21.3138 43.6217 20.4622V11.4065C43.4654 10.9535 43.1826 10.5557 42.8074 10.261V10.2625ZM40.6252 2.46193C39.7505 2.15716 38.8033 2.13547 37.9158 2.39988C37.0283 2.6643 36.2448 3.20162 35.6746 3.93689L30.7015 10.3475V17.1147C30.7015 17.5401 30.8133 17.9578 31.0255 18.3254C31.2377 18.6929 31.5427 18.9972 31.9094 19.2071L35.512 14.5639L35.5081 14.5609L38.9316 10.1296C39.228 9.74574 39.6201 9.44818 40.068 9.26738C40.5158 9.08658 41.0032 9.02902 41.4802 9.10062C41.9573 9.17222 42.407 9.3704 42.7833 9.67488C43.1595 9.97936 43.4489 10.3792 43.6217 10.8335V6.70256C43.6214 5.76917 43.3326 4.85911 42.7955 4.0991C42.2584 3.33909 41.4997 2.76697 40.6252 2.46241"
					/>
					<path
						d="M12.9665 23.6907V21.536H10.8308V23.6907H8.69604V25.8453H10.8313V27.9999H12.967V25.8453H15.1023V23.6907H12.9665Z"
					/>
				</svg>
			</div>

			<button on:click={dialogmenu.open} class="order-3 block">
				<svg
					class="stroke-slate-400 hover:stroke-slate-300 dark:stroke-slate-500 dark:hover:stroke-slate-400"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M3.75 6.75H20.25M3.75 12H20.25M3.75 17.25H20.25"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
		</div>

		<!-- Desktop header -->

		<div
			class="w-full container h-[3.75rem] justify-between items-center hidden max-w-screen-2xl lg:flex"
		>
			<div class="flex items-center gap-16 grow">
				<a href="/">
					<img class=" h-10" alt="Logo" src="/ta-logo.png" />
				</a>
				<button
					on:click={dialogsearch.open}
					class="flex w-full items-center max-w-[16rem] gap-2 px-2 py-2 text-gray-500 dark:text-gray-300 bg-slate-500 bg-opacity-0 hover:bg-opacity-5 transition duration-300 rounded-lg"
				>
					<svg
						class="stroke-gray-500 dark:stroke-gray-300"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M20.0001 20L15.803 15.803M15.803 15.803C17.2096 14.3964 17.9998 12.4887 17.9998 10.4995C17.9998 8.51029 17.2096 6.60256 15.803 5.19599C14.3965 3.78941 12.4887 2.99921 10.4995 2.99921C8.51035 2.99921 6.60262 3.78941 5.19605 5.19599C3.78947 6.60256 2.99927 8.51029 2.99927 10.4995C2.99927 12.4887 3.78947 14.3964 5.19605 15.803C6.60262 17.2096 8.51035 17.9998 10.4995 17.9998C12.4887 17.9998 14.3965 17.2096 15.803 15.803Z"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					Quick search...
				</button>
			</div>
			<div class="flex gap-8 items-center">
				<span class="gap-8 flex items-center">
					<Theme />
				</span>
			</div>
		</div>
	</nav>

	<div class="relative z-40">
		<Transition show={$dialogmenu.expanded}>
			<Transition
				enter="ease-out duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<button
					class="fixed inset-0 bg-opacity-50 bg-zinc-900 backdrop-blur-sm"
					on:click={dialogmenu.close}
				/>
			</Transition>

			<div class="fixed inset-0 overflow-y-auto">
				<div class="flex justify-end p-4 text-center">
					<Transition
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<div
							class="p-6 overflow-hidden text-left align-middle transition-all transform border-t rounded-lg shadow-xl w-52 bg-slate-100 border-t-white dark:border-t-gray-700 dark:bg-gray-800"
							use:dialogmenu.modal
						>
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<ul on:click={dialogmenu.close} class="flex flex-col gap-6">
								<Menu />
							</ul>
							<div
								class="flex justify-between pt-6 mt-6 border-t border-t-gray-200 dark:border-t-gray-700"
							>
								<div class="font-normal text-gray-400 dark:text-gray-500">Switch theme</div>
								<Theme />
							</div>
						</div>
					</Transition>
				</div>
			</div>
		</Transition>
	</div>

	<div class="relative z-40">
		<Transition show={$dialogsearch.expanded}>
			<Transition
				enter="ease-out duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					class="fixed inset-0 bg-opacity-50 bg-zinc-900 backdrop-blur-sm"
					on:click={dialogsearch.close}
				/>
			</Transition>

			<div class="fixed inset-0 overflow-y-auto">
				<div class="flex items-center justify-center min-h-full p-4 text-center">
					<Transition
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<div
							class="w-full flex flex-col max-w-xl overflow-hidden align-middle transition-all transform border-t rounded-lg shadow-xl h-screen max-h-[37rem] text-slate-600 dark:text-slate-300 bg-slate-100 border-t-white dark:border-t-gray-700 dark:bg-gray-800"
							use:dialogsearch.modal
						>
							<label for="searchbox" class="absolute top-6 left-6">
								<span>
									<svg
										class="stroke-slate-400 dark:stroke-slate-500"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M20.0001 20L15.803 15.803M15.803 15.803C17.2096 14.3964 17.9998 12.4887 17.9998 10.4995C17.9998 8.51029 17.2096 6.60256 15.803 5.19599C14.3965 3.78941 12.4887 2.99921 10.4995 2.99921C8.51035 2.99921 6.60262 3.78941 5.19605 5.19599C3.78947 6.60256 2.99927 8.51029 2.99927 10.4995C2.99927 12.4887 3.78947 14.3964 5.19605 15.803C6.60262 17.2096 8.51035 17.9998 10.4995 17.9998C12.4887 17.9998 14.3965 17.2096 15.803 15.803Z"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
								</span>
							</label>
							<input
								id="searchbox"
								autocomplete="off"
								class="w-full py-6 pl-16 m-0 bg-transparent border-b outline-0 dark:border-b-slate-700 border-b-slate-300 border-opacity-60 dark:border-opacity-50"
								placeholder="Search project..."
								bind:value={searchTerm}
								on:input={searchBooks}
							/>
							<div
								class="flex overflow-y-auto flex-col divide-y divide-slate-200 dark:divide-slate-700 dark:divide-opacity-50"
							>
								{#each filteredBooks as results}
									<div
										class="flex group p-6 items-center transition-colors duration-150 justify-between dark:hover:bg-slate-700 dark:hover:bg-opacity-30 hover:bg-slate-200 hover:bg-opacity-50"
									>
										<div class="flex gap-4">
											<picture class="w-6 h-6">
												<img
													src={results?.thumbnail
														? getImageURL(
																results.collectionId,
																results.id,
																results.thumbnail,
																'100x100'
														  )
														: `https://via.placeholder.com/80/4506CB/FFFFFF/?text=${results.name}`}
													alt="club thumbnail"
													loading="lazy"
													width="24"
													height="24"
												/>
											</picture>
											{results.name}
										</div>
										<div class="flex gap-2 font-code text-center text-xs">
											<a rel="noreferrer" target="_blank" href="https://{results.dev}/page"
												><div
													class="border py-0.5 w-9 rounded bg-slate-50 text-slate-400 border-slate-300 dark:border-slate-600 dark:bg-slate-700 group-hover:border-sky-500 group-hover:text-slate-500 group-hover:bg-white dark:bg-opacity-50 dark:hover:bg-opacity-100 dark:group-hover:bg-slate-700 dark:group-hover:text-slate-300 transition-colors duration-150"
												>
													Dev
												</div></a
											>
											<a rel="noreferrer" target="_blank" href="https://{results.live}/page"
												><div
													class="border py-0.5 px-1 w-9 rounded bg-slate-50 text-slate-400 border-slate-300 dark:border-slate-600 dark:bg-slate-700 group-hover:border-lime-500 group-hover:text-slate-500 group-hover:bg-white dark:bg-opacity-50 dark:hover:bg-opacity-100 dark:group-hover:bg-slate-700 dark:group-hover:text-slate-300 transition-colors duration-150"
												>
													Live
												</div></a
											>
										</div>
									</div>
								{/each}
								{#if Object.keys(filteredBooks).length === 0}
									<div class="p-6 text-center">
										No results for "<span class=" font-semibold">{searchTerm}</span>"
									</div>
								{/if}
							</div>
							<button
								type="button"
								class="px-1 py-0.5 outline outline-1 outline-slate-300 bg-slate-50 absolute right-6 top-[26px] text-xs font-code rounded dark:bg-slate-600 dark:outline-slate-500"
								on:click={dialogsearch.close}
							>
								ESC
							</button>
						</div>
					</Transition>
				</div>
			</div>
		</Transition>
	</div>
</header>
