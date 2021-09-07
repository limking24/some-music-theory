<template>
	<div>
		<h1>Scale Notes Table</h1>
		<scale-name-picker v-model:scaleName="scaleName"/>
		<scale-notes-table :scaleName="scaleName"/>
	</div>
</template>

<script lang="ts">
import ScaleNamePicker from '@/components/scale-name-picker.vue';
import ScaleNotesTable from '@/components/scale-notes-table.vue';
import { ScaleName, ScaleNameDictionary } from '@/models/scale-name';
import { Inject } from 'typescript-ioc';
import { Options, Vue } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';

@Options({
	components: {
		ScaleNamePicker,
		ScaleNotesTable
	}
})
export default class ScaleNotesTableSearch extends Vue {

	@Prop()
	scaleNameKey!: string;

	@Inject
	dictionary!: ScaleNameDictionary;

	scaleName = this.dictionary.get(this.scaleNameKey, 'major');

	@Watch('scaleName')
	onScaleNamePicked(scaleName: ScaleName) {
		this.$router.push(`/scale-notes-table/${scaleName.key}`);
	}

}
</script>