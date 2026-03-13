<script lang="ts">
	import type { Snippet } from 'svelte';

	import { page } from '$app/state';

	import { siteConfig } from '$lib/data/site';
	import { formatDateLong } from '$lib/utils/date';

	type Props = {
		title: string;
		description: string;
		date: string;
		draft?: boolean;
		tags?: string[];
		children?: Snippet;
	};

	let { title, description, date, draft = false, children }: Props = $props();

	let formattedDate = $derived(formatDateLong(date));
	let canonicalUrl = $derived(`${siteConfig.url}${page.url.pathname}`);
	let imageUrl = $derived(`${siteConfig.url}/og/blog?title=${encodeURIComponent(title)}`);
	let structuredData = $derived(
		JSON.stringify({
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
		})
	);
	let jsonLdTag = $derived(
		'<script type="application/ld+json">' +
			structuredData.replace(/</g, '\\u003c') +
			'<' +
			'/script>'
	);
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
		{@render children?.()}
	</article>
</section>
