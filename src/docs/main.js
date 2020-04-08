// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import iView from 'view-design';
import './common.less';
Vue.use(iView);





// 下面的引入 二选一：
// 打包测试
import plugin from "../deploy/index";
// 开发
// import plugin from '../../dist/index'

Vue.use(plugin)


import routes from './routes'
import Router from 'vue-router'
import App from './App'
import CodeView from './views/coms/CodeView'
Vue.component('CodeView', CodeView)
Vue.use(Router)
let router = new Router({
  routes: routes.concat([{
    path: '/', redirect: '/Introduction', name: 'default'
  }]),
  mode: 'history'
})

Vue.config.productionTip = false
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})
