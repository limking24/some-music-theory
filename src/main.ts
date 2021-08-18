import { Chord, Scale } from '@tonaljs/tonal';
import 'reflect-metadata';
import { Container } from 'typescript-ioc';
import { createApp } from 'vue';
import App from './App.vue';
import serviceConfig from './config/service.config';
import {default as ScaleModel } from './models/scale';
import router from './router';

Container.configure(...serviceConfig);
createApp(App).use(router).mount('#app')

let key = `C harmonic minor`.toLowerCase();
let fifthNote = Scale.get(key).notes[5];
let pitch =  ([65, 66, 97, 98].includes(fifthNote.charCodeAt(0))) ? 3 : 4; // A/B = 3, C/D/E/F/G = 4
let fromNote = fifthNote + pitch; // e.g. A3
let toNote = fifthNote + (pitch + 2); // e.g. A5
let notes = Scale.rangeOf(key)(fromNote, toNote);
let triads = [];
for (let i = 0; i < notes.length - 4; i++) {
	triads.push(`${notes[i]} ${notes[i + 2]} ${notes[i + 4]}`);
}
console.log(`(${triads[0]})/w, ${triads.slice(1).map(triad => `(${triad})`).join(', ')}`);

let chordNames = triads.map(triad => triad.split(' ')).map(triad => Chord.detect(triad)[0].replace('M', ''));
console.log(chordNames);



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