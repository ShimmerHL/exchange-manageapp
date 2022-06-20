import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminHome from '../views/administrator/AdminHome.vue'
import AdminManagement from '../views/AdminManagement/AdminManagement.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'AdminHome',
    component: AdminHome,
    children: [
    ],
    
  },{
    path: '/AdminManagement',
    name: 'AdminManagement',
    component: AdminManagement,
    children: [
      {
        path: 'GiftManagement',
        name: 'GiftManagement',
        component: () => import('../views/AdminManagement/Gift/GiftManagement/GiftManagement.vue')
      },
      // {
      //   path: 'CustomGifts',
      //   name: 'CustomGifts',
      //   component: () => import('../views/AdminManagement/Gift/CustomGifts/CustomGifts.vue')
      // },
      {
        path: 'UserManagement',
        name: 'UserManagement',
        component: () => import('../views/AdminManagement/User/UserManagement/UserManagement.vue')
      },
      {
        path: 'LogisticsManagement',
        name: 'LogisticsManagement',
        component: () => import('../views/AdminManagement/User/LogisticsManagement/LogisticsManagement.vue')
      },
      {
        path: 'EnterpriseManagement',
        name: 'EnterpriseManagement',
        component: () => import('../views/AdminManagement/Enterprise/EnterpriseManagement/EnterpriseManagement.vue')
      },
      {
        path: 'CustomQuery',
        name: 'CustomQuery',
        component: () => import('../views/AdminManagement/Enterprise/CustomQuery/CustomQuery.vue')
      },
    ],
    
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
  // mode: 'history',
  mode: 'hash',
  routes,
  // base:'/dist',
})

export default router
