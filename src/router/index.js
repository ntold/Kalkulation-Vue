import Vue from 'vue'
import Router from 'vue-router'
import Firebase from 'firebase'
import Navbar from '@/components/Navbar'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})