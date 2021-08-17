import { Chord, Scale } from '@tonaljs/tonal';
import 'reflect-metadata';
import { Container } from 'typescript-ioc';
import { createApp } from 'vue';
import App from './App.vue';
import serviceConfig from './config/service.config';
import router from './router';

Container.configure(...serviceConfig);
createApp(App).use(router).mount('#app')

let key = `C ionian`.toLowerCase();
let fifthNote = Scale.get(key).notes[5];
let startPitch = fifthNote.toUpperCase().charCodeAt(0) <= 66 ? 3 : 4; // A/B = 3, C/D/E/F/G = 4
let endPitch = startPitch + 2;
console.log(Scale.rangeOf(key)(fifthNote + startPitch, fifthNote + endPitch));



console.log(Chord.detect(['A3', 'C4', 'E4']));


/*

let scale = Scale.get('C minor');
console.log('Scale');
console.log(scale);

console.log('Notes');
console.log(scale.notes);

console.log('transposeFrom');
const intervals = scale.intervals;
let offset = 2;
console.log([...intervals.slice(intervals.length - offset), ...intervals, ...intervals.slice(0, offset)].map(Note.transposeFrom('C')));


Mode.get('ionian')
Mode.get('ionian').intervals;


Mode.triads("major", "C");
// => ["C", "Dm", "Em", "F", "G", "Am", "Bdim"];




major
	mode
		ionian (major)
				Cb, Gb, Db, Ab, Eb, Bb, F, [C], G, D, A, E, B, F#, C#
		dorian
						Db, Ab, Eb, Bb, F, C, G, [D], A, E, B, F#, C#, G#, D#
		phrygian
								Eb, Bb, F, C, G, D, A, [E], B, F#, C#, G#, D#, A#, E#
		lydian
			Fb, Cb, Gb, Db, Ab, Eb, Bb, [F], C, G, D, A, E, B, F#
		mixolydian (melodic-minor-descending)
					Gb, Db, Ab, Eb, Bb, F, C, [G], D, A, E, B, F#, C#, G#
		aeolian (natural-minor)
							Ab, Eb, Bb, F, C, G, D, [A], E, B, F#, C#, G#, D#, A#
		locrian
									Bb, F, C, G, D, A, E, [B], F#, C#, G#, D#, A#, E#, B#

			
			Fb, Cb, Gb, Db, Ab, Eb, Bb, F, C, G, D, A, E, B, F#, C#, G#, D#, A#, E#, B#


minor
	type
		natural
				Cb, Gb, Db, Ab, Eb, Bb, F, [C], G, D, A, E, B, F#, C#
		harmonic
				Cb, Gb, Db, Ab, Eb, Bb, F, [C], G, D, A, E, B, F#, C#
		melodic
				Cb, Gb, Db, Ab, Eb, Bb, F, [C], G, D, A, E, B, F#, C#


*/