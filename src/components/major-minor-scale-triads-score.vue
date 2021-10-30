<template>
	<template v-if="name">
		<div class="scale-name">
			<h2>{{name}}</h2>
			<div class="help">
				<div class="help-content">
					<ul>
						<li>Hover over a note to highlight it.</li>
						<li>Click on ▶ to play the chord; ◼ to stop.</li>
					</ul>
				</div>
			</div>
		</div>
		<div :id="id" />
	</template>
</template>

<script lang="ts">
import { DomBasedSamplerPlayButton } from '@/audio/dom-based-sampler-play-button';
import { onStop, SamplerFacade } from '@/audio/sampler-facade';
import { PlaySymbol } from '@/audio/sampler-play-button';
import { ScaleDao } from '@/data-access/scale-dao';
import { getScaleName, isValid, MajorMinorScale, subtypeToRef } from '@/models/major-minor-scale';
import { getMajorKeySignature, getTriadNotes, getTriads, getTriadsName } from '@/models/major-minor-scale-triads-score';
import { ScaleTonic } from '@/models/scale-tonic';
import { Inject } from 'typescript-ioc';
import { Optional } from 'typescript-optional';
import Vex from 'vexflow';
import { Vue } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';

export default class MajorMinorScaleTriadsScore extends Vue {

	@Prop({required: true})
	scale!: MajorMinorScale;

	@Inject
	scaleDao!: ScaleDao;

	@Inject
	sampler!: SamplerFacade;

	id = 'major-minor-scale-triads-score';

	name = '';

	triadNotes: string[] = [];

	@Watch('scale', {immediate: true})
	onScaleChanged(scale: MajorMinorScale): void {
		if (isValid(this.scale)) {
			this.clear();
			this.name = getScaleName(scale);
			this.triadNotes = getTriadNotes(subtypeToRef(scale.subtype), ScaleTonic.All[scale.tonic]);
			this.$nextTick(() => {
				this.draw(scale);
				this.enableHighlight();
				this.initPlayButtons();
			});
		}
	}

	draw(scale: MajorMinorScale): void {
		let ref = subtypeToRef(scale.subtype);
		let tonic = ScaleTonic.All[scale.tonic];
		let triads = getTriads(ref, tonic, scale.subtype);
		let triadNames = getTriadsName(ref, tonic);
		let keySignature = getMajorKeySignature(scale.subtype, tonic);
		let vf = new Vex.Flow.Factory({renderer: {elementId: this.id, width: 765}});
		let score = vf.EasyScore();
		let system = vf.System({width: 750});
		let chordTextPosition = ['A', 'B', 'C', 'D'].includes(tonic.charAt(0)) ? 13 : 11;
		let chordTextNotes = triadNames.map(triad => new Vex.Flow.TextNote({text: triad, duration: 'w'})
															.setJustification(Vex.Flow.TextNote.Justification.CENTER)
															.setLine(chordTextPosition));
		let playButtons = Array(11).fill(null).map(x => new Vex.Flow.TextNote({text: PlaySymbol, duration: 'w'})
																.setJustification(Vex.Flow.TextNote.Justification.CENTER)
																.setLine(chordTextPosition + 4));
		system
			.addStave({voices: [
				score.voice(score.notes(triads), {time: '11/1'}),
				score.voice(chordTextNotes, {time: '11/1'}),
				score.voice(playButtons, {time: '11/1'})
			]})
			.addClef('treble')
			.addKeySignature(keySignature);
		vf.draw();
	}

	enableHighlight(): void {
		document
			.querySelectorAll(`#${this.id} g.vf-notehead`)
			.forEach((element, x) => {
				/*
				x:			2  5  8  11 14 17 20 23 26 29 32
							1  4  7  10 13 16 19 22 25 28 31
							0  3  6  9  12 15 18 21 24 27 30

				noteIndex:	4  5  6  0  1  2  3  4  5  6  0
							2  3  4  5  6  0  1  2  3  4  5
							0  1  2  3  4  5  6  0  1  2  3
				*/
				let y = x % 3;
				let noteIndex = ((x - y) / 3 + (y * 2)) % 7;
				let clazz = `_${noteIndex}`
				let selector = `#${this.id} g.vf-notehead.${clazz}`;
				element.classList.add(clazz);
				element.addEventListener('mouseover', () => document
																.querySelectorAll(selector)
																.forEach(element => element.classList.add('active')));
				element.addEventListener('mouseout', () => document
																.querySelectorAll(selector)
																.forEach(element => element.classList.remove('active')));
			});
	}

	initPlayButtons(): void {
		Array
			.from(document.querySelectorAll('svg text'))
			.filter(text => text.textContent === PlaySymbol)
			.forEach((text, index) => {
				new DomBasedSamplerPlayButton(
					text as HTMLElement, 
					this.sampler, 
					(sampler, onStop) => this.play(sampler, onStop, index)
				);
			});
	}

	play(sampler: SamplerFacade, onStop: onStop, chordIndex: number): void {
		let triads = [this.triadNotes[chordIndex], this.triadNotes[chordIndex + 2], this.triadNotes[chordIndex + 4]];
		sampler.play([...triads, triads], { onStop, duration: 0.6 });
	}

	clear(): void {
		Optional
			.ofNullable(document.getElementById(this.id))
			.ifPresent(element => {
				while (element.hasChildNodes()) {
					element.removeChild(element.lastChild!);
				}
			});
	}

}
</script>

<style>
.scale-name {
	display: inline-block;
	margin-top: 50px;
	position: relative;
	width: auto;
}

.scale-name h2 {
	display: inline-block;
	margin: 0;
}

.scale-name .help {
	font-weight: bold;
	position: absolute;
	right: -10px;
	top: 1px;
}

.scale-name .help-content {
	width: 330px;
}

#major-minor-scale-triads-score {
	margin-top: -5px;
}

#major-minor-scale-triads-score > svg > g.vf-stavenote:nth-of-type(1),
#major-minor-scale-triads-score > svg > g.vf-stavenote:nth-of-type(2),
#major-minor-scale-triads-score > svg > g.vf-stavenote:nth-of-type(10),
#major-minor-scale-triads-score > svg > g.vf-stavenote:nth-of-type(11),
#major-minor-scale-triads-score > svg > text:nth-of-type(1),
#major-minor-scale-triads-score > svg > text:nth-of-type(2),
#major-minor-scale-triads-score > svg > text:nth-of-type(10),
#major-minor-scale-triads-score > svg > text:nth-of-type(11),
#major-minor-scale-triads-score > svg > text:nth-of-type(12),
#major-minor-scale-triads-score > svg > text:nth-of-type(13),
#major-minor-scale-triads-score > svg > text:nth-of-type(21),
#major-minor-scale-triads-score > svg > text:nth-of-type(22) {
	opacity: 0.4;
}

#major-minor-scale-triads-score > svg > text {
	font-family: 'Catamaran';
}

#major-minor-scale-triads-score g.vf-notehead.active path {
	fill: red;
}
</style>