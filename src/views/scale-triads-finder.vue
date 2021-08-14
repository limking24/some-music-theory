<template>
  <div>
    <h1>Scale Triads</h1>
	<scale-picker v-model:scale="scale"></scale-picker>
	<scale-triads :scale="scale"></scale-triads>
  </div>
</template>

<script lang="ts">
import ScalePicker from '@/components/scale-picker.vue';
import ScaleTriads from '@/components/scale-triads.vue';
import Scale from '@/models/scale';
import { Options, Vue } from 'vue-class-component';

@Options({
	components: {
		ScalePicker,
		ScaleTriads
	}
})
export default class ScaleTriadsFinder extends Vue {

	scale = new Scale('Minor', 'Natural', 'C');

}
</script>