<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import { DotPattern } from '$lib/components/magic/dot-pattern';
	import { siteConfig } from '$lib/data/site';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<title>{siteConfig.name}</title>
	<meta content={siteConfig.description} name="description" />
	<meta content="width=device-width, initial-scale=1" name="viewport" />
	<meta content={siteConfig.name} property="og:title" />
	<meta content={siteConfig.description} property="og:description" />
	<meta content="website" property="og:type" />
	<meta content={siteConfig.url} property="og:url" />
	<meta content={siteConfig.name} property="og:site_name" />
	<meta content={`${siteConfig.url}/og/home`} property="og:image" />
	<meta content="summary_large_image" name="twitter:card" />
	<meta content={siteConfig.name} name="twitter:title" />
	<meta content={siteConfig.description} name="twitter:description" />
	<meta content="@bukubukutech" name="twitter:creator" />
	<link href={favicon} rel="icon" />
</svelte:head>

<div class="relative mx-auto min-h-screen max-w-4xl px-4 py-8 pb-24 font-mono antialiased sm:pb-12">
	<DotPattern
		class="fixed inset-0 -z-10 opacity-[0.15] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]"
		width={24}
		height={24}
		cr={1}
		cx={1}
		cy={1}
	/>
	<Navbar />
	{@render children()}
</div>
