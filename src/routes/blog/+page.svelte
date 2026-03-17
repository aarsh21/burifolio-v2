<script lang="ts">
	import Posts from '$lib/components/Posts.svelte';
	import { siteConfig } from '$lib/data/site';

	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Blog | {siteConfig.name}</title>
	<meta
		content="Notes on Linux, developer tools, workflows, and software that sticks."
		name="description"
	/>
	<meta content={`${siteConfig.url}/og/home?title=blog`} property="og:image" />
</svelte:head>

<main class="relative">
	<h1 class="mb-8 text-4xl font-bold text-white">
		<span class="mr-2 text-accent">*</span>
		blog
	</h1>

	<p class="mb-8 hidden text-sm text-gray-400 sm:block">
		press <kbd class="rounded border border-gray-700 px-1 py-0.5 text-xs">/</kbd> to search • use
		<kbd class="rounded border border-gray-700 px-1 py-0.5 text-xs">ctrl / ⌘ j</kbd> and
		<kbd class="rounded border border-gray-700 px-1 py-0.5 text-xs">ctrl / ⌘ k</kbd> or
		<kbd class="rounded border border-gray-700 px-1 py-0.5 text-xs">↑</kbd> and
		<kbd class="rounded border border-gray-700 px-1 py-0.5 text-xs">↓</kbd> to navigate
	</p>

	<Posts posts={data.posts} />
</main>
