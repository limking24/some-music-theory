<template>
	<div class="scale-detector">
		<div class="total-no-of-scales" :class="{'none': totalNoOfScales === 0}">{{noOfScales(totalNoOfScales)}} found.</div>
		<table class="matched-scales" v-for="(group, supertype) in results" :key="supertype" :style="{order: Number(supertype)}">
			<thead>
				<tr @click="group.toggleCollapsed()">
					<td class="collapse-expand">[{{group.collapsed ? '+' : '−'}}]</td>
					<td class="supertype" :colspan="Number(supertype)">
						{{displaySupertype(supertype)}}
						<div class="help" @click.stop>
							<div class="help-content">
								<ul>
									<li>If the scale has an enharmonic equivalent (e.g. Gb/F# Major,) you can click on <u>Gb/F#</u> to show the alterative scale notes.</li>
									<li>Hover over an underlined scale name to see its aliases.</li>
									<li>Click on ▶ to play the scale notes; ◼ to stop.</li>
									<li>Click on a row to highlight/unhighlight it.</li>
									<li>Click on [−] to hide the scales; [+] to show them.</li>
								</ul>
							</div>
						</div>
					</td>
					<td class="supertype-no-of-scales" colspan="2">{{noOfScales(group.scales.length)}}</td>
				</tr>
			</thead>
			<tbody :class="{hidden: group.collapsed}">
				<tr v-for="scale in group.scales" :key="scale" @click="scale.toggleHighlight()" :class="{highlight: scale.highlight}">
					<td></td>
					<td class="scale">
						<span :class="{'tonic-option': scale.enharmonic}" @click.stop="scale.showAlternative()" >
							<span :class="{dim: !scale.isCurrent(scale.tonic)}">{{scale.tonic}}</span>
							<template v-if="scale.enharmonic">
								<span> / </span>
								<span :class="{dim: !scale.isCurrent(scale.enharmonic)}">{{scale.enharmonic}}</span>
							</template>
						</span>
						<span>&nbsp;</span>
						<span :class="{tooltip: scale.hasAliases}">
							{{scale.name}}
							<span v-if="scale.hasAliases" class="tooltip-text" @click.stop>
								{{pluralize('Alias', scale.aliases.length)}}: {{scale.aliases.join(', ')}}
							</span>
						</span>
					</td>
					<td class="play-button"><sampler-play-button @play="(sampler, onStop) => play(sampler, onStop, scale.notes)"/></td>
					<td class="note" v-for="note in scale.notes" :key="note">{{note}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script lang="ts">
import { onStop, SamplerFacade } from '@/audio/sampler-facade';
import { asDemonstration } from '@/functional/scale';
import { rotateRight } from '@/functional/string';
import { Chroma } from '@/models/chroma';
import { MatchedScale, MatchedScaleGroup } from '@/models/scale-finder';
import { ScaleSupertype } from '@/models/scale-supertype';
import { ScaleTonic } from '@/models/scale-tonic';
import { ScaleType } from '@tonaljs/tonal';
import pluralize from 'pluralize';
import { Options, Vue } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import SamplerPlayButton from './sampler-play-button.vue';

@Options({
	components: {
		SamplerPlayButton
	}
})
export default class ScaleFinder extends Vue {

	readonly Tonics = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

	@Prop({required: true})
	chroma!: Chroma;

	results: Record<number, MatchedScaleGroup> = {
		5: new MatchedScaleGroup([new MatchedScale('Bb', 'A#', 'mixolydian pentatonic')]),
		7: new MatchedScaleGroup([
			new MatchedScale('C', 'B#', 'major'),
			new MatchedScale('C', 'B#', 'major #5'),
			new MatchedScale('A', undefined, 'aeolian')
		])
	};

	public get totalNoOfScales(): number {
		return Object
				.values(this.results)
				.reduce((total, group) => group.scales.length + total, 0);
	}

	public noOfScales(number: number): string {
		return `${number} ${pluralize('scale', number)}`;
	}

	public pluralize(word: string, count: number): string {
		return pluralize(word, count);
	}

	public displaySupertype(supertype: string): string {
		return ScaleSupertype.toString(Number(supertype));
	}

	@Watch('chroma', /*{immediate: true}*/)
	public showResults(chroma: Chroma): void {
		let regex = new RegExp(chroma.value.reduce((p, flag) => p + (flag ? '1' : '.'), ''));
		let noOfNotes = chroma.noOfNotes;
		this.results = ScaleType
						.all()
						.reduce((results, scale) => {
							let supertype = scale.intervals.length;
							if (noOfNotes <= supertype && supertype < ScaleSupertype.Chromatic) {
								for (let x = 0; x < 12; x++) {
									if (regex.test(rotateRight(scale.chroma, x))) {
										if (!(supertype in results)) {
											results[supertype] = new MatchedScaleGroup([]);
										}
										results[supertype].scales.push(new MatchedScale(
											this.Tonics[x], 
											ScaleTonic.enharmonicOfTonic(this.Tonics[x]),
											scale.name
										));
									}
								}
							}
							return results;
						}, {} as Record<number, MatchedScaleGroup>);
		Object
			.values(this.results)
			.forEach(group => group.scales.sort((a, b) => a.name.localeCompare(b.name)));
	}

	play(sampler: SamplerFacade, onStop: onStop, notes: string[]): void {
		sampler.play(asDemonstration(notes), {onStop});
	}

}
</script>

<style scoped>
.scale-detector {
	display: flex;
	flex-direction: column;
	text-align: left;
}

.total-no-of-scales {
	font-style: italic;
	margin-left: 11px;
	margin-bottom: 10px;
}

.total-no-of-scales.none {
	margin-left: 0;
	margin-top: 25px;
	text-align: center;
	font-size: 103%;
}

table {
	border-collapse: collapse;
	margin-top: 20px;
	margin-bottom: 15px;
	width: 850px;
}

thead tr {
	cursor: pointer;
}

thead td {
	border-bottom: 2px solid rgb(44, 62, 80);
	padding-bottom: 5px;
}

thead td.collapse-expand {
	padding-left: 6px;
	text-align: center;
	width: 24px;
}

thead td.supertype {
	font-size: 120%;
	font-weight: bold;
	position: relative;
}

thead td.supertype .help {
	display: inline-block;
	font-size: 85%;
	margin-left: 3px;
	position: absolute;
	top: -4px;
}

thead td.supertype .help-content {
	font-size: 95%;
	font-weight: normal;
	left: 150%;
	width: 500px;
}

thead td.supertype-no-of-scales {
	font-style: italic;
	font-size: 95%;
	padding-right: 25px;
	text-align: right;
}

tbody tr:nth-child(even) {
	background: rgb(245, 245, 245);
}

tbody tr:hover {
	background: rgb(230, 230, 230);
}

tbody tr.highlight:nth-child(odd) {
	background: rgb(200, 200, 200);
}

tbody tr.highlight:nth-child(even) {
	background: rgb(190, 190, 190);
}

tbody td {
	padding: 6px 10px;
}

tbody td:last-child {
	padding-right: 25px;
}

tbody td.scale {
	padding-left: 2px;
	width: 230px;
}

tbody td.play-button {
	width: 40px;
}

tbody td.note {
	min-width: 30px;
}

.tonic-option {
	cursor: pointer;
}

.tonic-option .dim {
	opacity: 0.4;
}

.tooltip-text {
	white-space: nowrap;
	width: auto;
}

.hidden {
	display: none;
}
</style>