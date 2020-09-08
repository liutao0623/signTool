import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import SignTool from '@/components/SignTool'
import ApiTest from '@/components/ApiTest'
import videoParam from '@/components/videoParam'
import DutyPuls from '@/components/DutyPuls'
import Sso from '@/components/Sso'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SignTool',
      component: SignTool
    },
    {
      path: '/api',
      name: 'ApiTest',
      component: ApiTest
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/videoParam',
      name: 'videoParam',
      component: videoParam
    },
    {
      path: '/dutyPuls',
      name: 'DutyPuls',
      component: DutyPuls
    },
    {
      path: '/ssoDemo',
      name: 'Sso',
      component: Sso
    }
  ]
})
