import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Layout from '../views/layout/layout.vue'
// import Index from '../views/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: 'login',
      children: [
        {
          path: 'index',
          component: () => import('../views/index'),
          name: 'index'
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/Login/login')
    },
    {
      path: '',
      component: Layout,
      children: [
        {
          path: '/userList',
          component: () => import('../views/user/userList')
        },
        {
          path: '/companyList',
          component: () => import('../views/company/company')
        },
        {
          path: '/map',
          component: () => import('../views/map/map')
        },
        {
          path: '/socket',
          component: () => import('../views/socket/index')
        },
        {
          path: 'page',
          component: () => import('../views/page/index')
        }
      ]
    }
  ]
})
