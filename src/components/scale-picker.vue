<template>
	<form>
		<label for="scale">Scale</label>
		<select v-model="type" id="scale">
			<option v-for="option in typeOptions">
				{{option}}
			</option>
		</select>

		<label for="mode">{{modeOptions.label}}</label>
		<select v-model="mode" id="mode">
			<option v-for="option in modeOptions.value">
				{{option}}
			</option>
		</select>

		<label for="tonic">Tonic</label>
		<select v-model="tonic" id="tonic">
			<option v-for="(option, index) in tonicOptions" :value="option">
				{{option}} {{tonicKeySignatures[index]}}
			</option>
		</select>
	</form>
</template>

<script lang="ts">
import Scale from '@/models/scale';
import { Vue } from 'vue-class-component';
import { Emit, Prop, Watch } from 'vue-property-decorator';

export default class ScalePicker extends Vue {

	@Prop({required: true})
	scale!: Scale;

	type = this.scale.type;

	mode = this.scale.mode;

	tonic = this.scale.tonic;

	typeOptions = Scale.types;

	tonicKeySignatures = ['(bbbbbbb)', '(bbbbbb)', '(bbbbb)', '(bbbb)', '(bbb)', '(bb)', '(b)', '', '(#)', '(##)', '(###)', '(####)', '(#####)', '(######)', '(#######)'];

	get modeOptions(): { label: string, value: string[] } {
		let options = Scale.getModes(this.type);
		return {
			label: (options == Scale.minorTypes) ? 'Type' : 'Mode',
			value: options
		}
	}

	get tonicOptions(): string[] {
		return Scale.getTonicRange(this.mode);
	}

	/**
	 * Triggered when scale type changed, causing scale mode to change.
	 */
	@Watch('modeOptions.value')
	onModeOptionsChanged(current: string[], previous: string[]): void {
		this.mode = current[0];
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
	onTonicOptionsChanged(current: string[], previous: string[]): void {
		let index = previous.indexOf(this.tonic);
		if (current[index] == previous[index]) {
			this.picked();
		} else {
			this.tonic = current[index];
		}
	}

	/**
	 * Triggered when scale tonic changed.
	 */
	@Watch('tonic')
	onTonicChanged(current: string, previous: string): void {
		this.picked();
	}

	/**
	 * Triggered when scale tonic changed, or when scale mode changed
	 * but scale tonic has not.
	 */
	@Emit('update:scale')
	picked(): Scale {
		return new Scale(this.type, this.mode, this.tonic);
	}

}
</script>

<style scoped>

</style>