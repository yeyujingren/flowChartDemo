import { createApp } from 'vue'
import ElementPlus from 'element-plus'; 
import EventBus from './utils/eventBus';

import App from './App.vue'
import 'bpmn-js-properties-panel/dist/assets/properties-panel.css';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import 'element-plus/dist/index.css'

const $bus = new EventBus();
const app = createApp(App);

app.provide('$bus', $bus);
app.config.globalProperties.$bus = $bus;

app.use(ElementPlus);
app.mount('#app');
