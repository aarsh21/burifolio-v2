import fs from 'node:fs/promises';
import path from 'node:path';

import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';

import { siteConfig } from '$lib/data/site';

// In-memory caches — valid for the lifetime of the server process
const fontCache = new Map<string, ArrayBuffer>();
let avatarCache: string | null = null;
const pngCache = new Map<string, Buffer>();

async function loadGoogleFont(font: string, text: string) {
	const cacheKey = `${font}:${text}`;
	const cached = fontCache.get(cacheKey);
	if (cached) return cached;

	const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`;
	const css = await (await fetch(url)).text();
	const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

	if (resource?.[1]) {
		const response = await fetch(resource[1]);
		if (response.status === 200) {
			const data = await response.arrayBuffer();
			fontCache.set(cacheKey, data);
			return data;
		}
	}

	throw new Error('failed to load font data');
}

async function getAvatarBase64(): Promise<string> {
	if (avatarCache) return avatarCache;

	const avatarPath = path.join(process.cwd(), 'static', siteConfig.avatar.replace(/^\//, ''));
	const avatarBuffer = await fs.readFile(avatarPath);
	avatarCache = `data:image/png;base64,${avatarBuffer.toString('base64')}`;
	return avatarCache;
}

function createOgElement(text: string, avatarUrl: string) {
	return {
		type: 'div',
		props: {
			style: {
				height: '100%',
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: '#111',
				fontFamily: 'JetBrains Mono',
				padding: '40px',
				position: 'relative'
			},
			children: [
				{
					type: 'img',
					props: {
						src: avatarUrl,
						style: {
							position: 'absolute',
							bottom: '40px',
							right: '40px',
							width: '80px',
							height: '80px',
							borderRadius: '50%'
						}
					}
				},
				{
					type: 'div',
					props: {
						style: {
							display: 'flex',
							alignItems: 'center',
							gap: '12px',
							maxWidth: '90%'
						},
						children: [
							{
								type: 'span',
								props: {
									style: {
										color: '#ff6b35',
										fontSize: 48,
										flexShrink: 0
									},
									children: '*'
								}
							},
							{
								type: 'h1',
								props: {
									style: {
										fontSize: 48,
										color: '#fff',
										margin: 0,
										lineHeight: 1.2,
										wordBreak: 'break-word',
										overflowWrap: 'break-word',
										maxWidth: '100%'
									},
									children: text
								}
							}
						]
					}
				}
			]
		}
	};
}

export async function generateOgImage(
	text: string,
	width: number,
	height: number
): Promise<Buffer> {
	const cacheKey = `${text}:${width}x${height}`;
	const cached = pngCache.get(cacheKey);
	if (cached) return cached;

	const avatarUrl = await getAvatarBase64();
	const element = createOgElement(text, avatarUrl);
	const fontData = await loadGoogleFont('JetBrains+Mono', text);

	const svg = await satori(element as never, {
		width,
		height,
		fonts: [
			{
				name: 'JetBrains Mono',
				data: fontData,
				style: 'normal'
			}
		]
	});

	const resvg = new Resvg(svg, {
		fitTo: { mode: 'width', value: width }
	});
	const pngData = resvg.render();
	const buffer = Buffer.from(pngData.asPng());

	pngCache.set(cacheKey, buffer);
	return buffer;
}
