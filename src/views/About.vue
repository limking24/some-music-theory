<template>
  <div class="about">
    <h1>This is an about page</h1>
	<scale-picker :type="'Minor'" @picked="onScalePicked"></scale-picker>
  </div>
</template>

<script lang="ts">
import ScalePicker from '@/components/ScalePicker.vue';
import Scale from '@/models/scale';
import { Options, Vue } from 'vue-class-component';

@Options({
  components: { ScalePicker }
})
export default class About extends Vue {

	public onScalePicked(scale: Scale): void {
		console.log(scale);
	}

}
</script>