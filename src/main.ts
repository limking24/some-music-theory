import 'reflect-metadata';
import { Container } from 'typescript-ioc';
import { createApp } from 'vue';
import App from './app.vue';
import scaleNameConfig from './config/scale-name.config';
import serviceConfig from './config/service.config';
import router from './router';

Container.configure(...scaleNameConfig, ...serviceConfig);
createApp(App).use(router).mount('#app')