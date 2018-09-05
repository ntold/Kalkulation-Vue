import Vue from 'vue'
import Router from 'vue-router'
import Navbar from '@/components/Navbar'
import Home from '@/components/Home'
import Fertigung from '@/components/Fertigung'
import Material from '@/components/Material'
import Werkzeug from '@/components/Werkzeug'
import Oberflaeche from '@/components/Oberflaeche'

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
    },
    {
      path: '/oberflaeche',
      name: 'Oberflaeche',
      component: Oberflaeche
    }
  ]
})
