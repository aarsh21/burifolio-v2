export type BlogPostMeta = {
	title: string;
	description: string;
	date: string;
	draft: boolean;
	tags?: string[];
};

export type BlogPostSummary = {
	slug: string;
	metadata: BlogPostMeta;
};

export type SectionItem = {
	title: string;
	href: string;
	meta?: string;
	description: string;
	details?: string[];
};

export type Project = {
	title: string;
	description: string;
	technologies: string[];
	href: string;
	highlights?: string[];
};

export type SocialLink = {
	title: string;
	href: string;
};
