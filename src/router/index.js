import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      meta:{
        title:'招聘'
      },
      component: ()=>import('@/views/index')
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录'
      },
      component: ()=>import('@/views/login')
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        title: '注册'
      },
      component: ()=>import('@/views/register')
    },
  ]
})
