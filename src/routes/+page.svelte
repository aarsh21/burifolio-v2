<script lang="ts">
	import BlogSection from '$lib/components/BlogSection.svelte';
	import Header from '$lib/components/Header.svelte';
	import LinksSection from '$lib/components/LinksSection.svelte';
	import SectionList from '$lib/components/SectionList.svelte';
	import { featuredProjectItems } from '$lib/data/projects';
	import { siteConfig } from '$lib/data/site';
	import { workItems } from '$lib/data/work';

	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const featuredWorkItems = workItems.slice(0, 3);
</script>

<svelte:head>
	<title>{siteConfig.name}</title>
	<meta content={siteConfig.description} name="description" />
</svelte:head>

<Header />
<BlogSection posts={data.posts} />
<SectionList items={featuredWorkItems} title="work" viewAllHref="/work" viewAllText="all work" />
<SectionList
	items={featuredProjectItems}
	title="projects"
	viewAllHref="/projects"
	viewAllText="all projects"
/>
<LinksSection />
