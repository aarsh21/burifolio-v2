<script lang="ts">
	import { ArrowUpRight } from 'lucide-svelte';

	import type { BlogPostSummary } from '$lib/types/content';
	import { formatDate } from '$lib/utils/date';

	type Props = {
		posts: BlogPostSummary[];
	};

	let { posts }: Props = $props();

	let recentPosts = $derived(
		[...posts]
			.sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime())
			.slice(0, 4)
	);
</script>

<section class="mb-16">
	<h2 class="mb-6 flex items-center text-2xl font-bold text-white">
		<span class="mr-2 text-accent">*</span>
		blog
	</h2>

	<div class="space-y-4">
		{#each recentPosts as post (post.slug)}
			<div class="group flex items-center justify-between">
				<a
					class="text-gray-200 transition-colors duration-200 hover:text-accent"
					href={`/blog/${post.slug}`}
				>
					{post.metadata.title}
				</a>

				<span class="text-sm text-gray-400">{formatDate(post.metadata.date)}</span>
			</div>
		{/each}
	</div>

	<a class="group mt-6 inline-flex items-center gap-1 text-accent hover:underline" href="/blog">
		all posts
		<ArrowUpRight
			class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
		/>
	</a>
</section>
