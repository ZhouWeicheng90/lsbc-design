// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import iView from 'view-design';
import 'view-design/dist/styles/iview.css';

// 下面的引入 二选一：
// 打包测试
// import plugin from "../dist";
// 开发
import plugin from '../../dist/index'

Vue.use(plugin)

Vue.use(iView);
Vue.config.productionTip = false
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
