<template>
	<!-- Bug in scale-notes-table when using v-if & v-else here -->
	<span @click="isPlaying ? stop() : play()">{{symbol}}</span>
</template>

<script lang="ts">
import { Sampler } from '@/audio/sampler';
import { PlaySymbol, SamplerPlayButton as SamplerPlayButtonInterface, StopSymbol } from '@/audio/sampler-play-button';
import { Inject } from 'typescript-ioc';
import { Options, Vue } from 'vue-class-component';

@Options({
	emits: ['onPlay']
})
export default class SamplerPlayButton extends Vue implements SamplerPlayButtonInterface {

	@Inject
	sampler!: Sampler;

	isPlaying = false;

	get symbol(): string {
		return this.isPlaying ? StopSymbol : PlaySymbol;
	}

	play(): void {
		this.isPlaying = true;
		this.$emit('onPlay', this.sampler, this.onSamplerStopped);
	}

	stop(): void {
		this.sampler.stop();
	}

	onSamplerStopped(): void {
		this.isPlaying = false;
	}

}
</script>

<style scoped>
span {
	cursor: pointer;
}
</style>