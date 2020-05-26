import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/engine/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
