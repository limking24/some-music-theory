import { Sampler } from 'tone';

const PianoSamples: Record<string, string> = {
	'A3': require('@/assets/audio/notes/piano-a-3.mp3'),
	'C4': require('@/assets/audio/notes/piano-c-4.mp3'),
	'D#4': require('@/assets/audio/notes/piano-d-sharp-4.mp3'),
	'F#4': require('@/assets/audio/notes/piano-f-sharp-4.mp3'),
	'A4': require('@/assets/audio/notes/piano-a-4.mp3'),
	'C5': require('@/assets/audio/notes/piano-c-5.mp3'),
	'D#5': require('@/assets/audio/notes/piano-d-sharp-5.mp3'),
	'F#5': require('@/assets/audio/notes/piano-f-sharp-5.mp3'),
	'A5': require('@/assets/audio/notes/piano-a-5.mp3'),
	'C6': require('@/assets/audio/notes/piano-c-6.mp3'),
	'D#6': require('@/assets/audio/notes/piano-d-sharp-6.mp3')
};

const PianoSampler = new Sampler(PianoSamples).toDestination();

export default [
	{ bindName: 'sampler.samples', to: PianoSamples },
	{ bind: Sampler, factory: () => PianoSampler }
];