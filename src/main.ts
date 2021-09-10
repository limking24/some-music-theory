import 'reflect-metadata';
import { Container } from 'typescript-ioc';
import { createApp } from 'vue';
import App from './app.vue';
import dataAccessConfig from './config/data-access-config';
import factoriesConfig from './config/factories-config';
import servicesConfig from './config/services.config';
import router from './router';

Container.configure(...dataAccessConfig, ...factoriesConfig, ...servicesConfig);
createApp(App).use(router).mount('#app')