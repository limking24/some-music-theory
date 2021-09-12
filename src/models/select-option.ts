import { Optional } from 'typescript-optional';

export class Option<T> {

	public constructor(public readonly value: T,
						public readonly display: string) {}

}

export class Select<T, H extends Option<T>> {

	private _selected!: T;

	private _options!: H[];

	private constructor() {}

	/**
	 * Create a Select instance.
	 * 
	 * @param options an Option array.
	 * @param indexOfSelected Index of the selected option. 0 if not provided
	 * or if the value is larger than the length of the Option array.
	 * @returns a Select instance.
	 */
	public static create<T, H extends Option<T>>(options: H[], indexOfSelected?: number): Select<T, H>;
	/**
	 * Create a Select instance.
	 * 
	 * @param options an Option array.
	 * @param selected Value of the selected option. If invalid, indexOfDefault
	 * will be used to locate the selected option.
	 * @param indexOfDefault Index of the selected option if the selected given 
	 * is invalid. 0 if not provided or if the value is larger than the length 
	 * of the Option array.
	 */
	public static create<T, H extends Option<T>>(options: H[], selected: T, indexOfDefault?: number): Select<T, H>;
	public static create<T, H extends Option<T>>(options: H[], arg1?: T | number, arg2?: number): Select<T, H> {
		let select = new Select<T, H>();
		Reflect.apply(select.setOptions, select, arguments);
		return select;
	}

	public get selected(): T {
		return this._selected;
	}

	public get options(): H[] {
		return this._options;
	}

	public get indexOfSelected(): number {
		return this._options.findIndex(option => option.value === this._selected);
	}

	/**
	 * Set the selected option by index.
	 * 
	 * @param index index of the selected option.
	 */
	public setSelected(index: number): void;
	/**
	 * Set the selected option.
	 * 
	 * @param value value of the selected option. If it is not in the options,
	 * then indexOfDefault will be used to locate the selected item.
	 * @param indexOfDefault Index of the selected option if the selected value 
	 * given is invalid. 0 if not provided or if the value is larger than the length 
	 * of the Option array.
	 */
	public setSelected(value: T, indexOfDefault?: number): void;
	public setSelected(arg0: T | number, arg1?: number): void {
		let value = (typeof arg0 === 'number') ? undefined : arg0;
		let index = (Number.isInteger(arg0) ? arg0 : (Number.isInteger(arg1) ? arg1 : 0)) as number;
		if (index < 0 || index > this._options.length) {
			index = 0;
		}
		if (value) {
			this._selected = Optional
								.ofNullable(this._options.find(option => option.value === value))
								.orElse(this.options[index])
								.value;
		} else {
			this._selected = this._options[index].value;
		}
	}

	/**
	 * Set the options field.
	 * 
	 * @param options the new Option array.
	 * @param indexOfSelected Index of the selected option. 0 if not provided
	 * or if the value is larger than the length of the Option array.
	 */
	public setOptions(options: H[], indexOfSelected?: number): void;
	/**
	 * Set the options field.
	 * 
	 * @param options the new Option array.
	 * @param selected Value of the selected option. If invalid, indexOfDefault
	 * will be used to locate the selected option.
	 * @param indexOfDefault Index of the selected option if the selected value 
	 * given is invalid. 0 if not provided or if the value is larger than the 
	 * length of the Option array.
	 */
	public setOptions(options: H[], selected: T, indexOfDefault?: number): void;
	public setOptions(options: H[], arg1: any, arg2?: number): void {
		let selected = (typeof arg1 === 'string') ? arg1 : undefined;
		let indexOfDefault = Number.isInteger(arg1) ? arg1 : (Number.isInteger(arg2) ? arg2 : 0);
		if (indexOfDefault > options.length) {
			indexOfDefault = 0;
		}
		this._options = options;
		Reflect.apply(this.setSelected, this, [selected, indexOfDefault]);
	}

}

export type SelectText = Select<string, Option<string>>;