import Vue from 'vue'
import Router from 'vue-router'
// import jobInfo from '../views/jobInfo'

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
    {
      path: '/companyDetail',
      name: 'companyDetail',
      meta: {
        title: '公司详情'
      },
      component: ()=>import('@/views/companyDetail')
    },
    {
      path: '/jobInfo',
      name: 'jobInfo',
      meta: {
        title: '职位详情'
      },
      component: ()=>import('@/views/jobInfo')
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      meta: {
        title: '用户信息'
      },
      component: ()=>import('@/views/userInfo')
    },
    
  ]
})
