<script lang="ts">
	import { goto } from '$app/navigation';

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

		switch (event.key.toLowerCase()) {
			case 'h':
				await goto('/');
				break;
			case 'a':
				await goto('/about');
				break;
			case 'b':
				await goto('/blog');
				break;
			case 'w':
				await goto('/work');
				break;
			case 'p':
				await goto('/projects');
				break;
			default:
				break;
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<nav class="mb-12 flex items-center justify-between text-sm">
	<div class="flex space-x-4">
		<a class="transition-colors duration-200 hover:text-accent" href="/">[h] home</a>
		<a class="transition-colors duration-200 hover:text-accent" href="/about">[a] about</a>
		<a class="transition-colors duration-200 hover:text-accent" href="/blog">[b] blog</a>
		<a class="transition-colors duration-200 hover:text-accent" href="/work">[w] work</a>
		<a class="transition-colors duration-200 hover:text-accent" href="/projects">[p] projects</a>
	</div>
</nav>
