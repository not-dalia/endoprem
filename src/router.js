import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import FormBuilder from './views/FormBuilder.vue'
import PrivacyPolicy from './views/PrivacyPolicy.vue'
import Placeholder from './views/Placeholder.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
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
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
