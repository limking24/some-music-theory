import { NoRange, ScaleTonicRange, ScaleTonicRangeFactory } from '@/models/scale-tonic-range';
import { Inject, Singleton } from 'typescript-ioc';

export abstract class ScaleTonicRangeDao {

	public abstract get(key: string): ScaleTonicRange;

}

@Singleton
export class InMemoryScaleTonicRangeDao extends ScaleTonicRangeDao {

	private readonly _map = new Map<string, ScaleTonicRange>();

	public constructor(@Inject private readonly _factory: ScaleTonicRangeFactory){
		super();
	}

	private init(): void {
		this._map.set('aeolian',						this._factory.create(5, 17));
		this._map.set('altered',						this._factory.create(3, 15));
		this._map.set('augmented heptatonic',			this._factory.create(1, 12));
		this._map.set('augmented',						this._factory.create(0, 11));
		this._map.set('balinese',						this._factory.create(5, 16));
		this._map.set('bebop locrian',					this._factory.create(7, 18));
		this._map.set('bebop major',					this._factory.create(1, 12));
		this._map.set('bebop minor',					this._factory.create(4, 15));
		this._map.set('bebop',							this._factory.create(3, 14));
		this._map.set('composite blues',				this._factory.create(5, 16));
		this._map.set('diminished',						this._factory.create(5, 16));
		this._map.set('dorian #4',						this._factory.create(3, 14));
		this._map.set('dorian b2',						this._factory.create(5, 17));
		this._map.set('dorian',							this._factory.create(4, 16));
		this._map.set('double harmonic lydian',			this._factory.create(4, 15));
		this._map.set('double harmonic major',			this._factory.create(4, 16));
		this._map.set('egyptian',						this._factory.create(4, 16));
		this._map.set('enigmatic',						this._factory.create(5, 16));
		this._map.set('flamenco',						this._factory.create(4, 16));
		this._map.set('flat six pentatonic',			this._factory.create(4, 16));
		this._map.set('flat three pentatonic',			this._factory.create(4, 16));
		this._map.set('half-whole diminished',			this._factory.create(4, 15));
		this._map.set('harmonic major',					this._factory.create(4, 15));
		this._map.set('harmonic minor',					this._factory.create(4, 15));
		this._map.set('hirajoshi',						this._factory.create(5, 17));
		this._map.set('hungarian major',				this._factory.create(1, 13));
		this._map.set('hungarian minor',				this._factory.create(3, 15));
		this._map.set('ichikosucho',					this._factory.create(4, 15));
		this._map.set('in-sen',							this._factory.create(6, 18));
		this._map.set('ionian pentatonic',				this._factory.create(2, 14));
		this._map.set('iwato',							this._factory.create(7, 19));
		this._map.set('kafi raga',						this._factory.create(3, 15));
		this._map.set('kumoijoshi',						this._factory.create(6, 18));
		this._map.set('leading whole tone',				this._factory.create(1, 13));
		this._map.set('locrian #2',						this._factory.create(6, 18));
		this._map.set('locrian 6',						this._factory.create(6, 17));
		this._map.set('locrian major',					this._factory.create(5, 17));
		this._map.set('locrian pentatonic',				this._factory.create(7, 19));
		this._map.set('locrian',						this._factory.create(7, 19));
		this._map.set('lydian #5P pentatonic',			this._factory.create(0, 12));
		this._map.set('lydian #9',						this._factory.create(0, 11));
		this._map.set('lydian augmented',				this._factory.create(0, 12));
		this._map.set('lydian diminished',				this._factory.create(3, 14));
		this._map.set('lydian dominant pentatonic',		this._factory.create(2, 14));
		this._map.set('lydian dominant',				this._factory.create(2, 14));
		this._map.set('lydian minor',					this._factory.create(3, 15));
		this._map.set('lydian pentatonic',				this._factory.create(1, 13));
		this._map.set('lydian',							this._factory.create(1, 13));
		this._map.set('major augmented',				this._factory.create(1, 12));
		this._map.set('major blues',					this._factory.create(3, 15));
		this._map.set('major pentatonic',				this._factory.create(2, 14));
		this._map.set('major',							this._factory.create(2, 14));
		this._map.set('malkos raga',					this._factory.create(6, 18));
		this._map.set('melodic minor',					this._factory.create(3, 15));
		this._map.set('messiaen\'s mode #3',			this._factory.create(3, 15));
		this._map.set('messiaen\'s mode #4',			this._factory.create(4, 15));
		this._map.set('messiaen\'s mode #5',			this._factory.create(3, 14));
		this._map.set('messiaen\'s mode #6',			this._factory.create(0, 12));
		this._map.set('messiaen\'s mode #7',			this._factory.create(4, 15));
		this._map.set('minor #7M pentatonic',			this._factory.create(3, 15));
		this._map.set('minor bebop',					this._factory.create(4, 15));
		this._map.set('minor blues',					this._factory.create(6, 18));
		this._map.set('minor hexatonic',				this._factory.create(3, 15));
		this._map.set('minor pentatonic',				this._factory.create(5, 17));
		this._map.set('minor six diminished',			this._factory.create(4, 15));
		this._map.set('minor six pentatonic',			this._factory.create(4, 16));
		this._map.set('mixolydian b6',					this._factory.create(4, 16));
		this._map.set('mixolydian pentatonic',			this._factory.create(3, 15));
		this._map.set('mixolydian',						this._factory.create(3, 15));
		this._map.set('mystery #1',						this._factory.create(6, 17));
		this._map.set('neopolitan major pentatonic',	this._factory.create(5, 17));
		this._map.set('neopolitan major',				this._factory.create(4, 16));
		this._map.set('oriental',						this._factory.create(5, 17));
		this._map.set('pelog',							this._factory.create(6, 18));
		this._map.set('persian',						this._factory.create(5, 16));
		this._map.set('phrygian dominant',				this._factory.create(5, 16));
		this._map.set('phrygian',						this._factory.create(6, 18));
		this._map.set('piongio',						this._factory.create(4, 15));
		this._map.set('prometheus neopolitan',			this._factory.create(3, 15));
		this._map.set('prometheus',						this._factory.create(2, 14));
		this._map.set('purvi raga',						this._factory.create(4, 15));
		this._map.set('ritusen',						this._factory.create(3, 15));
		this._map.set('romanian minor',					this._factory.create(6, 17));
		this._map.set('scriabin',						this._factory.create(5, 16));
		this._map.set('six tone symmetric',				this._factory.create(3, 14));
		this._map.set('spanish heptatonic',				this._factory.create(5, 16));
		this._map.set('super locrian pentatonic',		this._factory.create(8, 20));
		this._map.set('todi raga',						this._factory.create(4, 15));
		this._map.set('ultralocrian',					this._factory.create(9, 20));
		this._map.set('vietnamese 1',					this._factory.create(6, 17));
		this._map.set('whole tone pentatonic',			this._factory.create(6, 17));
		this._map.set('whole tone',						this._factory.create(1, 13));
	}

	public get(key: string): ScaleTonicRange {
		if (this._map.size === 0) {
			this.init();
		}
		let range = this._map.get(key);
		return range ? range : NoRange;
	}

}