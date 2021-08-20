<template>
  <div>
    <h1>Scale Triads</h1>
	<scale-picker v-model:scale="scale"></scale-picker>
	<scale-triads :scale="scale"></scale-triads>
  </div>
</template>

<script lang="ts">
import ScalePicker from '@/components/scale-picker.vue';
import ScaleTriads from '@/components/scale-triads.vue';
import { Scale } from '@/models/scale';
import { Options, Vue } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';

@Options({
	components: {
		ScalePicker,
		ScaleTriads
	}
})
export default class ScaleTriadsFinder extends Vue {

	@Prop({default: 'major'})
	typeKey!: string;

	@Prop({default: 'ionian'})
	modeKey!: string;

	@Prop({default: 'c'})
	tonicKey!: string;

	scale = Scale.create(this.typeKey, this.modeKey, this.tonicKey);

	@Watch('scale')
	onScalePicked(current: Scale, previous: Scale): void {
		this.$router.push(`/scale-triads/${current.typeKey}/${current.modeKey}/${current.tonicKey}`);
	}

}
</script>