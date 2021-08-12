<template>
	<form>
		<label for="scale">Scale</label>
		<select v-model="type" id="scale">
			<option>Major</option>
			<option>Minor</option>
		</select>
	</form>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { Prop, PropSync } from 'vue-property-decorator';

export default class ScalePicker extends Vue {

//https://stackoverflow.com/questions/40915436/vuejs-update-parent-data-from-child-component
	@PropSync('syncedModel', {required: true})
	private model!: String;

}
</script>

<style scoped>

</style>