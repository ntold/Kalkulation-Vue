import Vue from 'vue'
import Router from 'vue-router'
import Navbar from '@/components/Navbar'
import firebase from "firebase"
import Home from '@/components/Home'
import Edit from '@/components/Edit'
import Fertigung from '@/components/Fertigung'
import Material from '@/components/Material'
import Werkzeug from '@/components/Werkzeug'
import Oberflaeche from '@/components/Oberflaeche'
import Einmaligekosten from '@/components/Einmaligekosten'
import Total from '@/components/Total'
import Login from '@/components/Login'
import Chart from '@/components/Chart'
import LineChart from '@/components/LineChart.js'

Vue.use(Router)

let router = new Router({
  routes: [{
      path: '/',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/edit/:id',
      component: Edit,
      meta: {
        requiresAuth: true
      },
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
        },
        {
          name: 'Einmaligekosten',
          path: 'einmaligekosten',
          component: Einmaligekosten
        },
        {
          name: 'Total',
          path: 'total',
          component: Total
        },
        {
          name: 'Chart',
          path: 'chart',
          component: Chart
        },
        {
          name: LineChart,
          path: '',
          component: LineChart
        }
      ]
    }
  ]
})

// Nav Guard
router.beforeEach((to, from, next) => {
  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NO logged user
    if (!firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if NO logged user
    if (firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
});
export default router;
