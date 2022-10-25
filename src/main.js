import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
// import VueRecord from '@codekraft-studio/vue-record'

Vue.config.productionTip = false
Vue.config.unwrapInjectedRef = true
Vue.use(VueRouter)
// Vue.use(VueRecord)
Vue.use(VueCookies)
Vue.$cookies.config(0)

const eventHub = new Vue()

Vue.mixin({
  data: function () {
    return {
        eventHub: eventHub
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
