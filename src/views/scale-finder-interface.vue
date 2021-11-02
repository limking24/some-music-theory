<template>
	<div>
		<h1>Scale Finder</h1>
		<chroma-picker :button-label="'Find'" @picked="showResults" />
		<scale-finder v-if="chroma.value" :chroma="chroma.value" />
		<p v-else class="please-select">Please select between 3 to 10 notes (inclusive) and then click Find.</p>
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

	chroma: { value?: Chroma } = {};

	showResults(chroma: Chroma): void {
		this.sampler.stop();
		this.chroma.value = chroma;
	}

}
</script>

<style scoped>
.please-select {
	margin: 0;
	padding-top: 25px;
	text-align: center;
	font-size: 103%;
}
</style>