import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/bar',
    name: 'Bar',
    component: () => import(/* webpackChunkName: "about" */ '../views/ButtonBar.vue'),
    children: [
      {
        path: 'index',
        name: 'Home',
        component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
      },
      {
        path: 'list',
        name: 'List',
        component: () => import(/* webpackChunkName: "about" */ '../views/List.vue')
      },
      {
        path: 'search',
        name: 'Search',
        component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue')
      },
      {
        path: 'cart',
        name: 'Cart',
        meta: {
          requireAuth: true
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/Cart.vue')
      },
      {
        path: 'mine',
        name: 'Mine',
        meta: {
          requireAuth: true
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/Mine.vue')
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
