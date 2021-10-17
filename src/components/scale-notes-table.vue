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
					<td v-for="index in table.notesPerOctave" :key="index">{{index}}</td>
					<td>Accidentals</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(row, index) in table.rows" :key="index"
					@mouseover="table.toggleHighlight(index)"
					@mouseout="table.toggleHighlight(index)"
					:class="{
						highlight: row.highlight,
						dim: row.dim,
						gradual: row.gradualDim
					}">
					<td>({{index}}) {{row.tonic}}</td>
					<td>{{row.enharmonic}}</td>
					<td>
						<sampler-play-button @play="(sampler, onStop) => play(sampler, onStop, row.notes)"/>
					</td>
					<td v-for="note in row.notes" :key="note" :class="{
						bold: note === 'F#' || note === 'Bb'
					}">{{note}}</td>
					<td>{{row.accidentals}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script lang="ts">
import { onStop, SamplerFacade } from '@/audio/sampler-facade';
import { ScaleDao } from '@/data-access/scale-dao';
import { ScaleTonicRange } from '@/data/scale-type';
import { asDemonstration } from '@/functional/scale';
import { Row, Table } from '@/models/scale-notes-table';
import { ScaleService } from '@/services/scale-service';
import { ScaleType } from '@tonaljs/scale-type';
import { ScaleType as ScaleTypeUtil } from '@tonaljs/tonal';
import { Inject } from 'typescript-ioc';
import { Options, Vue } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import SamplerPlayButton from './sampler-play-button.vue';

Object.assign(ScaleTypeUtil.get('augmented').intervals, ['1P', '3m', '3M', '5P', '5A', '7M']);
// Object.assign(ScaleTypeUtil.get('whole tone').intervals, ['1P', '2M', '3M', '4A', '5A', '6A']);
patch(ScaleTypeUtil.get('whole tone pentatonic'), ['1P', '2M', '3M', '4A', '5A'], '101010101000');

function patch(scale: ScaleType, intervals: string[], chroma: string): void {
	Object.assign(scale.intervals, intervals);
	Object.defineProperty(scale, 'chroma', { value: chroma, writable: false });
	Object.defineProperty(scale, 'normalized', { value: chroma, writable: false });
}

let tr: Record<string, ScaleTonicRange> = {
	'chinese':									{ upper: 1, lower: 13 },
	'egyptian':									{ upper: 4, lower: 16 },
	'flat-six-pentatonic':						{ upper: 2, lower: 14 },
	'flat-three-pentatonic':					{ upper: 2, lower: 14 },
	'hirajoshi':								{ upper: 5, lower: 17 },
	'in-sen':									{ upper: 6, lower: 18 },
	'indian':									{ upper: 3, lower: 15 },
	'ionian-pentatonic':						{ upper: 2, lower: 14 },
	'iwato':									{ upper: 7, lower: 19 },
	'kumoi':									{ upper: 4, lower: 16 },
	'kumoijoshi':								{ upper: 6, lower: 18 },
	'locrian-pentatonic':						{ upper: 7, lower: 19 },
	'lydian-dominant-pentatonic':				{ upper: 2, lower: 13 },
	'lydian-pentatonic':						{ upper: 1, lower: 13 },
	'lydian-5p-pentatonic':						{ upper: 1, lower: 12 },
	'major-pentatonic':							{ upper: 2, lower: 14 },
	'malkos-raga':								{ upper: 6, lower: 18 },
	'minor-pentatonic':							{ upper: 5, lower: 17 },
	'minor-7m-pentatonic':						{ upper: 5, lower: 16 },
	'minor-seven-flat-five-pentatonic':			{ upper: 6, lower: 17 },
	'minor-six-pentatonic':						{ upper: 5, lower: 17 },
	'mixolydian-pentatonic':					{ upper: 3, lower: 15 },
	'neopolitan-major-pentatonic':				{ upper: 4, lower: 18 },
	'pelog':									{ upper: 6, lower: 18 },
	'pentatonic':								{ upper: 2, lower: 14 },
	'ritusen':									{ upper: 3, lower: 15 },
	'scriabin':									{ upper: 3, lower: 14 },
	'super-locrian-pentatonic':					{ upper: 8, lower: 19 },
	'vietnamese-1':								{ upper: 4, lower: 19 },
	'vietnamese-2':								{ upper: 5, lower: 17 },
	'whole-tone-pentatonic':					{ upper: 1, lower: 12 },
	'augmented':								{ upper: 2, lower: 14 },
	'blues':									{ upper: 6, lower: 17 },
	'major-blues':								{ upper: 3, lower: 14 },
	'messiaens-mode-1':							{ upper: 1, lower: 14 },
	'messiaens-mode-5':							{ upper: 2, lower: 17 },
	'minor-blues':								{ upper: 6, lower: 17 },
	'minor-hexatonic':							{ upper: 5, lower: 16 },
	'mystery-1':								{ upper: 7, lower: 18 },
	'piongio':									{ upper: 2, lower: 17 },
	'prometheus':								{ upper: 2, lower: 14 },
	'prometheus-neopolitan':					{ upper: 2, lower: 15 },
	'six-tone-symmetric':						{ upper: 2, lower: 15 },
	'whole-tone':								{ upper: 1, lower: 14 },
};

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
					this.scaleService.getNotesByTonics(scale.key)
				]);
				this.table = new Table(
					scale.display, 
					aliases, 
					scale.supertype, 
					notesArray.get().map((notes, index) => new Row(index, notes, key in tr ? tr[key] : scale.tonicRange))
				);
			});
		}
	}

	play(sampler: SamplerFacade, onStop: onStop, notes: string[]): void {
		sampler.play(asDemonstration(notes), {onStop});
	}

}
</script>

<style scoped>
.bold {
	font-weight: bold;
}

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

.gradual.dim {
	opacity: 0.68;
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