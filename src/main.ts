import 'reflect-metadata';
import { Container } from 'typescript-ioc';
import { createApp } from 'vue';
import App from './app.vue';
import dataAccessConfig from './config/data-access-config';
import serviceConfig from './config/service.config';
import router from './router';

Container.configure(...dataAccessConfig, ...serviceConfig);
createApp(App).use(router).mount('#app')