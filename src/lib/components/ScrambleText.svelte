<script lang="ts">
	import { onMount } from 'svelte';

	type Props = {
		text: string;
		class?: string;
		speed?: number;
		tick?: number;
		step?: number;
		scramble?: number;
		seed?: number;
	};

	let {
		text,
		class: className = '',
		speed = 0.5,
		tick = 1,
		step = 1,
		scramble = 5,
		seed = 3
	}: Props = $props();

	const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	let displayText = $state('');
	let isMounted = false;

	let timer: ReturnType<typeof setInterval> | undefined;
	let runId = 0;

	function createScrambledFrame(source: string, frame: number, salt: number) {
		return source
			.split('')
			.map((char, index) => {
				if (/\s/.test(char)) {
					return char;
				}

				if (frame >= index * scramble + scramble) {
					return char;
				}

				const randomIndex = (seed + salt * 17 + frame * 13 + index * 7) % alphabet.length;
				return alphabet[randomIndex];
			})
			.join('');
	}

	function stopAnimation() {
		if (timer) {
			clearInterval(timer);
			timer = undefined;
		}
	}

	function startAnimation() {
		stopAnimation();
		runId += 1;

		if (!text) {
			displayText = '';
			return;
		}

		let frame = 0;
		const localRunId = runId;
		const interval = Math.max(16, Math.round((40 / speed) * tick));

		displayText = createScrambledFrame(text, frame, localRunId);

		timer = setInterval(() => {
			frame += step;
			displayText = createScrambledFrame(text, frame, localRunId);

			if (frame >= text.length * scramble + scramble) {
				displayText = text;
				stopAnimation();
			}
		}, interval);
	}

	onMount(() => {
		isMounted = true;
		startAnimation();

		return () => {
			stopAnimation();
		};
	});

	$effect(() => {
		text;

		if (!isMounted) {
			displayText = text;
			return;
		}

		startAnimation();
	});
</script>

<span class={className}>{displayText}</span>
