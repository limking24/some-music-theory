<template>
	<div v-if="table.scaleName">
		<h2>{{table.scaleName}}</h2>
		<div v-if="table.hasAliases" class="alias">
			Alias<template v-if="table.numberOfAliases > 1">es</template>: 
			{{table.aliases}}
		</div>
		<table>
			<thead>
				<tr>
					<td>Tonic</td>
					<td>Enharmonic</td>
					<td></td>
					<td v-for="(note, index) in table.notesPerOctave" :key="index">{{index + 1}}</td>
					<td>Accidentals</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(row, index) in table.rows" :key="index"
					@mouseover="table.toggleHighlight(index)"
					@mouseout="table.toggleHighlight(index)"
					:class="{
						highlight: row.highlight,
						dim: row.dim
					}">
					<td>{{row.tonic}}</td>
					<td>{{row.enharmonic}}</td>
					<td>
						<sampler-play-button @on-play="(sampler, onStop) => play(sampler, onStop, row.notes)"/>
					</td>
					<td v-for="note in row.notes" :key="note">{{note}}</td>
					<td>{{row.accidentals}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script lang="ts">
import { onStop, Sampler } from '@/audio/sampler';
import { ScaleDao } from '@/data-access/scale-dao';
import { Row, Table, Tonic } from '@/models/scale-notes-table';
import { ScaleService } from '@/services/scale-service';
import { Inject } from 'typescript-ioc';
import { Options, Vue } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import SamplerPlayButton from './sampler-play-button.vue';

@Options({
	components: {
		SamplerPlayButton
	}
})
export default class ScaleNotesTable extends Vue {

	@Prop({require: true})
	scaleType!: string;

	@Inject
	scaleDao!: ScaleDao;

	@Inject
	scaleService!: ScaleService;

	table = {} as Table;

	@Watch('scaleType', {immediate: true})
	async loadTable(key: string): Promise<void> {
		if (key) {
			(await this.scaleDao.get(key)).ifPresent(async scale => {
				let [aliases, notesArray] = await Promise.all([
					this.scaleDao.displayOf(scale.aliasKeys),
					this.scaleService.getNotesByTonics(scale.key, Tonic)
				]);
				this.table = new Table(
					scale.display, 
					aliases, 
					scale.supertype, 
					notesArray.get().map((notes, index) => new Row(index, notes, scale.tonicRange))
				);
			});
		}
	}

	async play(sampler: Sampler, onStop: onStop, notes: string[]): Promise<void> {
		notes = [...notes, notes[0]];
		let startPitch = notes[0].charCodeAt(0) < 67 ? 3 : 4; // A, A#, B = 3, Others = 4
		let endPitch = startPitch + 1;
		let index = notes.findIndex((note, i) => note.charCodeAt(0) < 67 && notes[i + 1].charCodeAt(0) >= 67);
		let pitchNotation = notes.map((note, i) => (i <= index) ? `${note}${startPitch}` : `${note}${endPitch}`);
		sampler.play(pitchNotation, {onStop});
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

.play-button {
	cursor: pointer;
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