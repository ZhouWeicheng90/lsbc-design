// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import iView from 'view-design';
import 'view-design/dist/styles/iview.css';

// 下面的引入 二选一：
// import plugin from "../dist";
// Vue.use(plugin)
Vue.component('MobilePreview', () => import('../src/components/MobilePreview'))
Vue.component('ImgSelect', () => import('../src/components/ImgSelect'))



Vue.use(iView);
Vue.config.productionTip = false
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
