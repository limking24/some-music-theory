import { ScaleTonicRange } from '@/data/scale-tonic-range';
import { NoRange, ScaleTonicRangeFactory } from '@/factories/scale-tonic-range-factory';
import { Inject, Singleton } from 'typescript-ioc';
import { TonalScaleNameDao } from './scale-name-dao';

export abstract class ScaleTonicRangeDao {

	public abstract get(key: string): ScaleTonicRange;

}

@Singleton
export class TonalScaleTonicRangeDao extends ScaleTonicRangeDao {

	private readonly _rangeByRef = new Map<string, ScaleTonicRange>();

	public constructor(@Inject private _factory: ScaleTonicRangeFactory,
						@Inject private _nameDao: TonalScaleNameDao){
		super();
	}

	private init(): void {
		this.set('aeolian',							5, 17);
		this.set('altered',							3, 15);
		this.set('augmented heptatonic',			1, 12);
		this.set('augmented',						0, 11);
		this.set('balinese',						5, 16);
		this.set('bebop locrian',					7, 18);
		this.set('bebop major',						1, 12);
		this.set('bebop minor',						4, 15);
		this.set('bebop',							3, 14);
		this.set('composite blues',					5, 16);
		this.set('diminished',						5, 16);
		this.set('dorian #4',						3, 14);
		this.set('dorian b2',						5, 17);
		this.set('dorian',							4, 16);
		this.set('double harmonic lydian',			4, 15);
		this.set('double harmonic major',			4, 16);
		this.set('egyptian',						4, 16);
		this.set('enigmatic',						5, 16);
		this.set('flamenco',						4, 16);
		this.set('flat six pentatonic',				4, 16);
		this.set('flat three pentatonic',			4, 16);
		this.set('half-whole diminished',			4, 15);
		this.set('harmonic major',					4, 15);
		this.set('harmonic minor',					4, 15);
		this.set('hirajoshi',						5, 17);
		this.set('hungarian major',					1, 13);
		this.set('hungarian minor',					3, 15);
		this.set('ichikosucho',						4, 15);
		this.set('in-sen',							6, 18);
		this.set('ionian pentatonic',				2, 14);
		this.set('iwato',							7, 19);
		this.set('kafi raga',						3, 15);
		this.set('kumoijoshi',						6, 18);
		this.set('leading whole tone',				1, 13);
		this.set('locrian #2',						6, 18);
		this.set('locrian 6',						6, 17);
		this.set('locrian major',					5, 17);
		this.set('locrian pentatonic',				7, 19);
		this.set('locrian',							7, 19);
		this.set('lydian #5P pentatonic',			0, 12);
		this.set('lydian #9',						0, 11);
		this.set('lydian augmented',				0, 12);
		this.set('lydian diminished',				3, 14);
		this.set('lydian dominant pentatonic',		2, 14);
		this.set('lydian dominant',					2, 14);
		this.set('lydian minor',					3, 15);
		this.set('lydian pentatonic',				1, 13);
		this.set('lydian',							1, 13);
		this.set('major augmented',					1, 12);
		this.set('major blues',						3, 15);
		this.set('major pentatonic',				2, 14);
		this.set('major',							2, 14);
		this.set('malkos raga',						6, 18);
		this.set('melodic minor',					3, 15);
		this.set('messiaen\'s mode #3',				3, 15);
		this.set('messiaen\'s mode #4',				4, 15);
		this.set('messiaen\'s mode #5',				3, 14);
		this.set('messiaen\'s mode #6',				0, 12);
		this.set('messiaen\'s mode #7',				4, 15);
		this.set('minor #7M pentatonic',			3, 15);
		this.set('minor bebop',						4, 15);
		this.set('minor blues',						6, 18);
		this.set('minor hexatonic',					3, 15);
		this.set('minor pentatonic',				5, 17);
		this.set('minor six diminished',			4, 15);
		this.set('minor six pentatonic',			4, 16);
		this.set('mixolydian b6',					4, 16);
		this.set('mixolydian pentatonic',			3, 15);
		this.set('mixolydian',						3, 15);
		this.set('mystery #1',						6, 17);
		this.set('neopolitan major pentatonic',		5, 17);
		this.set('neopolitan major',				4, 16);
		this.set('oriental',						5, 17);
		this.set('pelog',							6, 18);
		this.set('persian',							5, 16);
		this.set('phrygian dominant',				5, 16);
		this.set('phrygian',						6, 18);
		this.set('piongio',							4, 15);
		this.set('prometheus neopolitan',			3, 15);
		this.set('prometheus',						2, 14);
		this.set('purvi raga',						4, 15);
		this.set('ritusen',							3, 15);
		this.set('romanian minor',					6, 17);
		this.set('scriabin',						5, 16);
		this.set('six tone symmetric',				3, 14);
		this.set('spanish heptatonic',				5, 16);
		this.set('super locrian pentatonic',		8, 20);
		this.set('todi raga',						4, 15);
		this.set('ultralocrian',					9, 20);
		this.set('vietnamese 1',					6, 17);
		this.set('whole tone pentatonic',			6, 17);
		this.set('whole tone',						1, 13);
	}

	private set(ref: string, upper: number, lower: number): void {
		this._rangeByRef.set(ref, this._factory.create(upper, lower));
	}

	public get(key: string): ScaleTonicRange {
		if (this._rangeByRef.size === 0) {
			this.init();
		}
		let ref = this._nameDao.refOf(key);
		if (ref) {
			let range = this._rangeByRef.get(ref);
			if (range) {
				return range;
			}
		}
		return NoRange;
	}

}