<template>
	<form>
		<label for="scale">Scale</label>
		<select v-model="typeKey" id="scale">
			<option v-for="(type, key) in typeOptions" :key="key" :value="key">
				{{type}}
			</option>
		</select>

		<label for="mode">{{modeOptions.label}}</label>
		<select v-model="modeKey" id="mode">
			<option v-for="(mode, key) in modeOptions.value" :key="key" :value="key">
				{{mode}}
			</option>
		</select>

		<label for="tonic">Tonic</label>
		<select v-model="tonicKey" id="tonic">
			<option v-for="(key, index) in tonicOptions" :key="key" :value="key">
				{{tonicRange[key]}} {{tonicKeySignatures[index]}}
			</option>
		</select>
	</form>
</template>

<script lang="ts">
import { Mode, ModeKey, Modes, Scale, TonicKey, TonicRange, Type } from '@/models/scale';
import { Vue } from 'vue-class-component';
import { Emit, Prop, Watch } from 'vue-property-decorator';

interface ModeOptions {
	label: string,
	value: Modes
}

export default class ScalePicker extends Vue {

	@Prop({required: true})
	scale!: Scale;

	typeKey = this.scale.typeKey;

	modeKey = this.scale.modeKey;

	tonicKey = this.scale.tonicKey;

	typeOptions = Type;

	tonicRange = TonicRange;

	tonicKeySignatures = ['(bbbbbbb)', '(bbbbbb)', '(bbbbb)', '(bbbb)', '(bbb)', '(bb)', '(b)', '', '(#)', '(##)', '(###)', '(####)', '(#####)', '(######)', '(#######)'];

	get modeOptions(): ModeOptions {
		let options = Scale.getModes(this.typeKey);
		return {
			label: (options === Mode.minor) ? 'Type' : 'Mode',
			value: options
		}
	}

	get tonicOptions(): TonicKey[] {
		return Scale.getTonicRange(this.modeKey);
	}

	/**
	 * Triggered when scale type changed, causing scale mode to change.
	 */
	@Watch('modeOptions.value')
	onModeOptionsChanged(current: Modes, previous: Modes): void {
		this.modeKey = Object.keys(current)[0] as ModeKey;
	}

	/**
	 * Triggered when scale mode changed, causing scale tonic to change
	 * to the equivalent tonic with the same number of flats or sharps
	 * in the key signature.
	 * 
	 * For example, F Ionian and G Dorian each has one flat in the key
	 * signature, so switching from Ionian to Dorian when scale tonic 
	 * is F, the new tonic value will be G.
	 * 
	 * In other cases, scale tonic will not be changed even when scale 
	 * mode is changed. For instance, C Natural Minor and C Harmonic 
	 * Minor both have no flats or sharps, so changing the mode from 
	 * Natural to Harmonic when scale tonic is C, the value will remain 
	 * the same.
	 */
	@Watch('tonicOptions')
	onTonicOptionsChanged(current: TonicKey[], previous: TonicKey[]): void {
		let index = previous.indexOf(this.tonicKey);
		if (current[index] === previous[index]) {
			this.picked();
		} else {
			this.tonicKey = current[index];
		}
	}

	/**
	 * Triggered when scale tonic changed.
	 */
	@Watch('tonicKey')
	onTonicChanged(current: TonicKey, previous: TonicKey): void {
		this.picked();
	}

	/**
	 * Triggered when scale tonic changed, or when scale mode changed
	 * but scale tonic has not.
	 */
	@Emit('update:scale')
	picked(): Scale {
		return new Scale(this.typeKey, this.modeKey, this.tonicKey);
	}

}
</script>

<style scoped>

</style>