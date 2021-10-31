<template>
	<div v-if="table.scaleName">
		<h2>{{table.scaleName}}</h2>
		<div v-if="table.hasAliases" class="alias">
			{{alias}}
		</div>
		<table class="striped-table">
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
					@mouseover="table.toggleHovered(index)"
					@mouseout="table.toggleHovered(index)"
					@click="row.toggleClicked()"
					:class="{
						'highlight-hover': row.hovered,
						'highlight-click': row.clicked,
						'dim': row.dim,
						'gradual': row.gradualDim
					}">
					<td>{{row.tonic}}</td>
					<td>{{row.enharmonic}}</td>
					<td>
						<sampler-play-button @play="(sampler, onStop) => play(sampler, onStop, row.notes)"/>
					</td>
					<td v-for="note in row.notes" :key="note">{{note}}</td>
					<td>{{row.accidentals}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script lang="ts">
import { onStop, SamplerFacade } from '@/audio/sampler-facade';
import { ScaleDao } from '@/data-access/scale-dao';
import { allTonicsNotes, asDemonstration } from '@/functional/scale';
import { Row, Table } from '@/models/scale-notes-table';
import pluralize from 'pluralize';
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

	table = {} as Table;

	get alias(): string {
		return `${pluralize('Alias', this.table.numberOfAliases)}: ${this.table.aliases}`;
	}

	@Watch('scaleType', {immediate: true})
	async loadTable(key: string): Promise<void> {
		if (key) {
			(await this.scaleDao.get(key)).ifPresent(async scale => {
				let aliases = await this.scaleDao.displayOf(scale.aliasKeys);
				let notesArray = allTonicsNotes(scale.ref);
				this.table = new Table(
					scale.display, 
					aliases, 
					scale.supertype, 
					notesArray.map((notes, index) => new Row(index, notes, scale.tonicRange))
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
h2 {
	margin: 50px 0 5px;
}

.alias {
	font-size: 120%;
	margin-bottom: 25px;
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