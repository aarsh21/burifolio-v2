<script lang="ts">
	import { ArrowUpRight } from 'lucide-svelte';

	import { MagicCard } from '$lib/components/magic/magic-card';
	import type { Project } from '$lib/types/content';

	let { title, description, technologies, href, highlights }: Project = $props();

	let linkLabel = $derived(href.includes('github.com') ? 'view source' : 'visit project');
</script>

<MagicCard
	class="rounded-sm"
	gradientColor="#1a1a1a"
	gradientOpacity={0.6}
	gradientFrom="#8259c8"
	gradientTo="#6b3fa0"
	gradientSize={250}
>
	<div class="group p-6">
		<a {href} rel="noopener noreferrer" target="_blank">
			<div class="mb-4 flex items-start justify-between">
				<h2 class="text-2xl font-bold text-white transition-colors group-hover:text-accent">
					{title}
				</h2>
				<ArrowUpRight class="h-5 w-5 text-gray-400 transition-colors group-hover:text-accent" />
			</div>
		</a>

		<p class="mb-6 text-gray-300">{description}</p>

		<div class="space-y-6">
			{#if highlights?.length}
				<div>
					<h3 class="mb-2 font-semibold text-white">highlights</h3>
					<ul class="list-inside list-disc space-y-1 text-gray-400">
						{#each highlights as highlight (highlight)}
							<li>{highlight}</li>
						{/each}
					</ul>
				</div>
			{/if}

			<div>
				<h3 class="mb-2 font-semibold text-white">technologies</h3>
				<div class="flex flex-wrap gap-2">
					{#each technologies as tech (tech)}
						<span class="rounded bg-gray-800/50 px-2 py-1 text-sm text-gray-300">{tech}</span>
					{/each}
				</div>
			</div>

			<a
				class="inline-flex items-center gap-2 text-sm text-accent hover:underline"
				{href}
				rel="noopener noreferrer"
				target="_blank"
			>
				{linkLabel}
				<ArrowUpRight class="h-4 w-4" />
			</a>
		</div>
	</div>
</MagicCard>
