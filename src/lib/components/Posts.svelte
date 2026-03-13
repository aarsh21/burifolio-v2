<script lang="ts">
	import { goto } from '$app/navigation';
	import { tick } from 'svelte';

	import type { BlogPostSummary } from '$lib/types/content';

	import PostItem from './PostItem.svelte';

	type Props = {
		posts: BlogPostSummary[];
	};

	let { posts }: Props = $props();

	let isSearching = $state(false);
	let searchQuery = $state('');
	let selectedIndex = $state(0);
	let itemElements: Record<string, HTMLDivElement | undefined> = $state({});
	let searchInput = $state<HTMLInputElement | null>(null);

	let filteredPosts = $derived(
		posts.filter((item) => item.metadata.title.toLowerCase().includes(searchQuery.toLowerCase()))
	);

	function isTypingContext(target: EventTarget | null) {
		return (
			target instanceof HTMLInputElement ||
			target instanceof HTMLTextAreaElement ||
			(target instanceof HTMLElement && target.isContentEditable)
		);
	}

	async function focusSearch() {
		await tick();
		searchInput?.focus();
	}

	async function scrollSelectedIntoView() {
		await tick();
		itemElements[filteredPosts[selectedIndex]?.slug ?? '']?.scrollIntoView({
			behavior: 'smooth',
			block: 'center'
		});
	}

	async function handleKeydown(event: KeyboardEvent) {
		if (event.key === '/' && !isSearching && !isTypingContext(event.target)) {
			event.preventDefault();
			isSearching = true;
			selectedIndex = 0;
			await focusSearch();
			return;
		}

		if (event.key === 'Escape' && isSearching) {
			isSearching = false;
			searchQuery = '';
			selectedIndex = 0;
			searchInput?.blur();
			return;
		}

		const isNavigationKey =
			((event.ctrlKey || event.metaKey) && (event.key === 'j' || event.key === 'k')) ||
			event.key === 'ArrowDown' ||
			event.key === 'ArrowUp';

		if (isSearching && isNavigationKey) {
			event.preventDefault();
			const isDownward =
				event.key === 'ArrowDown' || ((event.ctrlKey || event.metaKey) && event.key === 'j');
			const maxIndex = Math.max(filteredPosts.length - 1, 0);
			selectedIndex = isDownward
				? Math.min(selectedIndex + 1, maxIndex)
				: Math.max(selectedIndex - 1, 0);
			await scrollSelectedIntoView();
			return;
		}

		if (isSearching && event.key === 'Enter' && filteredPosts.length > 0) {
			event.preventDefault();
			await goto(`/blog/${filteredPosts[selectedIndex].slug}`);
		}
	}

	function handleSearchInput(event: Event) {
		searchQuery = (event.currentTarget as HTMLInputElement).value;
		selectedIndex = 0;
	}

	$effect(() => {
		if (selectedIndex > filteredPosts.length - 1) {
			selectedIndex = Math.max(filteredPosts.length - 1, 0);
		}
	});
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isSearching}
	<div
		class="fixed right-4 bottom-4 left-4 mx-auto max-w-2xl border border-gray-800 bg-black/50 p-2 backdrop-blur-sm"
	>
		<div class="flex items-center text-gray-400">
			<span class="mr-2 text-accent">/</span>
			<input
				aria-activedescendant={isSearching && filteredPosts.length > 0
					? `post-${filteredPosts[selectedIndex].slug}`
					: undefined}
				aria-controls="search-results"
				aria-expanded={filteredPosts.length > 0}
				aria-label="Search posts"
				bind:this={searchInput}
				class="flex-1 bg-transparent outline-none"
				oninput={handleSearchInput}
				placeholder="search posts..."
				role="combobox"
				type="text"
				value={searchQuery}
			/>
		</div>
	</div>
{/if}

<div class="space-y-8 sm:space-y-4" id="search-results">
	{#each filteredPosts as item, index (item.slug)}
		<div bind:this={itemElements[item.slug]}>
			<PostItem isSelected={isSearching && index === selectedIndex} post={item} />
		</div>
	{/each}
</div>
