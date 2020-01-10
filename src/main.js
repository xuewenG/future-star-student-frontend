import Vue from 'vue'
import App from './App'

import './request/global.config.js'
import cuCustom from './colorui/components/cu-custom.vue'
import LoadingModal from './components/LoadingModal.vue'
Vue.component('cu-custom', cuCustom)
Vue.component('LoadingModal', LoadingModal)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
