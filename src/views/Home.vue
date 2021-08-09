<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
	{{val}}
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { InjectValue, Singleton } from 'typescript-ioc';

@Singleton
@Options({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
	@InjectValue('str')
	private val?: string;
}
</script>
