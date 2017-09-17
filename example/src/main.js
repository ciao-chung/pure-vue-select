import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Vue2Filters  from 'vue2-filters'

Vue.use(Vue2Filters)
Vue.use(VueRouter)
window.self.$ = window.self.jQuery = $

// router設定, 使用mode: history時, 配合.htaccess
import routerRules from 'resource/router.js'
const router = new VueRouter({
  routes: routerRules,
  mode: 'history'
})

const app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  render: h => h(App)
})
