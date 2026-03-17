import path from 'node:path';

import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-auto';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { createHighlighter } from 'shiki';

const highlighter = await createHighlighter({
	themes: ['material-theme'],
	langs: [
		'json',
		'javascript',
		'typescript',
		'bash',
		'shell',
		'text',
		'svelte',
		'html',
		'css',
		'python',
		'rust',
		'go',
		'lua',
		'yaml',
		'toml',
		'markdown',
		'diff'
	]
});

const mdsvexConfig = {
	extensions: ['.svx'],
	layout: {
		_: path.resolve('./src/lib/layouts/BlogPostLayout.svelte')
	},
	highlight: {
		highlighter: (code, lang) => {
			const html = highlighter.codeToHtml(code, {
				lang: lang || 'text',
				theme: 'material-theme'
			});
			// Escape Svelte special chars so they render as literal text
			const escaped = html.replace(/\{/g, '&#123;').replace(/\}/g, '&#125;').replace(/`/g, '&#96;');
			return `{@html \`${escaped}\`}`;
		}
	},
	remarkPlugins: [remarkGfm],
	rehypePlugins: [
		rehypeSlug,
		[
			rehypeAutolinkHeadings,
			{
				behavior: 'wrap',
				properties: { className: ['anchor'] }
			}
		]
	]
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},
	vitePlugin: {
		dynamicCompileOptions: ({ filename }) => {
			if (filename.includes('node_modules')) {
				return undefined;
			}

			if (filename.endsWith('.svx') || filename.endsWith('BlogPostLayout.svelte')) {
				return { runes: false };
			}

			return { runes: true };
		}
	},
	preprocess: [mdsvex(mdsvexConfig)],
	extensions: ['.svelte', ...mdsvexConfig.extensions]
};

export default config;
