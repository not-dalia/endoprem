import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueRouter)

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
