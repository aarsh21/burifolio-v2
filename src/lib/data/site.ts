import { env } from '$env/dynamic/public';

import type { SocialLink } from '$lib/types/content';

const defaultSiteUrl = 'https://aarsh.hyorinmaru.me';

export const siteConfig = {
	name: 'Aarsh Padia',
	shortName: 'Aarsh',
	description:
		'Web developer, Linux tinkerer, and AI engineer building thoughtful software and open source tools.',
	url: env.PUBLIC_SITE_URL ?? defaultSiteUrl,
	location: 'Rajkot, Gujarat, India',
	email: 'aarshpersonal@proton.me',
	currentRole: 'MLOps & AI engineer at Senpiper Technologies',
	avatar: '/profile.jpg',
	github: 'https://github.com/aarsh21',
	linkedin: 'https://www.linkedin.com/in/aarshpadia21/',
	x: 'https://x.com/buhhfps',
	twitch: 'https://twitch.tv/buhhfps',
	youtube: 'https://www.youtube.com/@aaisuuuu',
	meeting: 'https://cal.com/aarsh.hyorinmaru.me/30min?overlayCalendar=true',
	resume: 'https://drive.google.com/uc?export=download&id=11OOFNEjwML-2tdqofzNmMlmquTaYNOaY'
} as const;

export const homeBlurb =
	'22 y/o CS graduate from Rajkot, Gujarat. Building things, playing games, and ricing Arch Linux. This is my corner of the internet.';

export const socialLinks: SocialLink[] = [
	{ title: 'email', href: `mailto:${siteConfig.email}` },
	{ title: 'github', href: siteConfig.github },
	{ title: 'linkedin', href: siteConfig.linkedin },
	{ title: 'x', href: siteConfig.x },
	{ title: 'meeting', href: siteConfig.meeting },
	{ title: 'twitch', href: siteConfig.twitch },
	{ title: 'youtube', href: siteConfig.youtube }
];

export const aboutContent = {
	story: [
		"I'm Aarsh Padia, a CS graduate from Rajkot, Gujarat. I like building products that feel fast, useful, and a little obsessive in the details.",
		'Most of my work lives between web engineering, AI systems, and terminal-first workflows. I enjoy taking rough ideas, shaping them into tools, and then polishing the experience until it feels right.'
	],
	interests: [
		'Outside of work, I spend a lot of time on Linux. Ricing my setup, tuning little workflow details, and living in the terminal is still one of my favorite hobbies.',
		"When I'm away from code, I'm usually playing games, watching anime, or exploring another stack just because it looks fun to learn."
	],
	stack: [
		'TypeScript',
		'React',
		'Svelte',
		'Tauri',
		'Python',
		'Elixir',
		'Linux',
		'Docker',
		'Git',
		'Neovim',
		'Arch Linux',
		'Tailwind CSS'
	],
	currentStatus: {
		status: 'MLOps & AI engineer at Senpiper Technologies',
		timezone: 'IST (UTC+5:30)',
		currentlyLearning: ['Elixir', 'System Design'],
		hobbies: ['Gaming', 'Anime', 'Linux ricing']
	}
} as const;
