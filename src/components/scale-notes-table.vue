<template>
	<div>
		<h2>{{info.scaleName}}</h2>
		<div v-if="info.hasAliases" class="alias">
			Alias<template v-if="info.numberOfAliases > 1">es</template>: 
			{{info.aliases}}
		</div>
		<table>
			<thead>
				<tr>
					<td>Tonic</td>
					<td>Enharmonic</td>
					<td v-for="(note, index) in info.notesPerOctave" :key="index">{{index + 1}}</td>
					<td>Accidentals</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(row, index) in info.rows" :key="index"
					@mouseover="toggleHighlight(index)"
					@mouseout="toggleHighlight(index)"
					:class="{
						highlight: row.highlight,
						dim: row.dim
					}">
					<td>{{row.tonic}}</td>
					<td>{{row.enharmonic}}</td>
					<td v-for="note in row.notes" :key="note">{{note}}</td>
					<td>{{row.accidentals}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script lang="ts">
import { ScaleNotesTableInfoFactory } from '@/factories/scale-notes-table-info-factory';
import { ScaleName } from '@/models/scale-name';
import { ScaleNotesTableInfo } from '@/models/scale-notes-table-info';
import { Inject } from 'typescript-ioc';
import { Vue } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';

export default class ScaleNotesTable extends Vue {

	@Prop({required: true})
	scaleName!: ScaleName;

	@Inject
	factory!: ScaleNotesTableInfoFactory;

	info!: ScaleNotesTableInfo;

	@Watch('scaleName', {immediate: true})
	onScaleChanged(scaleName: ScaleName): void {
		this.info = this.factory.create(scaleName);
	}

	/**
	 * Highlight or unhighlight the scale of a certain tonic and its enharmonic equivalent.
	 */
	toggleHighlight(index: number): void {
		let tonic = this.info.rows[index];
		let enharmonic = this.info.enharmonicOf(index);
		let rows = enharmonic ? [tonic, enharmonic] : [tonic];
		rows.forEach(row => row.highlight != row.highlight);
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