<template>
	<div class="chroma-picker">
		<div class="piano">
			<div v-for="(key, index) in pianoKeys" 
				:key="index"
				:class="[ key.color, { active: chroma[index] } ]"
				@click="toggle(index)"
				class="key">
				{{key.label}}
			</div>
		</div>
		<div class="buttons">
			<button @click="pick()" :disabled="pickDisabled">Pick</button>
			<button @click="reset()" :disabled="resetDisabled">Reset</button>
		</div>
	</div>
</template>

<script lang="ts">
import { PianoKey } from '@/models/piano';
import { Options, Vue } from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';

@Options({
	emits: ['picked']
})
export default class ChromaPicker extends Vue {

	pianoKeys: PianoKey[] = [
		{ label: 'C',			color: 'white'},
		{ label: 'C#\n/\nDb',	color: 'black'},
		{ label: 'D',			color: 'white'},
		{ label: 'D#\n/\nEb',	color: 'black'},
		{ label: 'E',			color: 'white'},
		{ label: 'F',			color: 'white'},
		{ label: 'F#\n/\nGb',	color: 'black'},
		{ label: 'G',			color: 'white'},
		{ label: 'G#\n/\nAb',	color: 'black'},
		{ label: 'A',			color: 'white'},
		{ label: 'A#\n/\nBb',	color: 'black'},
		{ label: 'B',			color: 'white'}
	];

	@Prop({default: 3})
	min!: number;

	@Prop({default: 10})
	max!: number;
	
	chroma = new Array<boolean>(12).fill(false);

	get selected(): number {
		return this.chroma.filter(Boolean).length;
	}

	get resetDisabled(): boolean {
		return this.selected === 0;
	}

	get pickDisabled(): boolean {
		let selected = this.selected;
		return selected < this.min || selected > this.max;
	}

	toggle(index: number): void {
		this.chroma[index] = !this.chroma[index];
	}

	reset(): void {
		this.chroma.fill(false);
	}

	@Emit('picked')
	pick(): string {
		return this.chroma.reduce((chroma, flag) => chroma + Number(flag), '');
	}

}
</script>

<style>
.piano {
	background: rgb(230, 230, 230);
	display: inline-block;
	padding: 25px 30px;
}

.key {
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;
	padding-bottom: 12px;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: flex-end;
	position: relative;
	float: left;
	cursor: pointer;
}

.white.key {
	z-index: 1;
	background: rgb(255, 255, 250);
	width: 50px;
	height: 190px;
	margin: 0 1px;
}

.white.key.active {
	background: rgb(170, 240, 170);
}

.white.key:hover {
	filter: brightness(97%);
}

.black.key {
	margin-left: -20px;
	margin-right: -20px;
	z-index: 2;
	background: rgb(60, 60, 60);
	color: rgb(255, 255, 255);
	height: 125px;
	width: 40px;
	white-space: pre-line;
	line-height: 115%;
}

.black.key.active {
	background: rgb(50, 120, 50);
}

.black.key:hover {
	filter: brightness(80%);
}

.buttons {
	text-align: right;
	margin-top: 10px;
}

.buttons > button {
	margin-left: 10px;
}
</style>