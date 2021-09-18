<template>
	<div>
		<h1>Scale Notes Table</h1>
		<scale-type-picker :exclude="exclude" :selected="scale" @picked="updateRoute" />
		<scale-notes-table :scale="scale"/>
	</div>
</template>

<script lang="ts">
import ScaleNotesTable from '@/components/scale-notes-table.vue';
import ScaleTypePicker from '@/components/scale-type-picker.vue';
import { ScaleSupertype } from '@/models/scale-type-picker';
import { Options, Vue } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';

@Options({
	components: {
		ScaleTypePicker,
		ScaleNotesTable
	}
})
export default class ScaleNotesTableSearch extends Vue {

	@Prop()
	scale!: string;

	exclude = [ScaleSupertype.Chromatic];

	@Watch('scaleName')
	updateRoute(key: string): void {
		this.$router.push(`/scale-notes-table/${key}`);
	}

}
</script>