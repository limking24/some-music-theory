<template>
	<div id="scale-triads-score"></div>
</template>

<script lang="ts">
import Scale from '@/models/scale';
import { Vue } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Vex from 'vexflow';

export default class ScaleTriads extends Vue {

	@Prop({required: true})
	scale!: Scale;

	mounted(): void {
		let triads = '(A3 C4 E4)/w, (B3 D4 F4), (C4 E4 G4), (D4 F4 A4), (E4 G4 B4), (F4 A4 C5), (G4 B4 D5), (A4 C5 E5), (B4 D5 F5), (C5 E5 G5), (D5 F5 A5)';
		let vf = new Vex.Flow.Factory({renderer: {elementId: 'scale-triads-score', width: 715}});
		let score = vf.EasyScore();
		let system = vf.System({width: 700});
		
		let chordNames = [
			new Vex.Flow.TextNote({text: 'Am', duration: 'w', font: { family: 'Arial', size: 12, weight: ''}}), // or do it in css?
			new Vex.Flow.TextNote({text: 'Bdim', duration: 'w'}),
			new Vex.Flow.TextNote({text: 'C', duration: 'w'}),
			new Vex.Flow.TextNote({text: 'D', duration: 'w'}),
			new Vex.Flow.TextNote({text: 'Em', duration: 'w'}),
			new Vex.Flow.TextNote({text: 'F', duration: 'w'}),
			new Vex.Flow.TextNote({text: 'G', duration: 'w'}),
			new Vex.Flow.TextNote({text: 'Am', duration: 'w'}),
			new Vex.Flow.TextNote({text: 'Bdim', duration: 'w'}),
			new Vex.Flow.TextNote({text: 'C', duration: 'w'}),
			new Vex.Flow.TextNote({text: 'D', duration: 'w'}),
		];

		chordNames.forEach(name => name
									.setJustification(Vex.Flow.TextNote.Justification.CENTER)
									.setLine(12));

		let voices = [
			score.voice(score.notes(triads), {time: '11/1'}),
			score.voice(chordNames, {time: '11/1'})
		];

		system
			.addStave({
				voices,
				options: {
					x_shift: 10
				}
			})
			.addClef('treble')
			.addKeySignature('C');

		vf.draw();
	}

	@Watch('scale', {immediate: true})
	onScaleUpdate(): void {
		
	}

}
</script>

<style>
#scale-triads-score g.vf-stavenote:nth-of-type(1),
#scale-triads-score g.vf-stavenote:nth-of-type(2),
#scale-triads-score g.vf-stavenote:nth-of-type(10),
#scale-triads-score g.vf-stavenote:nth-of-type(11) {
	opacity: 0.5;
}

#scale-triads-score text:nth-of-type(1),
#scale-triads-score text:nth-of-type(2),
#scale-triads-score text:nth-of-type(10),
#scale-triads-score text:nth-of-type(11) {
	opacity: 0.5;
}
</style>