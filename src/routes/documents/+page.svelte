<script>
	import { flip } from 'svelte/animate';
	import { scale, fade } from 'svelte/transition';
	let horizontal = false;
	let next = 1;
	let list = [];
	let delay = 0;
	const addItem = () => {
		delay = 0;
		list = [next++, ...list];
	};
	const removeItem = (number) => {
		delay = 400;
		list = list.filter((n) => n !== number);
	};
</script>

<svelte:head>
	<title>Mber+® Documents</title>
	<meta name="description" content="Mber+® Documents" />
</svelte:head>

<section class="container flex justify-between max-w-screen-2xl">
	<h1 class="text-2xl font-bold text-gray-700 dark:text-gray-200">Mber+® BA Documents</h1>
</section>

<label>
	Horizontal
	<input type="checkbox" bind:checked={horizontal} />
</label>
<button on:click={addItem}>Add</button>
{#each list as n (n)}
	<div animate:flip in:scale out:scale class:horizontal class="container">
		<button on:click={() => removeItem(n)}>{n}</button>
	</div>
{/each}

<style>
	.container {
		width: fit-content; /* necessary for correct button sizes */
	}

	.horizontal {
		display: inline-block;
		margin-left: 10px;
	}
</style>
