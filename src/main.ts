import 'reflect-metadata';
import { Container } from 'typescript-ioc';
import { createApp } from 'vue';
import App from './app.vue';
import serviceConfig from './config/service.config';
import router from './router';

Container.configure(...serviceConfig);
createApp(App).use(router).mount('#app')