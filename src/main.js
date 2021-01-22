// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/styles/main.scss'
import 'element-ui/lib/theme-chalk/index.css'
import './icons'
import './permission'

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import element from 'element-ui'
// import BMap from 'vue-baidu-map'
import 'leaflet/dist/leaflet.css'

Vue.use(element)
// Vue.use(BMap,{
//     ak:'Br8x83ooVWj2XThXnXDKGmC7SuemNGsm'
// })

Vue.config.productionTip = false
// Vue.use(axios)
Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  render: h => h(App)
})
