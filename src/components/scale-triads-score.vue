<template>
	<div id="scale-triads-score">
		<div :id="elementId"></div>
	</div>
</template>

<script lang="ts">
import { Scale } from '@/models/scale';
import { ScaleTriadsScoreDrawer } from '@/services/scale-triads-score-drawer';
import { Inject, InjectValue } from 'typescript-ioc';
import { Vue } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';

export default class ScaleTriadsScore extends Vue {

	@Prop({required: true})
	scale!: Scale;

	@InjectValue('scale.triads.score.element.id')
	elementId!: string;

	@Inject
	scoreDrawer!: ScaleTriadsScoreDrawer;

	mounted(): void {
		this.scoreDrawer.draw(this.scale);
	}

	@Watch('scale')
	onScaleChanged(): void {
		this.scoreDrawer.reset();
		this.scoreDrawer.draw(this.scale);
	}

}
</script>

<style>
#scale-triads-score {
	margin-top: -5px;
}

#scale-triads-score > div > svg > g.vf-stavenote:nth-of-type(1),
#scale-triads-score > div > svg > g.vf-stavenote:nth-of-type(2),
#scale-triads-score > div > svg > g.vf-stavenote:nth-of-type(10),
#scale-triads-score > div > svg > g.vf-stavenote:nth-of-type(11),
#scale-triads-score > div > svg > text:nth-of-type(1),
#scale-triads-score > div > svg > text:nth-of-type(2),
#scale-triads-score > div > svg > text:nth-of-type(10),
#scale-triads-score > div > svg > text:nth-of-type(11) {
	opacity: 0.4;
}

#scale-triads-score > div > svg > text {
	font-family: 'Catamaran';
}

#scale-triads-score g.vf-notehead.active path {
	fill: red;
}
</style>