<template>
	<div class="major-minor-scale-picker">
		<div>
			<label for="type">Scale</label>
			<select :value="type" @change="loadSubtype($event.target.value)" id="type" size="7">
				<option v-for="(type, key) in types" :key="key" :value="key">
					{{type}}
				</option>
			</select>
		</div>
		<div>
			<label for="subtype">
				<template v-if="type === 'minor'">Type</template>
				<template v-else>Mode</template>
			</label>
			<select :value="subtype" @change="loadTonics($event.target.value)" id="subtype" size="7">
				<option v-for="(subtype, key) in subtypes" :key="key" :value="key">
					{{subtype}}
				</option>
			</select>
		</div>
		<div>
			<label for="tonic">Tonic</label>
			<select :value="tonic" @change="changeTonic($event.target.value)" id="tonic" size="7">
				<option v-for="(tonic, key) in tonics" :key="key" :value="key">
					{{tonic.display}}
				</option>
			</select>
		</div>
	</div>
</template>

<script lang="ts">
import { createTonics, MajorMinorScale, MajorSubtypes, MinorSubtypes, Tonic, Types } from '@/models/major-minor-scale';
import { Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

export default class MajorMinorScalePicker extends Vue {

	@Prop({default: {}})
	scale!: MajorMinorScale;

	types = Types;

	subtypes = {} as Record<string, string>;

	tonics = {} as Record<string, Tonic>;

	type = '';

	subtype = '';

	tonic = '';

	mounted(): void {
		this.loadSubtype(this.scale.type, this.scale.subtype);
		if (this.scale.subtype === this.subtype) {
			let tonicKey = `${this.scale.subtype} ${this.scale.tonic}`;
			if (tonicKey in this.tonics) {
				this.tonic = tonicKey;
			}
		}
	}

	loadSubtype(type?: string, subtype?: string): void {
		if (type === 'minor') {
			this.type = 'minor';
			this.subtypes = MinorSubtypes;
		} else {
			this.type = 'major';
			this.subtypes = MajorSubtypes;
		}
		this.loadTonics(subtype);
	}

	loadTonics(subtype?: string): void {
		this.subtype = (subtype! in this.subtypes) ? subtype! : Object.keys(this.subtypes)[0];
		this.tonics = createTonics(this.subtype);
		if (document.readyState === 'complete') {
			this.$nextTick(this.scrollTonicOptionIntoView);
		} else {
			window.addEventListener('load', this.scrollTonicOptionIntoView);
		}
	}

	scrollTonicOptionIntoView(): void {
		let index = Object.keys(this.tonics).findIndex(key => key === this.tonic);
		if (index === -1) {
			index = 6;
		}
		let select = this.$el.querySelector('#tonic');
		let option = select.options[index];
		select.scrollTop = option.scrollHeight * (index - 3);
	}

	changeTonic(tonic: string): void {
		if (tonic in this.tonics) {
			this.tonic = tonic;
			this.$emit('picked', {
				type: this.type,
				subtype: this.subtype,
				tonic: this.tonics[tonic].value
			} as MajorMinorScale);
		}
	}

}
</script>

<style scoped>
.major-minor-scale-picker {
	white-space: nowrap;
	margin: 20px;
}

.major-minor-scale-picker > div {
	display: inline-block;
	text-align: left;
}

label {
	margin: 0 8px;
	font-weight: bold;
	font-size: large;
}

select {
	display: block;
	width: 200px;
	margin: 0 7px;
	overflow-y: auto;
}
</style>