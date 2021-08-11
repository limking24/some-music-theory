import { ChordDictionary, ChordType, Key, Mode, Note, Scale, ScaleType } from '@tonaljs/tonal';
import { Container, Inject, InjectValue, Singleton } from 'typescript-ioc';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app')

Container.bindName('str').to('abc');

@Singleton
class BeanA {
	@InjectValue('str')
	public str?: string;
}

@Singleton
class BeanB {

	@Inject
	private beanA?: BeanA;

}

console.log(new BeanB());


let keys = ['Major', 'Minor'];

// Majors
let modes = Mode.all();


console.log(modes);


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




Mode.get('ionian')
Mode.get('ionian').intervals;


Mode.triads("major", "C");
// => ["C", "Dm", "Em", "F", "G", "Am", "Bdim"];

Mode.relativeTonic("minor", "major", "C"); // => "A"
*/