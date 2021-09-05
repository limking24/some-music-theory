<template>
	<div>
		<h2>{{scaleName.display}}</h2>
		<div v-if="aliases" class="alias">
			<template v-if="scaleName.aliases.length === 1">
				Alias:
			</template>
			<template v-else>
				Aliases:
			</template>
			{{aliases}}
		</div>
		<table>
			<thead>
				<tr>
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
	margin: 50px 0 5px;
}

.alias {
	font-size: 120%;
	margin-bottom: 25px;
}

.highlight {
	background: rgb(180, 180, 180) !important;
}

.dim {
	opacity: 0.45;
}

table {
	border-spacing: 0;
	text-align: left;
	margin: 10px 0 40px;
}

/* Header */
thead td {
	font-weight: bold;
	font-size: 120%;
	border-bottom: 2px solid #2c3e50;
}

/* Even row */
tbody tr:nth-child(even) {
	background: rgb(245, 245, 245);
}

/* Tonic & Enharmonic columns */
td:first-child,
td:nth-child(2) {
	font-weight: bold;
}

/* Tonic columns */
td:first-child {
	padding-left: 23px;
	padding-right: 25px;
}

/* Enharmonic columns */
td:nth-child(2) {
	padding-right: 40px;
}

/* Note columns */
td:nth-child(n+3):not(:last-child) {
	min-width: 40px;
	padding: 6px 10px;
}

/* Accidentals columns */
td:last-child {
	padding-left: 25px;
	padding-right: 25px;
}

/* Last row */
tr:last-child td {
	border-bottom: 2px solid #2c3e50;
}
</style>