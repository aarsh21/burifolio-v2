<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<title>Aarsh Padia</title>
	<meta
		content="Web developer, Linux tinkerer, and AI engineer building thoughtful software and open source tools."
		name="description"
	/>
	<meta content="width=device-width, initial-scale=1" name="viewport" />
	<meta content="Aarsh Padia" property="og:title" />
	<meta
		content="Web developer, Linux tinkerer, and AI engineer building thoughtful software and open source tools."
		property="og:description"
	/>
	<meta content="website" property="og:type" />
	<meta content="https://aarsh.hyorinmaru.me/og/home" property="og:image" />
	<meta content="summary_large_image" name="twitter:card" />
	<meta content="Aarsh Padia" name="twitter:title" />
	<meta content="@bukubukutech" name="twitter:creator" />
	<link href={favicon} rel="icon" />
</svelte:head>

<div class="mx-auto min-h-screen max-w-4xl px-4 py-8 font-mono antialiased">
	<Navbar />
	{@render children()}
</div>
