<template>
	<div>
		<h2>{{scaleName.display}} Scale</h2>
		<div v-if="aliases">
			(Alias: {{aliases}})
		</div>
		<table border="1" align="center">
			<thead>
				<tr>
					<td></td>
					<td>Tonic</td>
					<td>Enharmonic</td>
					<td v-for="(note, index) in allScales[0].notes" :key="note">{{index + 1}}</td>
					<td>Accidentals</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(scale, index) in allScales" :key="scale"
					@mouseover="toggleHighlight(index)"
					@mouseout="toggleHighlight(index)"
					:class="{
						highlight: highlight[index],
						dim: tonicRange.outOfRange(index)
					}">
					<td>{{index}}</td>
					<td>{{scale.tonic}}</td>
					<td>{{enharmonic[index]}}</td>
					<td v-for="note in scale.notes" :key="note">{{note}}</td>
					<td>{{accidentals(scale.notes)}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script lang="ts">
import { TonicRange } from '@/models/scale';
import { ScaleName } from '@/models/scale-name';
import { ScaleTonicRange } from '@/models/scale-tonic-range';
import { Scale as ScaleInfo } from '@tonaljs/scale';
import { Scale as ScaleUtil } from '@tonaljs/tonal';
import { Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

export default class ScaleNotesTable extends Vue {

	@Prop({required: true})
	scaleName!: ScaleName;

	tonics = Object.values(TonicRange);

	enharmonic = ['E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'E#', 'B#', '-', '-', '-', 'Fb', 'Cb', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C'];

	highlight = new Array<boolean>(this.tonics.length);

	get aliases(): string {
		return this.scaleName
					.aliases
					.map(alias => alias.display)
					.join(', ');
	}

	get tonicRange(): ScaleTonicRange {
		return ScaleTonicRange.get(this.scaleName.ref);
	}

	get allScales(): ScaleInfo[] {
		return this.tonics.map(tonic => ScaleUtil.get(tonic + ' ' + this.scaleName.ref));
	}

	accidentals(notes: string[]): string {
		return notes
				.map(note => note.slice(1))
				.filter(accidental => accidental != '')
				.join(',');
	}

	/**
	 * Highlight or unhighlight the scale of a certain tonic and its enharmonic equivalent.
	 */
	toggleHighlight(index: number): void {
		this.highlight[index] = !this.highlight[index];
		let enharmonicIndex = this.tonics.indexOf(this.enharmonic[index]);
		if (enharmonicIndex >= 0) {
			this.highlight[enharmonicIndex] = !this.highlight[enharmonicIndex];
		}
	}

}
</script>

<style scoped>
h2 {
	margin-bottom: 0;
}

td {
	padding: 1px 7px;
}

td:first-child,
td:nth-child(2),
td:nth-child(3),
thead tr {
	font-weight: bold;
}

td:nth-child(n+4) {
	width: 45px;
}

td:last-child {
	width: auto;
}

.highlight {
	background: rgb(30, 144, 255) !important;
}

.dim {
	background: darkgrey;
}
</style>