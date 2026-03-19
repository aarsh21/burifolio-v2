import soundUrl from '../../cherrymx-black-abs/sound.ogg';

let ctx: AudioContext | null = null;
let audioBuffer: AudioBuffer | null = null;
let loadPromise: Promise<AudioBuffer> | null = null;

// PC keyboard scan codes → [start_ms, duration_ms] from the CherryMX Black ABS pack
// Mapped to the actual keys used on the site
const keyMap: Record<string, [number, number]> = {
	// Vim scroll
	j: [34425, 176], // scan 36
	k: [34932, 180], // scan 37

	// Tab cycling
	h: [33986, 185], // scan 35
	l: [35410, 190], // scan 38

	// Jump
	g: [33453, 188], // scan 34
	G: [33453, 188], // scan 34 (same physical key)

	// Half-page (Ctrl+d / Ctrl+u — use the letter key sound)
	ctrl: [45327, 165], // scan 29
	d: [32492, 169], // scan 32
	u: [25313, 189], // scan 22

	// Toggle nav
	'/': [43105, 190], // scan 53
	'?': [43105, 190] // scan 53 (/ key)
};

function getCtx() {
	if (!ctx) ctx = new AudioContext();
	if (ctx.state === 'suspended') ctx.resume();
	return ctx;
}

async function loadAudio() {
	if (audioBuffer) return audioBuffer;

	if (!loadPromise) {
		loadPromise = (async () => {
			const ac = getCtx();
			const res = await fetch(soundUrl);
			const buf = await res.arrayBuffer();
			const decoded = await ac.decodeAudioData(buf);
			audioBuffer = decoded;
			return decoded;
		})();

		loadPromise.catch(() => {
			loadPromise = null;
		});
	}

	return loadPromise;
}

export function playKeySound(key: string, delayMs = 0) {
	const slice = keyMap[key];
	if (!slice) return;

	const [startMs, durationMs] = slice;

	void loadAudio()
		.then((buffer) => {
			const ac = getCtx();
			const source = ac.createBufferSource();
			source.buffer = buffer;

			const gain = ac.createGain();
			gain.gain.value = 0.6;

			source.connect(gain).connect(ac.destination);
			source.start(ac.currentTime + delayMs / 1000, startMs / 1000, durationMs / 1000);
		})
		.catch(() => {});
}
