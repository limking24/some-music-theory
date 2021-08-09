import { Container, Inject, InjectValue, Singleton } from 'typescript-ioc'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')

Container.bindName('str').to('abc');

@Singleton
class BeanA {
	@InjectValue('str')
	public str?: string;
}

@Singleton
class BeanB {

	@Inject
	private beanA?: BeanA;

}


console.log(new BeanB());
