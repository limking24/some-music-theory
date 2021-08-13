<template>
	<form>
		<label for="scale">Scale</label>
		<select v-model="model.type" id="scale">
			<option v-for="type in typeOptions" :key="type">
				{{type}}
			</option>
		</select>

		<label for="mode">{{modeOptions.label}}</label>
		<select v-model="model.mode" id="mode">
			<option v-for="mode in modeOptions.value" :key="mode">
				{{mode}}
			</option>
		</select>

		<label for="tonic">Tonic</label>
		<select v-model="model.tonic" id="tonic">
			<option v-for="(tonic, index) in tonicOptions" :key="tonic" :value="tonic">
				{{tonic}} {{tonicKeySignatures[index]}}
			</option>
		</select>

		{{model}}
	</form>
</template>

<script lang="ts">
import Scale from '@/models/scale';
import { Vue } from 'vue-class-component';
import { Emit, Prop, Watch } from 'vue-property-decorator';

export default class ScalePicker extends Vue {

	@Prop({default: 'Major'})
	type!: string;

	@Prop({default: 'Ionian'})
	mode!: string;

	@Prop({default: 'C'})
	tonic!: string;

	@Prop({default: true})
	fireImmediately!: boolean;

	model = Scale.create(this.type, this.mode, this.tonic);

	typeOptions = Scale.types;

	tonicKeySignatures = ['(bbbbbbb)', '(bbbbbb)', '(bbbbb)', '(bbbb)', '(bbb)', '(bb)', '(b)', '', '(#)', '(##)', '(###)', '(####)', '(#####)', '(######)', '(#######)'];

	created(): void {
		if (this.fireImmediately) {
			this.picked();
		}
	}

	get modeOptions(): { label: string, value: string[] } {
		let options = Scale.getModes(this.model.type);
		return {
			label: (options == Scale.minorTypes) ? 'Type' : 'Mode',
			value: options
		}
	}

	get tonicOptions(): string[] {
		return Scale.getTonicRange(this.model.mode);
	}

	@Watch('model.tonic')
	onTonicChanged(current: string, previous: string): void {
		this.picked();
	}

	@Watch('modeOptions.value')
	onModeOptionsChanged(current: string[], previous: string[]): void {
		this.model.mode = current[0];
	}

	@Watch('tonicOptions')
	onTonicOptionsChanged(current: string[], previous: string[]): void {
		let index = previous.indexOf(this.model.tonic);
		if (current[index] == previous[index]) {
			// Major mode / minor type changed but tonic hasn't
			this.picked();
		} else {
			// Switch to the equivalent tonic with the same number of flats or sharps
			this.model.tonic = current[index];
		}
	}

	@Emit()
	picked() {
		return this.model;
	}

}
</script>

<style scoped>

</style>