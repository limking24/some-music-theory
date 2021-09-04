<template>
	<div class="scale-name-picker">
		<div v-for="key in sortedKeys" :key="key"
			@click="syncedSelected = key"
			:class="{
				'selected': classes[key].selected, 
				'alias-of-selected': classes[key].aliasOfSelected
			}">
			{{names[key].display}}
		</div>
	</div>
</template>

<script lang="ts">
import { ScaleNameMap, SortedScaleNameKey } from '@/models/scale-name';
import { Vue } from 'vue-class-component';
import { PropSync, Watch } from 'vue-property-decorator';

interface Class {
	selected: boolean;
	aliasOfSelected: boolean;
}

interface Classes {
	[key: string]: Class;
}

export default class ScaleNamePicker extends Vue {

	@PropSync('selected', {required: true})
	syncedSelected!: string;

	sortedKeys = SortedScaleNameKey;

	names = ScaleNameMap;

	classes = SortedScaleNameKey
				.reduce((classes, key) => {
					classes[key] = {
						selected: false,
						aliasOfSelected: false
					};
					return classes;
				}, {} as Classes);

	mounted(): void {
		this.toggleClasses(this.syncedSelected);
		this.$nextTick(() => {
			let selectedDiv = document.querySelector('.scale-name-picker .selected')! as HTMLElement;
			let parent = selectedDiv.parentElement! as HTMLElement;
			parent.scrollTop = selectedDiv.offsetTop - parent.offsetTop;
		});
	}

	@Watch('syncedSelected')
	onKeyChanged(newKey: string, oldKey: string): void {
		this.toggleClasses(oldKey);
		this.toggleClasses(newKey);
	}

	toggleClasses(key: string): void {
		this.classes[key].selected = !this.classes[key].selected;
		ScaleNameMap[key]
			.aliases
			?.forEach(alias => {
				this.classes[alias].aliasOfSelected = !this.classes[alias].aliasOfSelected;
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