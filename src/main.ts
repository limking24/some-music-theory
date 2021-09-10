import 'reflect-metadata';
import { Container } from 'typescript-ioc';
import { createApp } from 'vue';
import App from './app.vue';
import dataAccessConfig from './config/data-access-config';
import factoriesConfig from './config/factories-config';
import serviceConfig from './config/service.config';
import router from './router';

Container.configure(...dataAccessConfig, ...factoriesConfig, ...serviceConfig);
createApp(App).use(router).mount('#app')