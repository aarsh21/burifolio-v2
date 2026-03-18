import type { BlogPostMeta, BlogPostSummary } from '$lib/types/content';

type BlogPostModule = {
	metadata?: Partial<BlogPostMeta>;
};

const postModules = import.meta.glob('/src/routes/blog/**/+page.svx', {
	eager: true
}) as Record<string, BlogPostModule>;

function parseSlug(filePath: string) {
	return filePath.replace('/src/routes/blog/', '').replace('/+page.svx', '');
}

function assertString(value: unknown, field: string, filePath: string): string {
	if (typeof value !== 'string' || value.length === 0) {
		throw new Error(`Missing ${field} in ${filePath}`);
	}

	return value;
}

function normalizeMetadata(filePath: string, metadata?: Partial<BlogPostMeta>): BlogPostMeta {
	return {
		title: assertString(metadata?.title, 'title', filePath),
		description: assertString(metadata?.description, 'description', filePath),
		date: assertString(metadata?.date, 'date', filePath),
		draft: Boolean(metadata?.draft),
		tags: Array.isArray(metadata?.tags)
			? metadata.tags.filter((tag): tag is string => typeof tag === 'string')
			: undefined
	};
}

function createSummary(filePath: string, module: BlogPostModule): BlogPostSummary {
	return {
		slug: parseSlug(filePath),
		metadata: normalizeMetadata(filePath, module.metadata)
	};
}

const allPosts = Object.entries(postModules)
	.map(([filePath, module]) => createSummary(filePath, module))
	.sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());

export function getAllPosts() {
	return allPosts;
}

export function getPublishedPosts() {
	return getAllPosts().filter((post) => !post.metadata.draft);
}

export function getRecentPosts(limit: number) {
	return getPublishedPosts().slice(0, limit);
}

export function getPostBySlug(slug: string) {
	return getAllPosts().find((post) => post.slug === slug);
}
