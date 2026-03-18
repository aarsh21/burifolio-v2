<script lang="ts">
	import { socialLinks } from '$lib/data/site';
</script>

<section>
	<h2 class="mb-6 flex items-center text-2xl font-bold text-white">
		<span class="mr-2 text-accent">*</span> links
	</h2>

	<div class="flex flex-wrap gap-4 text-sm">
		{#each socialLinks as link (`${link.title}-${link.href}`)}
			<a
				class="text-gray-400 transition-colors duration-200 hover:text-accent"
				href={link.href}
				rel="noopener noreferrer"
				target="_blank"
			>
				{link.title}
			</a>
		{/each}
	</div>
</section>
