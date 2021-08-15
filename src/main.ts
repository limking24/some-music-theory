import { Note, Scale } from '@tonaljs/tonal';
import 'reflect-metadata';
import { Container, Inject } from 'typescript-ioc';
import { createApp } from 'vue';
import App from './App.vue';
import serviceConfig from './config/service.config';
import router from './router';
import { ScaleTriadsScoreDrawer } from './services/scale-triads-score-drawer';

Container.configure(...serviceConfig);
createApp(App).use(router).mount('#app')

console.log('test');

class Test {
	@Inject
	drawer!: ScaleTriadsScoreDrawer;
}

console.log(new Test());



let scale = Scale.get('C minor');
console.log('Scale');
console.log(scale);

console.log('Notes');
console.log(scale.notes);

console.log('transposeFrom');
const intervals = scale.intervals;
let offset = 2;
console.log([...intervals.slice(intervals.length - offset), ...intervals, ...intervals.slice(0, offset)].map(Note.transposeFrom('C')));


/*

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



Mode.get('ionian')
Mode.get('ionian').intervals;


Mode.triads("major", "C");
// => ["C", "Dm", "Em", "F", "G", "Am", "Bdim"];

Mode.relativeTonic("minor", "major", "C"); // => "A"
*/