import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-auto';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

const mdsvexConfig = {
	extensions: ['.svx'],
	layout: {
		_: './src/lib/layouts/BlogPostLayout.svelte'
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
		],
		[
			rehypePrettyCode,
			{
				theme: {
					dark: 'vesper',
					light: 'vitesse-light'
				},
				keepBackground: false,
				defaultLang: {
					block: 'text',
					inline: 'text'
				}
			}
		]
	]
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter()
	},
	vitePlugin: {
		dynamicCompileOptions: ({ filename }) =>
			filename.includes('node_modules') ? undefined : { runes: true }
	},
	preprocess: [mdsvex(mdsvexConfig)],
	extensions: ['.svelte', ...mdsvexConfig.extensions]
};

export default config;
