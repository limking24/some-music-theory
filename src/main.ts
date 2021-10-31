import 'reflect-metadata';
import { Container } from 'typescript-ioc';
import { createApp } from 'vue';
import App from './app.vue';
import audioConfig from './config/audio.config';
import dataAccessConfig from './config/data-access-config';
import router from './router';

Container.configure(...audioConfig, ...dataAccessConfig);
createApp(App).use(router).mount('#app')