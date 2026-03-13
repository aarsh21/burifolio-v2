<script lang="ts">
	/* eslint-disable svelte/no-immutable-reactive-statements */
	import { page } from '$app/state';

	import { siteConfig } from '$lib/data/site';
	import { formatDateLong } from '$lib/utils/date';

	export let title: string;
	export let description: string;
	export let date: string;
	export let draft = false;
	let formattedDate = '';
	let canonicalUrl = '';
	let imageUrl = '';
	let structuredData = '';
	let jsonLdTag = '';

	$: formattedDate = formatDateLong(date);
	$: canonicalUrl = `${siteConfig.url}${page.url.pathname}`;
	$: imageUrl = `${siteConfig.url}/og/blog?title=${encodeURIComponent(title)}`;
	$: structuredData = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: title,
		datePublished: date,
		dateModified: date,
		description,
		image: imageUrl,
		url: canonicalUrl,
		author: {
			'@type': 'Person',
			name: siteConfig.name
		}
	});
	$: jsonLdTag =
		'<script type="application/ld+json">' +
		structuredData.replace(/</g, '\\u003c') +
		'<' +
		'/script>';
</script>

<svelte:head>
	<title>{title} | {siteConfig.name}</title>
	<meta content={description} name="description" />
	<link href={canonicalUrl} rel="canonical" />
	<meta content={title} property="og:title" />
	<meta content={description} property="og:description" />
	<meta content="article" property="og:type" />
	<meta content={canonicalUrl} property="og:url" />
	<meta content={imageUrl} property="og:image" />
	<meta content={title} name="twitter:title" />
	<meta content={description} name="twitter:description" />
	<meta content="summary_large_image" name="twitter:card" />
	<meta content="@bukubukutech" name="twitter:creator" />
	<meta content={imageUrl} name="twitter:image" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html jsonLdTag}
</svelte:head>

<section class="animate-fade-in-up">
	{#if draft}
		<div
			class="mb-6 rounded-lg border border-yellow-500/20 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-500"
		>
			This post is a draft and is not listed publicly.
		</div>
	{/if}

	<h1 class="mb-4 text-4xl font-bold text-white">
		<span class="mr-2 text-accent">*</span>
		{title}
	</h1>

	<div class="mb-8 flex items-center justify-between text-sm text-gray-400">
		<span>{formattedDate}</span>
	</div>

	<article
		class="prose max-w-none prose-invert prose-headings:text-white prose-a:text-white hover:prose-a:underline"
	>
		<slot />
	</article>
</section>
