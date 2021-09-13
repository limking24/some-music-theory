import { Options } from '@/models/options';
import { ScaleSupertype } from '@/models/scale-supertype';
import { Singleton } from 'typescript-ioc';

@Singleton
export class OptionsFactory {

	public scaleSupertypes(supertypes: number[]): Options {
		return supertypes
				.reduce((option, supertype) => {
					let display = ScaleSupertype[supertype];
					if (display) {
						option[supertype] = { display };
					}
					return option;
				}, {} as Options);
	}

}