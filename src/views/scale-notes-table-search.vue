<template>
	<div>
		<h1>Scale Notes Table</h1>
		<scale-type-picker :scale-type="scaleType" :exclude-supertypes="exclude" @picked="updateRoute" />
		<scale-notes-table :scale-type="scaleType"/>
	</div>
</template>

<script lang="ts">
import ScaleNotesTable from '@/components/scale-notes-table.vue';
import ScaleTypePicker from '@/components/scale-type-picker.vue';
import { ScaleSupertype } from '@/models/scale-type-picker';
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Options({
	components: {
		ScaleTypePicker,
		ScaleNotesTable
	}
})
export default class ScaleNotesTableSearch extends Vue {

	@Prop()
	scaleType!: string;

	exclude = [ScaleSupertype.Chromatic];

	updateRoute(scaleType: string): void {
		this.$router.push(`/scale-notes-table/${scaleType}`);
	}

}
</script>