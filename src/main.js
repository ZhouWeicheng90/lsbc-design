import Vue from 'vue'
import App from './docs/App.vue'
import Router from 'vue-router'
import routes from './docs/routes'
import iView from 'view-design';
import plugin from "./lib/index";
import './docs/common.less';

import CodeView from './docs/views/coms/CodeView'
Vue.component('CodeView', CodeView)
Vue.use(Router)
Vue.use(iView);
Vue.use(plugin)

let router = new Router({
  routes: routes.concat([{
    path: '/', redirect: '/Introduction', name: 'default'
  }]),
  mode: 'history'
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
