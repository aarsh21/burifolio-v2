<script lang="ts">
	import { aboutContent, siteConfig } from '$lib/data/site';
</script>

<svelte:head>
	<title>About | {siteConfig.name}</title>
	<meta
		content="More about Aarsh, his background, and the tools he likes working with."
		name="description"
	/>
	<meta content={`${siteConfig.url}/og/home?title=about`} property="og:image" />
</svelte:head>

<main class="animate-fade-in-up space-y-8">
	<header class="border border-gray-800 p-6 sm:p-8">
		<div class="flex flex-col gap-6 sm:flex-row sm:items-center">
			<div
				class="relative h-28 w-28 overflow-hidden rounded-full border border-gray-800 bg-gray-900"
			>
				<img
					alt={siteConfig.name}
					class="h-full w-full object-cover"
					height="112"
					src={siteConfig.avatar}
					width="112"
				/>
			</div>

			<div class="space-y-3">
				<h1 class="text-4xl font-bold text-white">
					<span class="mr-2 text-accent">*</span>
					about
				</h1>
				<p class="text-xl text-white">{siteConfig.name}</p>
				<p class="text-gray-400">{siteConfig.currentRole}</p>
				<p class="text-gray-400">{siteConfig.location}</p>
			</div>
		</div>
	</header>

	<div class="grid gap-6 md:grid-cols-2">
		<section class="border border-gray-800 p-6">
			<h2 class="mb-4 text-lg font-semibold text-white">the story</h2>
			<div class="space-y-4 text-gray-300">
				{#each aboutContent.story as paragraph (paragraph)}
					<p>{paragraph}</p>
				{/each}
			</div>
		</section>

		<section class="border border-gray-800 p-6">
			<h2 class="mb-4 text-lg font-semibold text-white">interests</h2>
			<div class="space-y-4 text-gray-300">
				{#each aboutContent.interests as paragraph (paragraph)}
					<p>{paragraph}</p>
				{/each}
			</div>
		</section>
	</div>

	<section class="border border-gray-800 p-6">
		<h2 class="mb-4 text-lg font-semibold text-white">tech stack</h2>
		<div class="flex flex-wrap gap-2">
			{#each aboutContent.stack as tech (tech)}
				<span class="rounded bg-gray-800/50 px-2 py-1 text-sm text-gray-300">{tech}</span>
			{/each}
		</div>
	</section>
</main>
