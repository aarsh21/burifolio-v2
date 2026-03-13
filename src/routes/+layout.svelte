<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
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

<div class="mx-auto min-h-screen max-w-4xl px-4 py-8 font-mono antialiased">
	<Navbar />
	{@render children()}
</div>
