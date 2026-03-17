<script lang="ts">
	import { Building2, MapPin } from 'lucide-svelte';

	import { homeBlurb, siteConfig } from '$lib/data/site';
</script>

<header class="mb-16 space-y-4">
	<div class="flex flex-col gap-6 sm:flex-row sm:items-center">
		<div class="relative h-24 w-24 overflow-hidden rounded-full border border-gray-800 bg-gray-900">
			<img
				alt={siteConfig.name}
				class="absolute inset-0 h-full w-full object-cover"
				src={siteConfig.avatar}
			/>
		</div>

		<div class="space-y-4">
			<h1 class="text-4xl font-bold text-white">{siteConfig.name}</h1>

			<div class="flex flex-col gap-2 text-gray-400">
				<div class="flex items-center gap-2">
					<MapPin class="h-4 w-4" />
					{siteConfig.location}
				</div>

				<div class="flex items-center gap-2">
					<Building2 class="h-4 w-4" />
					{siteConfig.currentRole}
				</div>
			</div>
		</div>
	</div>

	<p class="leading-relaxed">
		{homeBlurb}
	</p>

	<a class="inline-flex items-center text-sm text-accent hover:underline" href="/about"
		>more about me</a
	>
</header>
