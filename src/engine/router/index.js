import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/engine/components/HelloWorld'
import Login from '@/engine/components/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
