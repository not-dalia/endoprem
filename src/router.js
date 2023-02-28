import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './views/HomePage.vue'
import FormBuilder from './views/FormBuilder.vue'
import PrivacyPolicy from './views/PrivacyPolicy.vue'
// import PlaceholderPage from './views/PlaceholderPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/form-builder',
      name: 'form-builder',
      component: FormBuilder
    },
    {
      path: '/privacy',
      name: 'privacy-policy',
      component: PrivacyPolicy
    },
    // {
    //   path: '/',
    //   name: 'placeholder',
    //   component: Placeholder
    // }
  ]
})
