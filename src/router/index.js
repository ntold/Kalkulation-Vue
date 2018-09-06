import Vue from 'vue'
import Router from 'vue-router'
import Navbar from '@/components/Navbar'
import Home from '@/components/Home'
import Edit from '@/components/Edit'
import Fertigung from '@/components/Fertigung'
import Material from '@/components/Material'
import Werkzeug from '@/components/Werkzeug'
import Oberflaeche from '@/components/Oberflaeche'

Vue.use(Router)

const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      component: Home,
    },
    {
      path: '/edit/:id',
      component: Edit,
      children: [{
          name: 'Fertigung',
          path: 'fertigung',
          component: Fertigung
        },
        {
          name: 'Material',
          path: 'material',
          component: Material
        },
        {
          name: 'Werkzeug',
          path: 'werkzeug',
          component: Werkzeug
        },
        {
          name: 'Oberfläche',
          path: 'oberflaeche',
          component: Oberflaeche
        }
      ]
    }
  ]
})
