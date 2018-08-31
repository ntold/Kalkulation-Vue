import Vue from 'vue'
import Router from 'vue-router'
import Firebase from 'firebase'
import Navbar from '@/components/Navbar'
import Home from '@/components/Home'
import Fertigung from '@/components/Fertigung'
import Material from '@/components/Material'
import Werkzeug from '@/components/Werkzeug'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/fertigung',
      name: 'Fertigung',
      component: Fertigung
    },
    {
      path: '/material',
      name: 'Material',
      component: Material
    },
    {
      path: '/werkzeug',
      name: 'Werkzeug',
      component: Werkzeug
    }
  ]
})
