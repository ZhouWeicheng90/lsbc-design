// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import iView from 'view-design';
import 'view-design/dist/styles/iview.css';
import Router from 'vue-router'
Vue.use(iView);
Vue.use(Router)



// 下面的引入 二选一：
// 打包测试
import plugin from "../deploy/index";
// 开发
// import plugin from '../../dist/index'

Vue.use(plugin)




import TestImgSelect from "./views/TestImgSelect";
import TestMobilePreview from "./views/TestMobilePreview";
import TestUploadService from "./views/TestUploadService";
let router = new Router({
  routes: [
    { path: '/', redirect: '/ImgSelect' },
    { path: '/ImgSelect', name: 'ImgSelect', component: TestImgSelect },
    { path: '/MobilePreview', name: 'MobilePreview', component: TestMobilePreview },
    { path: '/UploadService', name: 'UploadService', component: TestUploadService }
  ]
})
Vue.config.productionTip = false
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})
