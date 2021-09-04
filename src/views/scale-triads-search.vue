<template>
	<div>
		<h1>Scale Triads</h1>
		<scale-picker v-model:scale="scale"></scale-picker>
		<h2>{{scale.toString()}} Scale</h2>
		<scale-triads-score :scale="scale"></scale-triads-score>
		<p>* Hover over a note to highlight it.</p>
	</div>
</template>

<script lang="ts">
import ScalePicker from '@/components/scale-picker.vue';
import ScaleTriadsScore from '@/components/scale-triads-score.vue';
import { Scale } from '@/models/scale';
import { Options, Vue } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';

@Options({
	components: {
		ScalePicker,
		ScaleTriadsScore
	}
})
export default class ScaleTriadsSearch extends Vue {

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

<style scoped>
h2 {
	margin: 50px 0 0;
}

p {
	font-style: italic;
	font-size: smaller;
	color: rgb(115, 115, 115);
}
</style>