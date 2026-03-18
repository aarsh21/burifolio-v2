<script lang="ts">
	import SectionList from '$lib/components/SectionList.svelte';
	import { siteConfig } from '$lib/data/site';
	import { workItems } from '$lib/data/work';
</script>

<svelte:head>
	<title>Work | {siteConfig.name}</title>
	<meta
		content="Work experience across web development, AI systems, and developer tooling."
		name="description"
	/>
	<meta content={`${siteConfig.url}/og/home?title=work`} property="og:image" />
</svelte:head>

<main>
	<h1 class="mb-8 text-4xl font-bold text-white">
		<span class="mr-2 text-accent">*</span>
		work
	</h1>

	<p class="mb-12 leading-relaxed text-gray-400">
		Places I've worked and the kinds of systems, interfaces, and tooling I helped build.
	</p>

	<SectionList items={workItems} showDetails showTitle={false} title="work" />
</main>
