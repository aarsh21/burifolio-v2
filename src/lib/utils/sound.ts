const modules = import.meta.glob<string>('/src/cherrymx-black-abs/slices/*.ogg', {
	eager: true,
	query: '?url',
	import: 'default'
});

const scanCodeToUrl = new Map<string, string>();
for (const [path, url] of Object.entries(modules)) {
	const match = path.match(/\/slices\/(\d+)\.ogg$/);
	if (match) scanCodeToUrl.set(match[1], url);
}

let ctx: AudioContext | null = null;
const buffers = new Map<string, AudioBuffer>();
const loading = new Map<string, Promise<AudioBuffer>>();

function getCtx() {
	if (!ctx) ctx = new AudioContext();
	if (ctx.state === 'suspended') ctx.resume();
	return ctx;
}

async function fetchAndDecode(url: string): Promise<AudioBuffer> {
	const ac = getCtx();
	const res = await fetch(url);
	const arrayBuf = await res.arrayBuffer();
	return ac.decodeAudioData(arrayBuf);
}

async function loadByScanCode(scanCode: string): Promise<AudioBuffer | null> {
	const url = scanCodeToUrl.get(scanCode);
	if (!url) return null;

	const cached = buffers.get(scanCode);
	if (cached) return cached;

	const inFlight = loading.get(scanCode);
	if (inFlight) return inFlight;

	const promise = fetchAndDecode(url)
		.then((buf) => {
			buffers.set(scanCode, buf);
			loading.delete(scanCode);
			return buf;
		})
		.catch((err) => {
			loading.delete(scanCode);
			throw err;
		});

	loading.set(scanCode, promise);
	return promise;
}

const codeToScanCode: Record<string, string> = {
	Escape: '1',
	Digit1: '2',
	Digit2: '3',
	Digit3: '4',
	Digit4: '5',
	Digit5: '6',
	Digit6: '7',
	Digit7: '8',
	Digit8: '9',
	Digit9: '10',
	Digit0: '11',
	Minus: '12',
	Equal: '13',
	Backspace: '14',
	Tab: '15',
	KeyQ: '16',
	KeyW: '17',
	KeyE: '18',
	KeyR: '19',
	KeyT: '20',
	KeyY: '21',
	KeyU: '22',
	KeyI: '23',
	KeyO: '24',
	KeyP: '25',
	BracketLeft: '26',
	BracketRight: '27',
	Enter: '28',
	ControlLeft: '29',
	KeyA: '30',
	KeyS: '31',
	KeyD: '32',
	KeyF: '33',
	KeyG: '34',
	KeyH: '35',
	KeyJ: '36',
	KeyK: '37',
	KeyL: '38',
	Semicolon: '39',
	Quote: '40',
	Backquote: '41',
	ShiftLeft: '42',
	Backslash: '43',
	KeyZ: '44',
	KeyX: '45',
	KeyC: '46',
	KeyV: '47',
	KeyB: '48',
	KeyN: '49',
	KeyM: '50',
	Comma: '51',
	Period: '52',
	Slash: '53',
	ShiftRight: '54',
	NumpadMultiply: '55',
	AltLeft: '56',
	Space: '57',
	CapsLock: '58',
	F1: '59',
	F2: '60',
	F3: '61',
	F4: '62',
	F5: '63',
	F6: '64',
	F7: '65',
	F8: '66',
	F9: '67',
	F10: '68',
	NumLock: '69',
	ScrollLock: '70',
	Numpad7: '71',
	Numpad8: '72',
	Numpad9: '73',
	NumpadSubtract: '74',
	Numpad4: '75',
	Numpad5: '76',
	Numpad6: '77',
	NumpadAdd: '78',
	Numpad1: '79',
	Numpad2: '80',
	Numpad3: '81',
	Numpad0: '82',
	NumpadDecimal: '83',
	F11: '87',
	F12: '88',
	ControlRight: '3613',
	AltRight: '3640'
};

const keyToScanCode: Record<string, string> = {
	j: '36',
	k: '37',
	h: '35',
	l: '38',
	g: '34',
	G: '34',
	ctrl: '29',
	d: '32',
	u: '22',
	'/': '53',
	'?': '53'
};

let preloaded = false;

export function preloadSound() {
	if (preloaded) return;
	preloaded = true;

	// Preload the vim shortcut sounds first
	const vimScanCodes = new Set(Object.values(keyToScanCode));
	for (const sc of vimScanCodes) {
		void loadByScanCode(sc).catch(() => {});
	}
}

export function playTypingSound(code: string) {
	const scanCode = codeToScanCode[code];
	if (!scanCode) return;

	void loadByScanCode(scanCode)
		.then((buffer) => {
			if (!buffer) return;
			const ac = getCtx();
			const source = ac.createBufferSource();
			source.buffer = buffer;

			const gain = ac.createGain();
			gain.gain.value = 0.6;

			source.connect(gain).connect(ac.destination);
			source.start(ac.currentTime);
		})
		.catch(() => {});
}

export function playKeySound(key: string, delayMs = 0) {
	const scanCode = keyToScanCode[key];
	if (!scanCode) return;

	void loadByScanCode(scanCode)
		.then((buffer) => {
			if (!buffer) return;
			const ac = getCtx();
			const source = ac.createBufferSource();
			source.buffer = buffer;

			const gain = ac.createGain();
			gain.gain.value = 0.6;

			source.connect(gain).connect(ac.destination);
			source.start(ac.currentTime + delayMs / 1000);
		})
		.catch(() => {});
}
