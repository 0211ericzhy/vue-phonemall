import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import layout from './views/layout/Layout.vue'
import 'vant/lib/index.css';
// 把api挂载成全局变量
import api from './http/api';
Vue.prototype.$api=api
Vue.use(Vant);
// Vue.use(Notify);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
