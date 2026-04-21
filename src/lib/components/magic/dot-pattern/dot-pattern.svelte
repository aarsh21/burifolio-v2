<script lang="ts">
	import { cn } from '$lib/utils';
	import type { SVGAttributes } from 'svelte/elements';

	interface DotPatternProps extends SVGAttributes<SVGSVGElement> {
		width?: number;
		height?: number;
		x?: number;
		y?: number;
		cx?: number;
		cy?: number;
		cr?: number;
		class?: string;
	}

	let {
		width = 16,
		height = 16,
		x = 0,
		y = 0,
		cx = 1,
		cy = 1,
		cr = 1,
		class: className,
		...props
	}: DotPatternProps = $props();

	const id = $props.id();
</script>

<svg
	aria-hidden="true"
	class={cn('pointer-events-none absolute inset-0 h-full w-full text-neutral-400/80', className)}
	{...props}
>
	<defs>
		<pattern {id} {width} {height} patternUnits="userSpaceOnUse" {x} {y}>
			<circle {cx} {cy} r={cr} fill="currentColor" />
		</pattern>
	</defs>
	<rect width="100%" height="100%" fill="url(#{id})" />
</svg>
