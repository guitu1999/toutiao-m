import Vue from 'vue'
import App from './App.vue'

//引入router
import router from './router/index.js'

// 加载 Vant 核心组件库
import Vant from 'vant'

// 加载 Vant 全局样式
import 'vant/lib/index.css'

//动态设置 REM 基准值（html 标签的字体大小）
import 'amfe-flexible'

import store from './store/index.js'
import './styles/index.css' //引入样式


//J加载dayjs初始化配置
import './utils/dayjs'
// 注册使用 Vant 组件库
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
