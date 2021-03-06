// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import VueScroller from 'vue-scroller'
import store from '@/store'
// 导入上拉提示层
import { ToastPlugin } from 'vux'

Vue.use(VueScroller);
// 全局使用该方法
Vue.use(ToastPlugin);

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
