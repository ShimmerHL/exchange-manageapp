import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import AdminHome from '../views/administrator/AdminHome.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'AdminHome',
    component: AdminHome,
    children: [
      {
        path: '/GiftManagement',
        name: 'GiftManagement',
        component: () => import('../views/administrator/GiftManagement/GiftManagement.vue')
      },
      {
        path: '/UserManagement',
        name: 'UserManagement',
        component: () => import('../views/administrator/UserManagement/UserManagement.vue')
      },
      {
        path: '/EnterpriseManagement',
        name: 'EnterpriseManagement',
        component: () => import('../views/administrator/EnterpriseManagement/EnterpriseManagement.vue')
      },
      {
        path: '/CustomQuery',
        name: 'CustomQuery',
        component: () => import('../views/administrator/CustomQuery/CustomQuery.vue')
      },
    ]
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
