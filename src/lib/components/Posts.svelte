<script lang="ts">
	import { goto } from '$app/navigation';
	import { tick } from 'svelte';

	import type { BlogPostSummary } from '$lib/types/content';
	import { playKeySound } from '$lib/utils/sound';

	import PostItem from './PostItem.svelte';

	type Props = {
		posts: BlogPostSummary[];
	};

	let { posts }: Props = $props();

	let isSearching = $state(false);
	let searchQuery = $state('');
	let selectedIndex = $state(0);
	let itemElements: Record<string, HTMLDivElement | undefined> = {};
	let searchInput: HTMLInputElement | null = null;

	let filteredPosts = $derived(
		posts.filter((item) => item.metadata.title.toLowerCase().includes(searchQuery.toLowerCase()))
	);
	let maxSelectedIndex = $derived(Math.max(filteredPosts.length - 1, 0));
	let activeSelectedIndex = $derived(Math.min(selectedIndex, maxSelectedIndex));
	let selectedPost = $derived(filteredPosts[activeSelectedIndex]);

	function isTypingContext(target: EventTarget | null) {
		return (
			target instanceof HTMLInputElement ||
			target instanceof HTMLTextAreaElement ||
			(target instanceof HTMLElement && target.isContentEditable)
		);
	}

	function captureSearchInput(node: HTMLInputElement) {
		searchInput = node;

		return () => {
			if (searchInput === node) {
				searchInput = null;
			}
		};
	}

	function captureItem(slug: string) {
		return (node: HTMLDivElement) => {
			itemElements[slug] = node;

			return () => {
				delete itemElements[slug];
			};
		};
	}

	async function focusSearch() {
		await tick();
		searchInput?.focus();
	}

	async function scrollSelectedIntoView() {
		await tick();
		itemElements[selectedPost?.slug ?? '']?.scrollIntoView({
			behavior: 'smooth',
			block: 'center'
		});
	}

	async function handleKeydown(event: KeyboardEvent) {
		const isNavigationKey =
			((event.ctrlKey || event.metaKey) && (event.key === 'j' || event.key === 'k')) ||
			event.key === 'ArrowDown' ||
			event.key === 'ArrowUp';

		if (
			event.repeat &&
			(event.key === '/' || event.key === 'Escape' || event.key === 'Enter' || isNavigationKey)
		) {
			return;
		}

		if (event.key === '/' && !isSearching && !isTypingContext(event.target)) {
			event.preventDefault();
			playKeySound('/');
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

		if (isSearching && isNavigationKey) {
			event.preventDefault();
			const isDownward =
				event.key === 'ArrowDown' || ((event.ctrlKey || event.metaKey) && event.key === 'j');
			selectedIndex = isDownward
				? Math.min(activeSelectedIndex + 1, maxSelectedIndex)
				: Math.max(activeSelectedIndex - 1, 0);
			await scrollSelectedIntoView();
			return;
		}

		if (isSearching && event.key === 'Enter' && selectedPost) {
			event.preventDefault();
			await goto(`/blog/${selectedPost.slug}`);
		}
	}

	function handleSearchInput(event: Event) {
		searchQuery = (event.currentTarget as HTMLInputElement).value;
		selectedIndex = 0;
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isSearching}
	<div
		class="fixed right-4 bottom-4 left-4 z-50 mx-auto max-w-2xl border border-gray-800 bg-black/50 p-2 backdrop-blur-sm sm:bottom-10"
	>
		<div class="flex items-center text-gray-400">
			<span class="mr-2 text-accent">/</span>
			<input
				aria-activedescendant={isSearching && selectedPost
					? `post-${selectedPost.slug}`
					: undefined}
				aria-controls="search-results"
				aria-expanded={filteredPosts.length > 0}
				aria-label="Search posts"
				class="flex-1 bg-transparent outline-none"
				oninput={handleSearchInput}
				placeholder="search posts..."
				role="combobox"
				type="text"
				{@attach captureSearchInput}
				value={searchQuery}
			/>
		</div>
	</div>
{/if}

<div class="space-y-8 sm:space-y-4" id="search-results">
	{#each filteredPosts as item (item.slug)}
		<div {@attach captureItem(item.slug)}>
			<PostItem isSelected={isSearching && item.slug === selectedPost?.slug} post={item} />
		</div>
	{/each}
</div>
