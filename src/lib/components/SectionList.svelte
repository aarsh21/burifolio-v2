<script lang="ts">
	import { ArrowUpRight } from 'lucide-svelte';

	import type { SectionItem } from '$lib/types/content';

	type Props = {
		title: string;
		items: SectionItem[];
		viewAllHref?: string;
		viewAllText?: string;
		showTitle?: boolean;
		showDetails?: boolean;
	};

	let {
		title,
		items,
		viewAllHref,
		viewAllText,
		showTitle = true,
		showDetails = false
	}: Props = $props();
</script>

<section class="animate-fade-in-up mb-16">
	{#if showTitle}
		<h2 class="mb-6 flex items-center text-2xl font-bold text-white">
			<span class="mr-2 text-accent">*</span>
			{title}
		</h2>
	{/if}

	<div class="space-y-8">
		{#each items as item (item.title)}
			<div class="group">
				<a href={item.href} rel="noopener noreferrer" target="_blank">
					<h3
						class="mb-1 text-xl font-semibold text-white transition-colors duration-200 group-hover:text-accent"
					>
						{item.title}
					</h3>

					{#if item.meta}
						<p class="mb-2 text-sm text-gray-400">{item.meta}</p>
					{/if}

					<p class="text-gray-300">{item.description}</p>

					{#if showDetails && item.details?.length}
						<ul class="mt-4 list-disc space-y-2 pl-5 text-sm text-gray-400">
							{#each item.details as detail (detail)}
								<li>{detail}</li>
							{/each}
						</ul>
					{/if}
				</a>
			</div>
		{/each}
	</div>

	{#if viewAllHref && viewAllText}
		<a
			class="group mt-6 inline-flex items-center gap-1 text-accent hover:underline"
			href={viewAllHref}
		>
			{viewAllText}
			<ArrowUpRight
				class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
			/>
		</a>
	{/if}
</section>
