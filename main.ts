import App from './App';
import createRouter from '@/routes/index.ts';
import createCommon from '@/common/index.ts';

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app';

createRouter(Vue);
createCommon(Vue);

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif