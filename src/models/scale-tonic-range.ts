export class ScaleTonicRange {

	private static CACHE = new Map<string, ScaleTonicRange>();

	private static NO_RANGE = ScaleTonicRange.create(0, 20);

	private static RANGE_BY_SCALE = {
		'aeolian':							ScaleTonicRange.create(5, 17),
		'altered':							ScaleTonicRange.create(3, 15),
		'augmented heptatonic':				ScaleTonicRange.create(1, 12),
		'augmented':						ScaleTonicRange.create(0, 11),
		'balinese':							ScaleTonicRange.create(5, 16),
		'bebop locrian':					ScaleTonicRange.create(7, 18),
		'bebop major':						ScaleTonicRange.create(1, 12),
		'bebop minor':						ScaleTonicRange.create(4, 15),
		'bebop':							ScaleTonicRange.create(3, 14),
		'composite blues':					ScaleTonicRange.create(5, 16),
		'diminished':						ScaleTonicRange.create(5, 16),
		'dorian #4':						ScaleTonicRange.create(3, 14),
		'dorian b2':						ScaleTonicRange.create(5, 17),
		'dorian':							ScaleTonicRange.create(4, 16),
		'double harmonic lydian':			ScaleTonicRange.create(4, 15),
		'double harmonic major':			ScaleTonicRange.create(4, 16),
		'egyptian':							ScaleTonicRange.create(4, 16),
		'enigmatic':						ScaleTonicRange.create(5, 16),
		'flamenco':							ScaleTonicRange.create(4, 16),
		'flat six pentatonic':				ScaleTonicRange.create(4, 16),
		'flat three pentatonic':			ScaleTonicRange.create(4, 16),
		'half-whole diminished':			ScaleTonicRange.create(4, 15),
		'harmonic major':					ScaleTonicRange.create(4, 15),
		'harmonic minor':					ScaleTonicRange.create(4, 15),
		'hirajoshi':						ScaleTonicRange.create(5, 17),
		'hungarian major':					ScaleTonicRange.create(1, 13),
		'hungarian minor':					ScaleTonicRange.create(3, 15),
		'ichikosucho':						ScaleTonicRange.create(4, 15),
		'in-sen':							ScaleTonicRange.create(6, 18),
		'ionian pentatonic':				ScaleTonicRange.create(2, 14),
		'iwato':							ScaleTonicRange.create(7, 19),
		'kafi raga':						ScaleTonicRange.create(3, 15),
		'kumoijoshi':						ScaleTonicRange.create(6, 18),
		'leading whole tone':				ScaleTonicRange.create(1, 13),
		'locrian #2':						ScaleTonicRange.create(6, 18),
		'locrian 6':						ScaleTonicRange.create(6, 17),
		'locrian major':					ScaleTonicRange.create(5, 17),
		'locrian pentatonic':				ScaleTonicRange.create(7, 19),
		'locrian':							ScaleTonicRange.create(7, 19),
		'lydian #5P pentatonic':			ScaleTonicRange.create(0, 12),
		'lydian #9':						ScaleTonicRange.create(0, 11),
		'lydian augmented':					ScaleTonicRange.create(0, 12),
		'lydian diminished':				ScaleTonicRange.create(3, 14),
		'lydian dominant pentatonic':		ScaleTonicRange.create(2, 14),
		'lydian dominant':					ScaleTonicRange.create(2, 14),
		'lydian minor':						ScaleTonicRange.create(3, 15),
		'lydian pentatonic':				ScaleTonicRange.create(1, 13),
		'lydian':							ScaleTonicRange.create(1, 13),
		'major augmented':					ScaleTonicRange.create(1, 12),
		'major blues':						ScaleTonicRange.create(3, 15),
		'major pentatonic':					ScaleTonicRange.create(2, 14),
		'major':							ScaleTonicRange.create(2, 14),
		'malkos raga':						ScaleTonicRange.create(6, 18),
		'melodic minor':					ScaleTonicRange.create(3, 15),
		'messiaen\'s mode #3':				ScaleTonicRange.create(3, 15),
		'messiaen\'s mode #4':				ScaleTonicRange.create(4, 15),
		'messiaen\'s mode #5':				ScaleTonicRange.create(3, 14),
		'messiaen\'s mode #6':				ScaleTonicRange.create(0, 12),
		'messiaen\'s mode #7':				ScaleTonicRange.create(4, 15),
		'minor #7M pentatonic':				ScaleTonicRange.create(3, 15),
		'minor bebop':						ScaleTonicRange.create(4, 15),
		'minor blues':						ScaleTonicRange.create(6, 18),
		'minor hexatonic':					ScaleTonicRange.create(3, 15),
		'minor pentatonic':					ScaleTonicRange.create(5, 17),
		'minor six diminished':				ScaleTonicRange.create(4, 15),
		'minor six pentatonic':				ScaleTonicRange.create(4, 16),
		'mixolydian b6':					ScaleTonicRange.create(4, 16),
		'mixolydian pentatonic':			ScaleTonicRange.create(3, 15),
		'mixolydian':						ScaleTonicRange.create(3, 15),
		'mystery #1':						ScaleTonicRange.create(6, 17),
		'neopolitan major pentatonic':		ScaleTonicRange.create(5, 17),
		'neopolitan major':					ScaleTonicRange.create(4, 16),
		'oriental':							ScaleTonicRange.create(5, 17),
		'pelog':							ScaleTonicRange.create(6, 18),
		'persian':							ScaleTonicRange.create(5, 16),
		'phrygian dominant':				ScaleTonicRange.create(5, 16),
		'phrygian':							ScaleTonicRange.create(6, 18),
		'piongio':							ScaleTonicRange.create(4, 15),
		'prometheus neopolitan':			ScaleTonicRange.create(3, 15),
		'prometheus':						ScaleTonicRange.create(2, 14),
		'purvi raga':						ScaleTonicRange.create(4, 15),
		'ritusen':							ScaleTonicRange.create(3, 15),
		'romanian minor':					ScaleTonicRange.create(6, 17),
		'scriabin':							ScaleTonicRange.create(5, 16),
		'six tone symmetric':				ScaleTonicRange.create(3, 14),
		'spanish heptatonic':				ScaleTonicRange.create(5, 16),
		'super locrian pentatonic':			ScaleTonicRange.create(8, 20),
		'todi raga':						ScaleTonicRange.create(4, 15),
		'ultralocrian':						ScaleTonicRange.create(9, 20),
		'vietnamese 1':						ScaleTonicRange.create(6, 17),
		'whole tone pentatonic':			ScaleTonicRange.create(6, 17),
		'whole tone':						ScaleTonicRange.create(1, 13)
	} as {
		[key: string]: ScaleTonicRange
	};

	public constructor(public readonly upper: number,
						public readonly lower: number) {}

	/**
	 * Create a scale tonic range and cache it.
	 */
	public static create(upper: number, lower: number): ScaleTonicRange {
		let key = `${upper},${lower}`;
		let range = this.CACHE.get(key);
		if (range === undefined) {
			range = new ScaleTonicRange(upper, lower);
			this.CACHE.set(key, range);
		}
		return range;
	}

	public static get(scaleKey: string): ScaleTonicRange {
		let range = this.RANGE_BY_SCALE[scaleKey];
		return range ? range : this.NO_RANGE;
	}

	public outOfRange(index: number): boolean {
		return index < this.upper || index > this.lower;
	}

}