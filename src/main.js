import Vue from 'vue'
import App from './App.vue'

import store from './store/index.js'
import './styles/index.css' //引入样式
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
