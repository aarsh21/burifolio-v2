import type { Project, SectionItem } from '$lib/types/content';

export const projects: Project[] = [
	{
		title: 'Night',
		description:
			'A cross-platform client for Suwayomi Manga Server with native desktop and Android builds.',
		technologies: ['Tauri', 'Svelte', 'TypeScript', 'Desktop', 'Android'],
		href: 'https://github.com/aarsh21/night'
	},
	{
		title: 'Writer',
		description: 'A collaborative document editor with real-time sync powered by Convex.',
		technologies: ['Tauri', 'React', 'Convex', 'Collaboration', 'Desktop App'],
		href: 'https://github.com/aarsh21/writer'
	},
	{
		title: 'Slime Link',
		description:
			'An open-source link management platform built as a polished alternative to link-in-bio tools.',
		technologies: ['Svelte', 'Firebase', 'Responsive Design', 'Open Source'],
		href: 'https://slime-link.vercel.app/'
	},
	{
		title: 'Chat App',
		description:
			'A Discord-inspired full-stack chat app with real-time communication, voice, and authentication flows.',
		technologies: ['Next.js', 'Neon DB', 'Prisma', 'LiveKit', 'Clerk', 'TypeScript'],
		href: 'https://discord-clone-production-cc9a.up.railway.app/invite/e8e71148-aba9-42d2-99d5-8ab8c28acdc9'
	},
	{
		title: 'Article Digester',
		description:
			'A URL-based article summarizer with Redux Toolkit state management and RapidAPI integration.',
		technologies: ['React', 'Redux Toolkit', 'Vite', 'Tailwind CSS', 'RapidAPI'],
		href: 'https://articledigester.netlify.app/'
	}
];

export const featuredProjectItems: SectionItem[] = projects.slice(0, 3).map((project) => ({
	title: project.title,
	href: project.href,
	meta: project.technologies.slice(0, 3).join(' • '),
	description: project.description
}));
