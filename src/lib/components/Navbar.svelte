<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { Briefcase, FolderOpen, Home, Notebook, User } from 'lucide-svelte';
	import { onDestroy, onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { playKeySound } from '$lib/utils/sound';

	const navItems = [
		{ href: '/', label: 'home', icon: Home },
		{ href: '/about', label: 'about', icon: User },
		{ href: '/blog', label: 'blog', icon: Notebook },
		{ href: '/work', label: 'work', icon: Briefcase },
		{ href: '/projects', label: 'projects', icon: FolderOpen }
	];

	function activeIndex() {
		return navItems.findIndex((item) => isActive(item.href));
	}

	let scrollPercent = $state(0);
	let lastGPress = $state(0);
	let pressedKey = $state('');
	let pressedTimeout: ReturnType<typeof setTimeout> | undefined;
	let showNav = $state(false);
	let showHint = $state(false);

	onMount(() => {
		showNav = localStorage.getItem('showNav') === 'true';
		updateScrollPercent();

		if (localStorage.getItem('hintDismissed')) return;

		showHint = true;
		const hintTimeout = setTimeout(() => {
			showHint = false;
			localStorage.setItem('hintDismissed', 'true');
		}, 6000);

		return () => clearTimeout(hintTimeout);
	});

	onDestroy(() => {
		clearTimeout(pressedTimeout);
	});

	function flash(key: string) {
		pressedKey = key;
		clearTimeout(pressedTimeout);
		pressedTimeout = setTimeout(() => {
			pressedKey = '';
		}, 200);
	}

	function toggleNav() {
		showNav = !showNav;
		localStorage.setItem('showNav', String(showNav));
	}

	function isActive(href: string) {
		if (href === '/') return page.url.pathname === '/';
		return page.url.pathname.startsWith(href);
	}

	function shouldIgnoreShortcut(event: KeyboardEvent) {
		const target = event.target;
		return (
			target instanceof HTMLInputElement ||
			target instanceof HTMLTextAreaElement ||
			(target instanceof HTMLElement && target.isContentEditable)
		);
	}

	function updateScrollPercent() {
		const docHeight = document.documentElement.scrollHeight - window.innerHeight;
		scrollPercent = docHeight > 0 ? Math.round((window.scrollY / docHeight) * 100) : 0;
	}

	async function handleKeydown(event: KeyboardEvent) {
		if (shouldIgnoreShortcut(event)) return;
		if (event.repeat) return;

		// ? toggles navbar
		if (event.key === '?' && !event.ctrlKey && !event.metaKey && !event.altKey) {
			event.preventDefault();
			playKeySound('?');
			toggleNav();
			return;
		}

		// Vim scroll controls (no meta/alt)
		if (!event.metaKey && !event.altKey && !event.ctrlKey) {
			if (event.key === 'j') {
				event.preventDefault();
				playKeySound('j');
				flash('j');
				window.scrollBy({ top: 80, behavior: 'smooth' });
				return;
			}
			if (event.key === 'k') {
				event.preventDefault();
				playKeySound('k');
				flash('k');
				window.scrollBy({ top: -80, behavior: 'smooth' });
				return;
			}
			if (event.key === 'G') {
				event.preventDefault();
				playKeySound('G');
				flash('G');
				window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
				return;
			}
			if (event.key === 'g') {
				const now = Date.now();
				if (now - lastGPress < 500) {
					event.preventDefault();
					playKeySound('g');
					flash('gg');
					window.scrollTo({ top: 0, behavior: 'smooth' });
					lastGPress = 0;
					return;
				}
				lastGPress = now;
				return;
			}
		}

		// Ctrl+d / Ctrl+u — half-page scroll
		if (event.ctrlKey && !event.metaKey && !event.altKey) {
			if (event.key === 'd') {
				event.preventDefault();
				playKeySound('d');
				flash('C-d');
				window.scrollBy({ top: window.innerHeight / 2, behavior: 'smooth' });
				return;
			}
			if (event.key === 'u') {
				event.preventDefault();
				playKeySound('u');
				flash('C-u');
				window.scrollBy({ top: -window.innerHeight / 2, behavior: 'smooth' });
				return;
			}
		}

		// h/l — cycle tabs left/right (no modifiers)
		if (!event.metaKey && !event.ctrlKey && !event.altKey) {
			if (event.key === 'h') {
				event.preventDefault();
				playKeySound('h');
				flash('h');
				const idx = activeIndex();
				const prev = idx > 0 ? idx - 1 : navItems.length - 1;
				await goto(navItems[prev].href);
				return;
			}
			if (event.key === 'l') {
				event.preventDefault();
				playKeySound('l');
				flash('l');
				const idx = activeIndex();
				const next = idx < navItems.length - 1 ? idx + 1 : 0;
				await goto(navItems[next].href);
				return;
			}
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} onscroll={updateScrollPercent} />

<!-- Desktop top navbar (togglable) -->
{#if showNav}
	<nav class="mb-10 hidden sm:block" transition:slide={{ duration: 200 }}>
		<div class="flex items-center justify-center gap-8 py-3 text-sm">
			{#each navItems as item (item.href)}
				{@const active = isActive(item.href)}
				<a
					href={item.href}
					class="flex items-center gap-2 transition-colors duration-150 {active
						? 'text-accent'
						: 'text-muted-foreground/40 hover:text-muted-foreground'}"
				>
					<item.icon class="h-3.5 w-3.5" />
					{item.label}
				</a>
			{/each}
		</div>
		<div class="h-px bg-border/40"></div>
	</nav>
{/if}

<!-- Desktop statusline (fixed bottom) -->
<div class="fixed right-0 bottom-0 left-0 z-40 hidden sm:block">
	<div class="mx-auto max-w-4xl px-4">
		<div
			class="flex items-center justify-between border-t border-border bg-background/95 py-1.5 text-xs backdrop-blur-sm"
		>
			<!-- Left: nav tabs -->
			<div class="flex items-center gap-3">
				<span class="flex items-center">
					{#each navItems as item, i (item.href)}
						{@const active = isActive(item.href)}
						{#if i > 0}
							<span class="px-1 text-muted-foreground/20">|</span>
						{/if}
						<a
							href={item.href}
							class="px-1.5 py-0.5 transition-colors duration-100 {active
								? 'text-accent'
								: 'text-muted-foreground/50 hover:text-muted-foreground'}"
						>
							{item.label}
						</a>
					{/each}
				</span>
			</div>

			<!-- Right: key hints + nav toggle + scroll % -->
			<div class="flex items-center gap-4 text-muted-foreground/40">
				<span class="flex items-center gap-0.5">
					<span class="transition-colors duration-100 {pressedKey === 'h' ? 'text-accent' : ''}"
						>h</span
					>
					<span>/</span>
					<span class="transition-colors duration-100 {pressedKey === 'l' ? 'text-accent' : ''}"
						>l</span
					>
				</span>
				<span class="flex items-center gap-0.5">
					<span class="transition-colors duration-100 {pressedKey === 'j' ? 'text-accent' : ''}"
						>j</span
					>
					<span>/</span>
					<span class="transition-colors duration-100 {pressedKey === 'k' ? 'text-accent' : ''}"
						>k</span
					>
				</span>
				<span class="flex items-center gap-0.5">
					<span class="transition-colors duration-100 {pressedKey === 'gg' ? 'text-accent' : ''}"
						>gg</span
					>
					<span>/</span>
					<span class="transition-colors duration-100 {pressedKey === 'G' ? 'text-accent' : ''}"
						>G</span
					>
				</span>
				<span class="flex items-center gap-0.5">
					<span class="transition-colors duration-100 {pressedKey === 'C-d' ? 'text-accent' : ''}"
						>^d</span
					>
					<span>/</span>
					<span class="transition-colors duration-100 {pressedKey === 'C-u' ? 'text-accent' : ''}"
						>^u</span
					>
				</span>

				<!-- Nav toggle -->
				<button
					onclick={toggleNav}
					class="group flex items-center gap-1.5"
					title={showNav ? 'Hide navbar (?)' : 'Show navbar (?)'}
				>
					<span
						class="relative inline-flex h-3 w-6 items-center rounded-full transition-colors {showNav
							? 'bg-accent/30'
							: 'bg-muted-foreground/15'}"
					>
						<span
							class="inline-block h-2 w-2 rounded-full transition-all duration-200 {showNav
								? 'translate-x-3 bg-accent'
								: 'translate-x-0.5 bg-muted-foreground/40'}"
						></span>
					</span>
					<span
						class="transition-colors duration-150 {showNav
							? 'text-accent'
							: 'text-muted-foreground/30 group-hover:text-muted-foreground/50'}"
					>
						nav
					</span>
				</button>

				<span class="text-accent tabular-nums">{scrollPercent}%</span>
			</div>
		</div>
	</div>
</div>

<!-- First-visit hint -->
{#if showHint}
	<div
		class="animate-fade-in fixed bottom-10 left-1/2 z-50 hidden -translate-x-1/2 sm:block"
		role="status"
	>
		<button
			onclick={() => {
				showHint = false;
				localStorage.setItem('hintDismissed', 'true');
			}}
			class="rounded-lg border border-border/50 bg-card/95 px-4 py-2.5 text-xs text-muted-foreground shadow-lg backdrop-blur-sm transition-opacity hover:opacity-80"
		>
			press <kbd class="rounded border border-border px-1.5 py-0.5 text-accent">?</kbd> for
			navigation · <kbd class="rounded border border-border px-1.5 py-0.5 text-accent">j</kbd><kbd
				class="rounded border border-border px-1.5 py-0.5 text-accent">k</kbd
			> to scroll
		</button>
	</div>
{/if}

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
