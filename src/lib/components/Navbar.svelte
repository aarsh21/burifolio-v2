<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { Briefcase, FolderOpen, Home, Notebook, User } from 'lucide-svelte';

	const navItems = [
		{ href: '/', label: 'Home', key: 'h', icon: Home },
		{ href: '/about', label: 'About', key: 'a', icon: User },
		{ href: '/blog', label: 'Blog', key: 'b', icon: Notebook },
		{ href: '/work', label: 'Work', key: 'w', icon: Briefcase },
		{ href: '/projects', label: 'Projects', key: 'p', icon: FolderOpen }
	];

	function isActive(href: string) {
		if (href === '/') return page.url.pathname === '/';
		return page.url.pathname.startsWith(href);
	}

	function shouldIgnoreShortcut(event: KeyboardEvent) {
		const target = event.target;

		if (
			target instanceof HTMLInputElement ||
			target instanceof HTMLTextAreaElement ||
			(target instanceof HTMLElement && target.isContentEditable)
		) {
			return true;
		}

		return event.metaKey || event.ctrlKey || event.altKey;
	}

	async function handleKeydown(event: KeyboardEvent) {
		if (shouldIgnoreShortcut(event)) {
			return;
		}

		const item = navItems.find((n) => n.key === event.key.toLowerCase());
		if (item) {
			await goto(item.href);
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- Desktop nav -->
<nav class="mb-12 hidden items-center justify-between text-sm sm:flex">
	<div class="flex space-x-4">
		{#each navItems as item (item.href)}
			<a
				class="transition-colors duration-200 hover:text-accent"
				class:text-accent={isActive(item.href)}
				href={item.href}>[{item.key}] {item.label.toLowerCase()}</a
			>
		{/each}
	</div>
</nav>

<!-- Mobile bottom dock -->
<nav
	class="fixed inset-x-0 bottom-4 z-50 mx-auto flex w-fit items-center gap-1 rounded-2xl border border-gray-800 bg-[#1a1a1a]/90 px-2 py-2 shadow-lg backdrop-blur-md sm:hidden"
>
	{#each navItems as item (item.href)}
		<a
			href={item.href}
			class="flex flex-col items-center gap-0.5 rounded-xl px-4 py-1.5 text-[10px] transition-all duration-200 {isActive(
				item.href
			)
				? 'bg-accent/10 text-accent'
				: 'text-gray-500'}"
		>
			<item.icon class="h-5 w-5" />
			{item.label}
		</a>
	{/each}
</nav>
