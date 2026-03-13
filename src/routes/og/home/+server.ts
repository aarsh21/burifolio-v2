import type { RequestHandler } from './$types';

import { siteConfig } from '$lib/data/site';
import { generateOgImage } from '$lib/server/og';

export const prerender = false;

export const GET: RequestHandler = async ({ url }) => {
	const title = url.searchParams.get('title');
	const text = title
		? `${siteConfig.shortName.toLowerCase()} • ${title}`
		: `${siteConfig.shortName.toLowerCase()} • home`;

	const png = await generateOgImage(text, 1200, 630);

	return new Response(new Uint8Array(png), {
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, max-age=86400, immutable'
		}
	});
};
