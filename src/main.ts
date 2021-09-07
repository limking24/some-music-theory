import 'reflect-metadata';
import { Container } from 'typescript-ioc';
import { createApp } from 'vue';
import App from './app.vue';
import scaleDataConfig from './config/scale-data.config';
import serviceConfig from './config/service.config';
import router from './router';

Container.configure(...scaleDataConfig, ...serviceConfig);
createApp(App).use(router).mount('#app')