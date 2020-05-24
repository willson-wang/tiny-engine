// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import modules from './utils/register'
import store from './store'

Vue.config.productionTip = false
modules.forEach((install) => {
  Vue.use(install)
})

const aa = {
  age: 18
}

const bb = {
  ...aa
}

console.log(bb)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
