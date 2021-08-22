<template>
	<form>
		<div>
			<label for="scale">Scale</label>
			<select v-model="typeKey" id="scale" size="7">
				<option v-for="(type, key) in typeOptions" :key="key" :value="key">
					{{type}}
				</option>
			</select>
		</div>

		<div>
			<label for="mode">{{modeOptions.label}}</label>
			<select v-model="modeKey" id="mode" size="7">
				<option v-for="(mode, key) in modeOptions.value" :key="key" :value="key">
					{{mode}}
				</option>
			</select>
		</div>
		
		<div>
			<label for="tonic">Tonic</label>
			<select v-model="tonicKey" id="tonic" size="7">
				<option v-for="(key, index) in tonicOptions" :key="key" :value="key">
					{{tonicRange[key]}} {{tonicKeySignatures[index]}}
				</option>
			</select>
		</div>
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

	onUpdatedEvents = new Array<Function>();

	mounted(): void {
		this.showSelectedTonicAtCenter();
	}

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
		this.onUpdatedEvents.push(this.showSelectedTonicAtCenter);
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

	showSelectedTonicAtCenter(): void {
		let tonicOption = document.querySelector("#tonic > option:nth-child(1)")!;
		let tonicSelect = tonicOption.parentElement!;
		let index = this.tonicOptions.indexOf(this.tonicKey);
		tonicSelect.scrollTop = tonicOption.scrollHeight * (index - 3);
	}

	updated(): void {
		while (this.onUpdatedEvents.length > 0) {
			(this.onUpdatedEvents.shift()!)();
		}
	}

}
</script>

<style scoped>
form > div {
	display: inline-block;
	text-align: left;
}

form > div > label {
	margin: 0 7px;
	font-weight: bold;
}

form > div > select {
	display: block;
	width: 200px;
	margin: 3px 7px;
	overflow-y: auto;
}
</style>