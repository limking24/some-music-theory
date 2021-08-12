<template>
	<form>
		<label for="scale">Scale</label>
		<select v-model="model.type" id="scale">
			<option v-for="type in typeOptions" v-bind:key="type">
				{{type}}
			</option>
		</select>

		<label for="mode">{{modeOptions.label}}</label>
		<select v-model="model.mode" id="mode">
			<option v-for="mode in modeOptions.value" v-bind:key="mode">
				{{mode}}
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

	@Prop()
	private type!: String;

	@Prop()
	private mode!: String;

	@Prop()
	private tonic!: String;

	private model = new Scale(this.type, this.mode, this.tonic);

	public get typeOptions(): String[] {
		return Scale.types;
	}

	public get modeOptions(): { label: String, value: String[] } {
		return Scale.isMinor(this.model) ?
				{ label: 'Type', value: Scale.minorTypes } :
				{ label: 'Mode', value: Scale.majorModes };
	}

	@Watch('model', {immediate: true, deep: true})
	public onModelChanged(current: Scale, previous: Scale) {
		// Validate here
		this.picked();
	}

	@Emit()
	public picked() {
		return this.model;
	}

}
</script>

<style scoped>

</style>