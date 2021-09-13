export interface Displayable {
	display: string;
}

export interface Options<T extends Displayable = Displayable> {
	[key: string]: T;
}