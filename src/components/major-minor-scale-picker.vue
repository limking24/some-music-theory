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
			<select :value="`${scale.tonic} ${scale.subtype}`" @change="changeScaleKey($event.target.value)" id="tonic" size="7">
				<option v-for="(tonic, key) in scaleKeys" :key="key" :value="key">
					{{tonic.display}}
				</option>
			</select>
		</div>
	</div>
</template>

<script lang="ts">
import { createScaleKeys, MajorMinorScale, MajorSubtypes, MinorSubtypes, Tonic, Types } from '@/models/major-minor-scale';
import { Vue } from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';

export default class MajorMinorScalePicker extends Vue {

	@Prop({default: {}})
	scale!: MajorMinorScale;

	types = Types;

	subtypes = {} as Record<string, string>;

	scaleKeys = {} as Record<string, Tonic>;

	type = '';

	subtype = '';

	mounted(): void {
		this.loadSubtype(this.scale.type, this.scale.subtype);
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
		this.scaleKeys = createScaleKeys(this.subtype);
		this.showTonicOptionAtCenter();
	}

	showTonicOptionAtCenter(): void {
		let func = () => {
			let scaleKey = `${this.scale.tonic} ${this.scale.subtype}`;
			let index = Object.keys(this.scaleKeys).findIndex(key => key === scaleKey);
			if (index === -1) {
				index = 7;
			}
			let select = this.$el.querySelector('#tonic');
			let option = select.options[index];
			select.scrollTop = option.scrollHeight * (index - 3);
		};
		if (document.readyState === 'complete') {
			this.$nextTick(func);
		} else {
			window.addEventListener('load', func);
		}
	}

	@Emit('picked')
	changeScaleKey(scaleKey: string): MajorMinorScale {
		return {
			type: this.type,
			subtype: this.subtype,
			tonic: this.scaleKeys[scaleKey].tonic
		};
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