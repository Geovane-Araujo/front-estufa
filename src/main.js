import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import VueApexCharts from 'vue-apexcharts'
import VueMaterial from 'vue-material'
import VueParticles from 'vue-particles'
import 'primevue/resources/themes/vela-green/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import './global'

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import './assets/scss/app.scss'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(ToastService)
Vue.use(VueApexCharts)
Vue.use(VueMaterial)
Vue.use(VueParticles)
Vue.use(PrimeVue, { ripple: true })
Vue.component('apexchart', VueApexCharts)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
