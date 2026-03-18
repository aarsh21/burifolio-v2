import soundUrl from '../../cherrymx-black-abs/sound.ogg';

let ctx: AudioContext | null = null;
let audioBuffer: AudioBuffer | null = null;
let loading = false;

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
	d: [32492, 169], // scan 32
	u: [25313, 189], // scan 22

	// Toggle nav
	'?': [43105, 190] // scan 53 (/ key)
};

function getCtx() {
	if (!ctx) ctx = new AudioContext();
	if (ctx.state === 'suspended') ctx.resume();
	return ctx;
}

async function loadAudio() {
	if (loading || audioBuffer) return;
	loading = true;
	const ac = getCtx();
	const res = await fetch(soundUrl);
	const buf = await res.arrayBuffer();
	audioBuffer = await ac.decodeAudioData(buf);
	loading = false;
}

export function playKeySound(key: string) {
	const ac = getCtx();

	if (!audioBuffer) {
		loadAudio();
		return;
	}

	const slice = keyMap[key];
	if (!slice) return;

	const [startMs, durationMs] = slice;

	const source = ac.createBufferSource();
	source.buffer = audioBuffer;

	const gain = ac.createGain();
	gain.gain.value = 0.6;

	source.connect(gain).connect(ac.destination);
	source.start(0, startMs / 1000, durationMs / 1000);
}
