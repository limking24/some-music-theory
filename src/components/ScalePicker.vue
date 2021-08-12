<template>
	<form>
		<label for="scale">Scale</label>
		<select v-bind:value="scale.type" id="scale">
			<option>Major</option>
			<option>Minor</option>
		</select>

		{{scale}}
	</form>
</template>

<script lang="ts">
import Scale from '@/models/scale';
import { Vue } from 'vue-class-component';
import { PropSync } from 'vue-property-decorator';

export default class ScalePicker extends Vue {

//https://stackoverflow.com/questions/40915436/vuejs-update-parent-data-from-child-component
//https://v3.vuejs.org/guide/migration/v-model.html#_3-x-syntax
	@PropSync('scale', {required: true})
	private syncedScale!: Scale;

}
</script>

<style scoped>

</style>