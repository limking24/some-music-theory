<template>
	<div>
		<h1>Scale Finder</h1>
		<chroma-picker :button-label="'Find'" @picked="showResults" />
		<!-- <scale-finder v-if="chroma.value" :chroma="chroma.value" /> -->
		<scale-finder :chroma="chroma.value" />
	</div>
</template>

<script lang="ts">
import { SamplerFacade } from '@/audio/sampler-facade';
import ChromaPicker from '@/components/chroma-picker.vue';
import ScaleFinder from '@/components/scale-finder.vue';
import { Chroma } from '@/models/chroma';
import { Inject } from 'typescript-ioc';
import { Options, Vue } from 'vue-class-component';

@Options({
	components: {
		ChromaPicker,
		ScaleFinder
	}
})
export default class ScaleFinderInterface extends Vue {

	@Inject
	sampler!: SamplerFacade;

	notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

	chroma: { value?: Chroma } = {};

	showResults(chroma: Chroma): void {
		this.sampler.stop();
		this.chroma.value = chroma;
	}

}
</script>

<style scoped>
td:first-child,
td:nth-child(2) {
	font-weight: bold;
}

td {
	width: 50px;
}
</style>