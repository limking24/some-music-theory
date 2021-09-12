import { Option, Select, SelectText } from './select-option';

const ScaleOptions = [
	new Option('major',			'Major'),
	new Option('minor',			'Minor')
];

const MajorModeOptions = [
	new Option('ionian',		'Ionian'), 
	new Option('dorian',		'Dorian'), 
	new Option('phrygian',		'Phrygian'), 
	new Option('lydian',		'Lydian'), 
	new Option('mixolydian',	'Mixolydian'), 
	new Option('aeolian',		'Aeolian'), 
	new Option('locrian',		'Locrian')
];

const MinorTypeOptions = [
	new Option('natural',		'Natural'),
	new Option('harmonic',		'Harmonic'),
	new Option('melodic',		'Melodic')
];

/**
 * Used to create tonic options.
 */
const Tonics = [
	new Option('f-flat',		'Fb'),
	new Option('c-flat',		'Cb'),
	new Option('g-flat',		'Gb'),
	new Option('d-flat',		'Db'),
	new Option('a-flat',		'Ab'),
	new Option('e-flat',		'Eb'),
	new Option('b-flat',		'Bb'),
	new Option('f',				'F'),
	new Option('c',				'C'),
	new Option('g',				'G'),
	new Option('d',				'D'),
	new Option('a',				'A'),
	new Option('e',				'E'),
	new Option('b',				'B'),
	new Option('f-sharp',		'F#'),
	new Option('c-sharp',		'C#'),
	new Option('g-sharp',		'G#'),
	new Option('d-sharp',		'D#'),
	new Option('a-sharp',		'A#'),
	new Option('e-sharp',		'E#'),
	new Option('b-sharp',		'B#')
];

/**
 * Used to create tonic options.
 */
const Accidentals = [
	' (bbbbbbb)',
	' (bbbbbb)',
	' (bbbbb)',
	' (bbbb)',
	' (bbb)',
	' (bb)',
	' (b)',
	'',
	' (#)',
	' (##)',
	' (###)',
	' (####)',
	' (#####)',
	' (######)',
	' (#######)'
];

/**
 * Create tonic options according to the given type.
 * 
 * For example, the options for major ionian will be:
 * ```
 * [
 *   { value: 'c-flat',		display: 'Cb (bbbbbbb)' },
 *   { value: 'g-flat',		display: 'Gb (bbbbbb)' },
 *   { value: 'd-flat',		display: 'Db (bbbbb)' },
 *   { value: 'a-flat',		display: 'Ab (bbbb)' },
 *   { value: 'e-flat',		display: 'Eb (bbb)' },
 *   { value: 'b-flat',		display: 'Bb (bb)' },
 *   { value: 'f',			display: 'F (b)' },
 *   { value: 'c',			display: 'C' },
 *   { value: 'g',			display: 'G (#)' },
 *   { value: 'd',			display: 'D (##)' },
 *   { value: 'a',			display: 'A (###)' },
 *   { value: 'e',			display: 'E (####)' },
 *   { value: 'b',			display: 'B (#####)' },
 *   { value: 'f-sharp',	display: 'F# (######)' },
 *   { value: 'c-sharp',	display: 'C# (#######)' }
 * ]
 * ```
 * 
 * @param type type of a scale
 * @returns tonic options
 */
function createTonicOptions(type: string): Option<string>[] {
	let start;
	switch(type) {
		case 'ionian':		start = 1;	break;
		case 'dorian':		start = 3;	break;
		case 'phrygian':	start = 5;	break;
		case 'lydian':		start = 0;	break;
		case 'mixolydian':	start = 2;	break;
		case 'aeolian':		start = 4;	break;
		case 'locrian':		start = 6;	break;
		case 'natural':		start = 4;	break;
		case 'harmonic':	start = 4;	break;
		case 'melodic':		start = 4;	break;
		default: return [];
	}
	return Tonics
			.slice(start, start + 15)
			.map((option, index) => new Option(
				option.value, 
				option.display + Accidentals[index]
			));
}

/**
 * Return {@link MinorTypeOptions} for minor scale;
 * {@link MajorModeOptions} for major scale.
 */
function getTypeOptions(scale: string): Option<string>[] {
	return (scale === 'minor') ? MinorTypeOptions : MajorModeOptions;
}

export class MajorMinorScaleOption {

	private readonly _scales: SelectText;

	private readonly _types: SelectText;

	private readonly _tonics: SelectText;

	/**
	 * Create a MajorMinorScaleOption instance.
	 * 
	 * @param scale the selected scale. If the given scale is not in the options,
	 * the selected scale will be the first option instead.
	 * 
	 * @param type the selected type. If the given type is not in the options,
	 * the selected type will be the first option instead.
	 * 
	 * @param tonic the selected tonic. If the given tonic is not in the options,
	 * the selected tonic will be the seventh option instead (i.e. the one without
	 * any sharps and flats in the key signature.)
	 */
	public constructor(scale: string, type: string, tonic: string) {
		this._scales = Select.create(ScaleOptions, scale.toLowerCase());
		this._types = Select.create(getTypeOptions(this._scales.selected), type.toLowerCase());
		this._tonics = Select.create(createTonicOptions(this._types.selected), tonic.toLowerCase(), 7);
	}

	public get scales(): Option<string>[] {
		return this._scales.options;
	}

	public get types(): Option<string>[] {
		return this._types.options;
	}

	public get tonics(): Option<string>[] {
		return this._tonics.options;
	}

	public get selectedScale(): string {
		return this._scales.selected;
	}

	public get selectedType(): string {
		return this._types.selected;
	}

	public get selectedTonic(): string {
		return this._tonics.selected;
	}

	/**
	 * Set the selected scale, update the type and tonic options, and the 
	 * selected type and tonic accordingly. 
	 */
	public set selectedScale(value: string) {
		value = value.toLowerCase();
		if (this.selectedScale !== value) {
			this._scales.setSelected(value);
			this._types.setOptions(getTypeOptions(this._scales.selected));
			this._tonics.setOptions(createTonicOptions(this._types.selected), this._tonics.indexOfSelected);
		}
	}

	/**
	 * Set the selected type, update the tonic options and the selected tonic
	 * accordingly. If the given type is not in the options, then the selected
	 * type will be the first option.
	 */
	public set selectedType(value: string) {
		value = value.toLowerCase();
		if (this.selectedType !== value) {
			this._types.setSelected(value);
			this._tonics.setOptions(createTonicOptions(this._types.selected), this._tonics.indexOfSelected);
		}
	}

	/**
	 * Set the selected tonic. If the given tonic is not in the options, then 
	 * the selected tonic become the one without any sharps and flats in the 
	 * key signature.
	 * 
	 * For example, Fb is not an option for major ionian scale, so if that is
	 * provided, the selected tonic will be C instead.
	 */
	public set selectedTonic(value: string) {
		value = value.toLowerCase();
		if (this.selectedTonic !== value) {
			this._tonics.setSelected(value, 7);
		}
	}
	
}