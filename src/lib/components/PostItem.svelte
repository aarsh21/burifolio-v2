<script lang="ts">
	import type { BlogPostSummary } from '$lib/types/content';
	import { formatDate } from '$lib/utils/date';

	type Props = {
		post: BlogPostSummary;
		isSelected?: boolean;
	};

	let { post, isSelected = false }: Props = $props();
</script>

<div
	class={`group flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4 ${
		isSelected
			? '-mx-2 border-l-2 border-l-accent/50 bg-gradient-to-r from-accent/10 to-transparent px-2'
			: ''
	}`}
>
	<a
		class="text-gray-200 transition-colors duration-200 hover:text-accent"
		href={`/blog/${post.slug}`}
	>
		{post.metadata.title}
	</a>

	<div class="flex shrink-0 items-center text-sm text-gray-400">
		<span>{formatDate(post.metadata.date)}</span>
	</div>
</div>
