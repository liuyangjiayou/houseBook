import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './static/resetElement.less'
import Dom from './dom/index'
import commonJS from './commonJs/fromFn'

Vue.use(ElementUI);
Vue.use(Dom);
Vue.use(commonJS);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
