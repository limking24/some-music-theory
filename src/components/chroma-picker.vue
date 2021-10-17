<template>
	<div class="chroma-picker">
		<div class="piano" @contextmenu.prevent>
			<div class="help">
				<div class="help-content">
					<ul>
						<li>Left click on a piano key to select/deselect a note.</li>
						<li>Right click on a piano key to play a note; release to stop.</li>
						<li>Minimum notes to select: {{min}}</li>
						<li>Maximum notes to select: {{max}}</li>
					</ul>
				</div>
			</div>
			<div v-for="(key, index) in pianoKeys" 
				:key="index"
				:class="[ key.color, { active: chroma.valueOf(index) } ]"
				@click="chroma.toggle(index)"
				@mousedown.right="attack(key.value)"
				@mouseup.right="release()"
				@contextmenu.prevent
				class="key">
				{{key.label}}
			</div>
		</div>
		<div class="buttons">
			<button @click="$emit('picked', chroma.clone())" :disabled="pickDisabled">{{buttonLabel}}</button>
			<button @click="chroma.reset()" :disabled="resetDisabled">Reset</button>
		</div>
	</div>
</template>

<script lang="ts">
import { Chroma } from '@/models/chroma';
import { PianoKey } from '@/models/chroma-picker';
import * as Tone from 'tone';
import { Inject } from 'typescript-ioc';
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Options({
	emits: ['picked']
})
export default class ChromaPicker extends Vue {

	pianoKeys: PianoKey[] = [
		{ label: 'C',			value: 'C4',	color: 'white' },
		{ label: 'C#\n/\nDb',	value: 'C#4',	color: 'black' },
		{ label: 'D',			value: 'D4',	color: 'white' },
		{ label: 'D#\n/\nEb',	value: 'D#4',	color: 'black' },
		{ label: 'E',			value: 'E4',	color: 'white' },
		{ label: 'F',			value: 'F4',	color: 'white' },
		{ label: 'F#\n/\nGb',	value: 'F#4',	color: 'black' },
		{ label: 'G',			value: 'G4',	color: 'white' },
		{ label: 'G#\n/\nAb',	value: 'G#4',	color: 'black' },
		{ label: 'A',			value: 'A4',	color: 'white' },
		{ label: 'A#\n/\nBb',	value: 'A#4',	color: 'black' },
		{ label: 'B',			value: 'B4',	color: 'white' }
	];

	@Prop({default: 'Pick'})
	buttonLabel!: string;

	@Prop({default: 3})
	min!: number;

	@Prop({default: 10})
	max!: number;

	@Inject
	sampler!: Tone.Sampler;
	
	chroma = new Chroma();

	get resetDisabled(): boolean {
		return this.chroma.noOfNotes === 0;
	}

	get pickDisabled(): boolean {
		let noOfNotes = this.chroma.noOfNotes;
		return noOfNotes < this.min || noOfNotes > this.max;
	}

	attack(note: string): void {
		Tone.loaded().then(() => this.sampler.triggerAttack(note, Tone.now()));
	}

	release(): void {
		this.sampler.releaseAll();
	}

}
</script>

<style scoped>
.chroma-picker {
	margin: 0 auto;
	width: 424px;
}

.piano {
	background: rgb(230, 230, 230);
	box-shadow: 3px 3px 5px rgba(100, 100, 100, 0.05);
	display: inline-block;
	padding: 25px 30px;
	position: relative;
}

.key {
	align-items: flex-end;
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;
	cursor: pointer;
	display: flex;
	float: left;
	justify-content: center;
	padding-bottom: 12px;
	position: relative;
	text-align: center;
}

.white.key {
	background: rgb(255, 255, 250);
	box-shadow: 3px 3px 5px rgba(100, 100, 100, 0.05);
	height: 190px;
	margin: 0 1px;
	width: 50px;
	z-index: 1;
}

.white.key.active {
	background: rgb(170, 240, 170);
}

.white.key:hover {
	filter: brightness(97%);
}

.black.key {
	background: rgb(60, 60, 60);
	box-shadow: 3px 3px 5px rgba(100, 100, 100, 0.2);
	color: rgb(255, 255, 255);
	height: 125px;
	line-height: 115%;
	margin-left: -20px;
	margin-right: -20px;
	white-space: pre-line;
	width: 40px;
	z-index: 2;
}

.black.key.active {
	background: rgb(50, 120, 50);
}

.black.key:hover {
	filter: brightness(80%);
}

.buttons {
	margin: 15px 0 25px;
	text-align: right;
}

button {
	background: rgb(255, 255, 255, 0);
	border: none;
	color: rgb(90, 90, 90);
	cursor: pointer;
	font-size: 100%;
	margin-left: 7px;
	padding: 3px;
}

button:not(:disabled):hover,
button:not([disabled]):hover {
	border-bottom: 1.5px solid rgb(120, 120, 120);
}

button:disabled,
button[disabled] {
	color: rgb(170, 170, 170);
	cursor: default;
	text-decoration: line-through;
}

.help {
	position: absolute;
	right: 10px;
	top: 4px;
	text-shadow: 2px 1px 5px rgba(0, 0, 0, 0.215);
}

.help-content {
	width: 440px;
}
</style>