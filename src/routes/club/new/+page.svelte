<script>
	import { Input } from '$lib/components';
	import placehold from '$lib/images/placehold.svg';
	import { onMount } from 'svelte';

	const showPreview = (event) => {
		const target = event.target;
		const files = target.files;
		if (files.length > 0) {
			const src = URL.createObjectURL(files[0]);
			const preview = document.getElementById('img-preview');
			preview.src = src;
		}
	};

	const checkUrl = (event) => {
		const target = event.target;
		let value = target.value;
		target.value = value.replace(/(https?:\/\/)?(www.)?/i, '');
	};

	onMount(() => {
		document.getElementById('dev').addEventListener('change', checkUrl);
		document.getElementById('test').addEventListener('change', checkUrl);
		document.getElementById('uat').addEventListener('change', checkUrl);
		document.getElementById('sandbox').addEventListener('change', checkUrl);
		document.getElementById('live').addEventListener('change', checkUrl);
	});
</script>

<div class="flex flex-col items-center h-full w-full">
	<div class="w-full">
		<form
			action="?/create"
			method="POST"
			class="w-full max-w-sm mx-auto"
			enctype="multipart/form-data"
		>
			<h2 class="mb-8 text-center text-3xl font-bold text-slate-800 dark:text-slate-50">
				About this project
			</h2>
			<label for="thumbnail" class="w-20 hover:cursor-pointer">
				<label for="thumbnail" class="absolute -top-1.5 -right-1.5 hover:cursor-pointer" />

				<div class="w-20 h-20 mb-4 mx-auto">
					<img id="img-preview" src={placehold} alt="project thumbnail" />
				</div>
			</label>
			<div class="form-control w-full max-w-lg">
				<label
					for="thumbnail"
					class="block text-sm mb-2 font-semibold leading-6 text-gray-700 dark:text-slate-200"
				>
					<span class="">Thumbnail</span>
				</label>
				<input
					type="file"
					name="thumbnail"
					id="thumbnail"
					on:change={showPreview}
					class="block w-full text-sm text-slate-600 dark:text-slate-400 mb-4
					file:mr-4 file:py-2 file:px-4
					file:rounded file:border-0
					file:text-sm file:font-semibold
					file:bg-sky-100 file:text-sky-600 dark:file:bg-gray-700
					hover:file:bg-sky-200 dark:file:hover:bg-gray-600"
				/>
			</div>
			<Input id="name" required="true" label="Club name" />
			<Input id="shortname" label="Short name" />
			<Input id="dev" label="Dev" />
			<Input id="test" label="Test" />
			<Input id="uat" label="UAT" />
			<Input id="sandbox" label="Sandbox" />
			<Input id="live" label="Live" />

			<div class="w-full max-w-lg pt-6">
				<button
					type="submit"
					class="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-800 text-white hover:bg-slate-700 w-full dark:bg-lime-600 dark:border dark:border-lime-500 dark:hover:bg-lime-500 transition-colors duration-150"
					>Create Project</button
				>
			</div>
		</form>
	</div>
</div>
