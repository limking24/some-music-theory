<template>
	<div>
		<h1>Major & Minor Scale Triads</h1>
		<major-minor-scale-picker :scale="scale" @picked="updateRoute"/>
		<major-minor-scale-triads-score :scale="scale"/>
	</div>
</template>

<script lang="ts">
import MajorMinorScalePicker from '@/components/major-minor-scale-picker.vue';
import MajorMinorScaleTriadsScore from '@/components/major-minor-scale-triads-score.vue';
import { MajorMinorScale } from '@/models/major-minor-scale';
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Options({
	components: {
		MajorMinorScalePicker,
		MajorMinorScaleTriadsScore
	}
})
export default class MajorMinorScaleTriadsSearch extends Vue {

	@Prop()
	scale!: MajorMinorScale;

	updateRoute(scale: MajorMinorScale): void {
		this.$router.push(`/scale-triads/${scale.type}/${scale.subtype}/${scale.tonic}`);
	}

}
</script>