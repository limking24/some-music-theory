<template>
	<div class="scale-name-picker">
		<div v-for="(option, key) in options" :key="key"
			@click="selected = key"
			:class="{
				'selected': option.selected, 
				'alias-of-selected': option.aliasOfSelected
			}">
			{{option.value.display}}
		</div>
	</div>
</template>

<script lang="ts">
import { ScaleName, ScaleNameOption, ScaleNames } from '@/models/scale-name';
import { Inject } from 'typescript-ioc';
import { Vue } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';

export default class ScaleNamePicker extends Vue {

	@Prop({required: true})
	scaleName!: ScaleName;

	@Inject
	scaleNames!: ScaleNames;

	options = ScaleNameOption.create(this.scaleNames);

	selected = this.scaleName.key;

	mounted(): void {
		this.toggleHighlight(this.selected);
		// Make the selected item visible
		this.$nextTick(() => {
			let selectedDiv = document.querySelector('.scale-name-picker .selected')! as HTMLElement;
			let parent = selectedDiv.parentElement! as HTMLElement;
			parent.scrollTop = selectedDiv.offsetTop - parent.offsetTop;
		});
	}

	@Watch('selected')
	onSelected(newKey: string, oldKey: string): void {
		this.toggleHighlight(oldKey);
		this.toggleHighlight(newKey);
		this.$emit('update:scaleName', this.options[newKey].value);
	}

	toggleHighlight(key: string): void {
		this.options[key].selected = !this.options[key].selected;
		this.options[key]
				.value
				.aliasKeys
				.forEach(aliasKey => {
					this.options[aliasKey].aliasOfSelected = !this.options[aliasKey].aliasOfSelected;
				});
	}

}
</script>

<style scoped>
.scale-name-picker {
	margin: 0 auto;
	width: 680px;
	height: 300px;
	overflow-y: scroll;
	border: 1px solid rgb(118, 118, 118);
	display: grid;
	grid-template-columns: repeat(3, 1fr);
}

.scale-name-picker div {
	font-size: 14.5px;
	text-align: left;
	padding: 2px 3px 0px;
	cursor: default;
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

.selected {
	color: white;
	background: rgb(30, 144, 255);
}

.alias-of-selected {
	color: white;
	background: rgb(123, 189, 255);
}
</style>