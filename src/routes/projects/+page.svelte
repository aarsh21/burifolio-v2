<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { projects } from '$lib/data/projects';
	import { siteConfig } from '$lib/data/site';
</script>

<svelte:head>
	<title>Projects | {siteConfig.name}</title>
	<meta
		content="Selected projects spanning web apps, desktop tools, and open source experiments."
		name="description"
	/>
	<meta content={`${siteConfig.url}/og/home?title=projects`} property="og:image" />
</svelte:head>

<main class="animate-fade-in-up">
	<h1 class="mb-8 text-4xl font-bold text-white">
		<span class="mr-2 text-accent">*</span>
		projects
	</h1>

	<p class="mb-12 leading-relaxed text-gray-400">
		A few projects I've built across desktop apps, web products, and experiments that started from
		pure curiosity.
	</p>

	<div class="space-y-12">
		{#each projects as project (project.title)}
			<ProjectCard {...project} />
		{/each}
	</div>
</main>
